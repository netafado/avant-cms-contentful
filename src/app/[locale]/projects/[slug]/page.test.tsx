import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/projects", () => ({
  getProject: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("@/components/Navigation", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/components/SiteFooter", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/components/EditorView", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/components/JsonLd", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/components/Providers", () => ({
  __esModule: true,
  default: jest.fn(
    (props: { children?: React.ReactNode }) => props.children ?? null
  ),
}));

import ProjectPage, { generateMetadata } from "./page";
import { getProject } from "@/lib/projects";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import EditorView from "@/components/EditorView";
import JsonLd from "@/components/JsonLd";

const getProjectMock = getProject as jest.Mock;
const firstProps = <T,>(component: unknown): T =>
  (component as jest.Mock).mock.calls[0][0] as T;

const project = {
  title: "Bold Checkout × Commercetools",
  slug: "bold-checkout",
  client: "Bold Commerce",
  role: "Full-Stack Engineer",
  period: "Apr 2025 – Sep 2025",
  highlight: "API-first checkout integration",
  summary: "Designed the integration.",
  categories: ["E-commerce", "Payments"],
  technologies: ["Commercetools", "Node.js"],
  order: 2,
  body: "## Context",
  seoFields: undefined,
};

const params = (slug = "bold-checkout", locale = "en") =>
  Promise.resolve({ locale, slug });

describe("[locale]/projects/[slug] route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getProjectMock.mockResolvedValue(project);
  });

  describe("Page", () => {
    it("fetches the project by slug in the route locale and renders the case study", async () => {
      render(await ProjectPage({ params: params("bold-checkout", "pt-BR") }));

      expect(getProjectMock).toHaveBeenCalledWith("bold-checkout", "pt-BR");
      expect(
        screen.getByRole("heading", { level: 1, name: project.title })
      ).toBeInTheDocument();
      expect(screen.getByText("Bold Commerce")).toBeInTheDocument();
      expect(
        screen.getByText("API-first checkout integration")
      ).toBeInTheDocument();
      expect(screen.getByText("Designed the integration.")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Engineer")).toBeInTheDocument();
      expect(screen.getByText("Apr 2025 – Sep 2025")).toBeInTheDocument();
      expect(screen.getByText("Payments")).toBeInTheDocument();
      expect(screen.getByText("Node.js")).toBeInTheDocument();
      expect(firstProps<{ markdown: string }>(EditorView).markdown).toBe(
        "## Context"
      );
    });

    it("links back to the projects landing page and keeps the Projects nav item active", async () => {
      render(await ProjectPage({ params: params() }));

      expect(screen.getByRole("link", { name: /Projects/ })).toHaveAttribute(
        "href",
        "/projects"
      );
      expect(firstProps<{ currentPath: string }>(Navigation).currentPath).toBe(
        "/projects"
      );
    });

    it("emits CreativeWork JSON-LD for the project", async () => {
      render(await ProjectPage({ params: params() }));

      const { data } = firstProps<{ data: Record<string, unknown> }>(JsonLd);
      expect(data).toMatchObject({
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        sourceOrganization: { name: "Bold Commerce" },
      });
      expect(String(data.url)).toMatch(/\/projects\/bold-checkout$/);
    });

    it("renders the not-found page for an unknown slug", async () => {
      getProjectMock.mockResolvedValue(null);

      await expect(
        ProjectPage({ params: params("missing") })
      ).rejects.toThrow("NEXT_NOT_FOUND");
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe("generateMetadata", () => {
    it("falls back to the project title and summary when there are no SEO fields", async () => {
      const metadata = await generateMetadata({ params: params() });

      expect(getProjectMock).toHaveBeenCalledWith("bold-checkout", "en");
      expect(metadata.title).toBe(project.title);
      expect(metadata.description).toBe(project.summary);
      expect(metadata.alternates?.canonical).toMatch(
        /\/projects\/bold-checkout$/
      );
    });

    it("prefers CMS SEO fields when present", async () => {
      getProjectMock.mockResolvedValue({
        ...project,
        seoFields: {
          pageTitle: "SEO title",
          pageDescription: "SEO description",
          noindex: true,
        },
      });

      const metadata = await generateMetadata({ params: params() });
      expect(metadata.title).toBe("SEO title");
      expect(metadata.description).toBe("SEO description");
      expect(metadata.robots).toMatchObject({ index: false });
    });

    it("returns empty metadata for an unknown slug", async () => {
      getProjectMock.mockResolvedValue(null);

      await expect(
        generateMetadata({ params: params("missing") })
      ).resolves.toEqual({});
    });
  });
});
