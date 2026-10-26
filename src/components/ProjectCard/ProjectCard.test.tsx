import { render, screen, within } from "@testing-library/react";
import ProjectCard, { MAX_TECHNOLOGIES } from ".";
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

describe("ProjectCard", () => {
  it("links the whole card to the project detail page", () => {
    render(<ProjectCard project={project} labels={labels} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/projects/nuts-com-subscription-commerce"
    );
  });

  it("shows the client, title, period, highlight, summary and call to action", () => {
    render(<ProjectCard project={project} labels={labels} />);

    expect(screen.getByText("Nuts.com · via Object Edge")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: project.title })
    ).toBeInTheDocument();
    expect(screen.getByText("2020 – 2021")).toBeInTheDocument();
    expect(screen.getByText("+12% recurring revenue")).toBeInTheDocument();
    expect(
      screen.getByText("Led the subscription capabilities.")
    ).toBeInTheDocument();
    expect(screen.getByText(/View project/)).toBeInTheDocument();
  });

  it("renders every category as a pill", () => {
    render(<ProjectCard project={project} labels={labels} />);

    const list = screen.getByRole("list", { name: "Categories" });
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual(["E-commerce", "Subscriptions"]);
  });

  it("caps technology chips and collapses the rest into a +N count", () => {
    render(<ProjectCard project={project} labels={labels} />);

    const list = screen.getByRole("list", { name: "Technologies" });
    const items = within(list)
      .getAllByRole("listitem")
      .map((item) => item.textContent);
    expect(items).toHaveLength(MAX_TECHNOLOGIES + 1);
    expect(items.slice(0, MAX_TECHNOLOGIES)).toEqual(
      project.technologies.slice(0, MAX_TECHNOLOGIES)
    );
    expect(items.at(-1)).toBe(
      `+${project.technologies.length - MAX_TECHNOLOGIES}`
    );
  });

  it("omits optional rows and the +N marker when there is nothing to collapse", () => {
    render(
      <ProjectCard
        project={{
          ...project,
          client: "",
          period: "",
          highlight: "",
          categories: [],
          technologies: ["Vue.js"],
        }}
        labels={labels}
      />
    );

    expect(
      screen.queryByRole("list", { name: "Categories" })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    expect(screen.getByText("Vue.js")).toBeInTheDocument();
  });
});
