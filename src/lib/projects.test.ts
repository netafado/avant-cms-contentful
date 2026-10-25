import { listProjects, getProject, toProjectSummary } from "./projects";
import { client } from "@/lib/contentful";
import type { ProjectFieldsFragment } from "@/lib/contentful/__generated/sdk";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  // Request-scope memoization is a server concern; skip it so each test
  // starts from a clean slate.
  cache: (fn: unknown) => fn,
}));

jest.mock("@/lib/contentful", () => ({
  client: {
    projects: jest.fn(),
    project: jest.fn(),
  },
}));

const projectsMock = client.projects as jest.Mock;
const projectMock = client.project as jest.Mock;

function cmsEntry(overrides: Partial<ProjectFieldsFragment> = {}) {
  return {
    __typename: "Project",
    sys: { id: "entry-1" },
    title: "Bold Checkout × Commercetools",
    slug: "bold-checkout",
    client: "Bold Commerce",
    role: "Full-Stack Engineer",
    period: "Apr 2025 – Sep 2025",
    highlight: "API-first checkout integration",
    summary: "A summary.",
    categories: ["E-commerce", null, "Payments"],
    technologies: ["Commercetools", "Node.js", null],
    order: 2,
    body: "## Body",
    seoFields: null,
    ...overrides,
  } as ProjectFieldsFragment;
}

describe("toProjectSummary", () => {
  it("fills missing fields with empty values and drops null list items", () => {
    expect(
      toProjectSummary({
        title: "Only a title",
        categories: [null],
        technologies: null,
      })
    ).toEqual({
      title: "Only a title",
      slug: "",
      client: "",
      role: "",
      period: "",
      highlight: "",
      summary: "",
      categories: [],
      technologies: [],
      order: Number.MAX_SAFE_INTEGER,
    });
  });
});

describe("listProjects", () => {
  beforeEach(() => jest.clearAllMocks());

  it("maps entries onto ProjectSummary in display order, skipping nulls and slug-less entries", async () => {
    projectsMock.mockResolvedValue({
      projectCollection: {
        items: [
          cmsEntry({ sys: { id: "b" }, slug: "second", order: 2 }),
          null,
          cmsEntry({ sys: { id: "no-slug" }, slug: null, order: 0 }),
          cmsEntry({ sys: { id: "a" }, slug: "first", order: 1 }),
        ],
      },
    });

    const projects = await listProjects();
    expect(projects.map((project) => project.slug)).toEqual(["first", "second"]);
    expect(projects[0]).toMatchObject({
      client: "Bold Commerce",
      categories: ["E-commerce", "Payments"],
      technologies: ["Commercetools", "Node.js"],
    });
    expect(projects[0]).not.toHaveProperty("body");
  });

  it("queries the space default locale when no route locale is given", async () => {
    projectsMock.mockResolvedValue({ projectCollection: { items: [] } });

    await listProjects();
    expect(projectsMock).toHaveBeenCalledWith({ locale: "en-US" });
  });

  it("returns an empty list when the CMS is unreachable", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    projectsMock.mockRejectedValue(new Error("CMS down"));

    await expect(listProjects()).resolves.toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

describe("getProject", () => {
  beforeEach(() => jest.clearAllMocks());

  it("filters by slug in the mapped Contentful locale and returns the full project", async () => {
    projectMock.mockResolvedValue({
      projectCollection: { items: [cmsEntry()] },
    });

    const project = await getProject("bold-checkout", "en");
    expect(projectMock).toHaveBeenCalledWith({
      where: { slug: "bold-checkout" },
      locale: "en-US",
    });
    expect(project).toMatchObject({ slug: "bold-checkout", body: "## Body" });
    expect(project?.seoFields).toBeUndefined();
  });

  it("passes pt-BR through to Contentful unchanged", async () => {
    projectMock.mockResolvedValue({
      projectCollection: { items: [cmsEntry()] },
    });

    await getProject("bold-checkout", "pt-BR");
    expect(projectMock).toHaveBeenCalledWith({
      where: { slug: "bold-checkout" },
      locale: "pt-BR",
    });
  });

  it("returns null for an unknown slug", async () => {
    projectMock.mockResolvedValue({ projectCollection: { items: [] } });

    await expect(getProject("missing", "en")).resolves.toBeNull();
  });

  it("returns null when the CMS is unreachable", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    projectMock.mockRejectedValue(new Error("CMS down"));

    await expect(getProject("bold-checkout", "en")).resolves.toBeNull();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
