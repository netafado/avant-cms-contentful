import CardWithTagList from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
const defaultProps = {
  title: "Technologies",
  list: ["React", "TypeScript", "GraphQL"],
  color: "blue",
};
describe("CardWithTagList", () => {
  it("should renders the title", () => {
    render(<CardWithTagList {...defaultProps} />);
    expect(screen.getByText("Technologies")).toBeInTheDocument();
  });

  it("should renders all tags in the list", () => {
    render(<CardWithTagList {...defaultProps} />);
    defaultProps.list.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("should applies the correct color class to tags", () => {
    render(<CardWithTagList {...defaultProps} color="gray" />);
    const tagElement = screen.getByText("React");
    screen.debug();
    expect(tagElement).toHaveClass("bg-gray-500/30 text-gray-500");
  });

  it("should handles empty list gracefully", () => {
    render(<CardWithTagList title="Empty List" list={[]} />);
    expect(screen.getByText("Empty List")).toBeInTheDocument();
    expect(screen.queryByRole("tag")).not.toBeInTheDocument();
  });

  it("should uses default color when an invalid color is provided", () => {
    render(<CardWithTagList {...defaultProps} color="invalid-color" />);
    const tagElement = screen.getByText("React");
    expect(tagElement).toHaveClass("bg-gray-500/30 text-gray-500");
  });
});
