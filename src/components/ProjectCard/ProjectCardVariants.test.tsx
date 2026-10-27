import { render, screen, within } from "@testing-library/react";
import ProjectCard, {
  MAX_TECHNOLOGIES,
  SPAN_CLASSES,
} from ".";
import type { ProjectSummary } from "@/lib/projects";

const labels = {
  viewProject: "View project",
  categories: "Categories",
  technologies: "Technologies",
};

const project: ProjectSummary = {
  title: "Nuts.com Subscription Commerce",
  slug: "nuts-com-subscription-commerce",
  client: "Nuts.com · via Object Edge",
  role: "Full-Stack Developer",
  period: "2020 – 2021",
  highlight: "+12% recurring revenue",
  summary: "Led the subscription capabilities.",
  categories: ["E-commerce", "Subscriptions"],
  technologies: [
    "Vue.js",
    "Node.js",
    "Commercetools",
    "Contentful",
    "GraphQL",
    "AWS Lambda",
    "EventBridge",
    "Jest",
  ],
  order: 6,
};

describe("ProjectCard bento variants", () => {
  it("defaults to the regular cell treatment and no numeral", () => {
    render(<ProjectCard project={project} labels={labels} />);

    const card = screen.getByRole("link");
    expect(card).toHaveClass("bg-panel");
    expect(card).not.toHaveClass("border-dashed");
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });

  it("renders the featured treatment with a larger title and index numeral", () => {
    render(
      <ProjectCard project={project} labels={labels} variant="featured" index={1} />
    );

    const card = screen.getByRole("link");
    expect(card).toHaveClass("p-8");
    expect(
      screen.getByRole("heading", { level: 3, name: project.title })
    ).toHaveClass("md:text-3xl");
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders the dashed meta treatment for the self-reference card", () => {
    render(
      <ProjectCard project={project} labels={labels} variant="meta" index={8} />
    );

    expect(screen.getByRole("link")).toHaveClass("border-dashed");
    expect(screen.getByText("08")).toBeInTheDocument();
  });

  it("maps variants to the grid spans applied on the wrapper", () => {
    expect(SPAN_CLASSES.featured).toBe("md:col-span-2");
    expect(SPAN_CLASSES.wide).toBe("md:col-span-2");
    expect(SPAN_CLASSES.meta).toBe("");
    expect(SPAN_CLASSES.default).toBe("");
  });

  it("keeps the content contract intact across variants", () => {
    render(
      <ProjectCard
        project={project}
        labels={labels}
        variant="wide"
        index={2}
      />
    );

    expect(screen.getByText("Nuts.com · via Object Edge")).toBeInTheDocument();
    expect(screen.getByText("2020 – 2021")).toBeInTheDocument();
    const technologies = screen.getByRole("list", { name: "Technologies" });
    expect(within(technologies).getAllByRole("listitem")).toHaveLength(
      MAX_TECHNOLOGIES + 1
    );
  });
});
