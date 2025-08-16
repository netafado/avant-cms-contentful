import CardWithTagList from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("CardWithTagList", () => {
  const defaultProps = {
    title: "Technologies",
    list: ["React", "TypeScript", "GraphQL"],
    color: "blue",
  };

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

  it("applies the correct color class to tags", () => {
    render(<CardWithTagList {...defaultProps} />);
    const tagElement = screen.getByText("React");
    expect(tagElement).toHaveClass("bg-blue-500/30 text-blue-500");
  });

  it("handles empty list gracefully", () => {
    render(<CardWithTagList title="Empty List" list={[]} />);
    expect(screen.getByText("Empty List")).toBeInTheDocument();
    expect(screen.queryByRole("tag")).not.toBeInTheDocument();
  });

  it("uses default color when an invalid color is provided", () => {
    render(<CardWithTagList {...defaultProps} color="invalid-color" />);
    const tagElement = screen.getByText("React");
    expect(tagElement).toHaveClass("bg-gray-500/30 text-gray-300");
  });
});
