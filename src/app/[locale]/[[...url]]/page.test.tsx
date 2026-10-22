import React from "react";

jest.mock("@/lib/pages", () => ({
  getPageData: jest.fn(),
}));

jest.mock("@/components/PageContent", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/components/JsonLd", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

import Page, { generateMetadata } from "./page";
import { getPageData } from "@/lib/pages";
import PageContent from "@/components/PageContent";
import JsonLd from "@/components/JsonLd";

const mockGetPageData = getPageData as jest.Mock;

const fakePage = {
  seoFields: { pageTitle: "Resume" },
  sectionsCollection: { items: [] },
};

function findElement<C extends React.ElementType>(
  tree: React.ReactNode,
  type: C
): React.ReactElement<React.ComponentProps<C>> | undefined {
  let found: React.ReactElement<React.ComponentProps<C>> | undefined;
  React.Children.forEach(tree, (child) => {
    if (found || !React.isValidElement(child)) return;
    if (child.type === type) {
      found = child as React.ReactElement<React.ComponentProps<C>>;
    } else {
      const { children } = child.props as { children?: React.ReactNode };
      if (children) found ??= findElement(children, type);
    }
  });
  return found;
}

// The [[...url]] catch-all delivers segments as an array ("resume" -> ["resume"])
// and undefined for the locale homepage; both must normalize to the slug format
// stored in Contentful ("resume", "/") exactly like the pre-i18n [url] route did.
describe("[locale]/[[...url]] route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPageData.mockResolvedValue(fakePage);
  });

  describe("Page", () => {
    it("passes sub-page slugs without a leading slash to PageContent", async () => {
      const tree = await Page({
        params: Promise.resolve({ locale: "en", url: ["resume"] }),
      });

      expect(findElement(tree, PageContent)?.props.url).toBe("resume");
    });

    it("normalizes nested segments with slashes between them", async () => {
      const tree = await Page({
        params: Promise.resolve({
          locale: "en",
          url: ["docs", "getting-started"],
        }),
      });

      expect(findElement(tree, PageContent)?.props.url).toBe(
        "docs/getting-started"
      );
    });

    it("treats the locale homepage as '/' and renders JsonLd", async () => {
      const tree = await Page({
        params: Promise.resolve({ locale: "en", url: undefined }),
      });

      expect(findElement(tree, PageContent)?.props.url).toBe("/");
      expect(findElement(tree, JsonLd)).toBeDefined();
    });
  });

  describe("generateMetadata", () => {
    it("builds metadata from the slug, not the raw segment array", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: "en", url: ["resume"] }),
      });

      expect(mockGetPageData).toHaveBeenCalledWith("resume");
      expect(metadata.alternates?.canonical).toMatch(/\/resume$/);
    });
  });
});
