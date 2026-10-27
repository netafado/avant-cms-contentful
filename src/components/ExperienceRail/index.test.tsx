import { render, screen } from "@testing-library/react";
import ExperienceRail from ".";

const items = [
  { id: "bold-commerce", label: "Bold Commerce" },
  { id: "everest-systems", label: "Everest Systems" },
  { id: "outliant", label: "Outliant" },
];

describe("ExperienceRail", () => {
  it("renders one anchor per company pointing at its card id", () => {
    render(<ExperienceRail items={items} />);

    const links = items.map((item) => screen.getByText(item.label));
    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", `#${items[index].id}`);
      expect(link).toHaveAttribute("data-rail-id", items[index].id);
    });
  });

  it("marks the first entry active before any scrolling happens", () => {
    render(<ExperienceRail items={items} />);

    expect(screen.getByText("Bold Commerce")).toHaveAttribute(
      "aria-current",
      "true"
    );
    expect(screen.getByText("Outliant")).not.toHaveAttribute("aria-current");
  });

  it("renders nothing without items", () => {
    const { container } = render(<ExperienceRail items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
