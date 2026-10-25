import { render, screen } from "@testing-library/react";

jest.mock("@/components/EditorView", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

import ComponentsHandler, { type Translations } from ".";
import type { SectionComponentsItem } from "@/lib/contentful/__generated/sdk";

const translations: Translations = {
  defaultName: "Name",
  defaultText: "Text",
  defaultImageAlt: "Alt",
  defaultCvFileName: "cv.pdf",
  viewProject: "View project",
  categories: "Categories",
  technologies: "Technologies",
};

const project = (overrides: Record<string, unknown>) => ({
  __typename: "Project",
  sys: { id: String(overrides.slug ?? "project") },
  title: "Project",
  slug: "project",
  client: "Client",
  role: null,
  period: null,
  highlight: null,
  summary: "Summary",
  categories: ["Web"],
  technologies: ["React"],
  order: 1,
  ...overrides,
});

const projectList = (items: unknown[]) =>
  ({
    __typename: "ComponentProjectList",
    sys: { id: "list" },
    internalName: "Projects",
    projectsCollection: { items },
  }) as unknown as SectionComponentsItem;

describe("ComponentsHandler.ComponentProjectList", () => {
  it("renders one linked card per project, skipping null items and entries without a slug", () => {
    render(
      <>
        {ComponentsHandler.ComponentProjectList(
          projectList([
            project({ slug: "alpha", title: "Alpha" }),
            null,
            project({ slug: null, title: "No slug" }),
            project({ slug: "beta", title: "Beta" }),
          ]),
          translations
        )}
      </>
    );

    expect(
      screen.getAllByRole("link").map((link) => link.getAttribute("href"))
    ).toEqual(["/projects/alpha", "/projects/beta"]);
    expect(screen.queryByText("No slug")).not.toBeInTheDocument();
    expect(screen.getAllByText(/View project/)).toHaveLength(2);
  });

  it("ignores components of another type", () => {
    const card = {
      __typename: "ComponentCard",
      sys: { id: "card" },
    } as unknown as SectionComponentsItem;

    expect(ComponentsHandler.ComponentProjectList(card, translations)).toBeNull();
  });
});
