import { render, screen } from "@testing-library/react";
import CountUp from ".";

describe("CountUp", () => {
  it("renders the final value immediately (server and pre-reveal)", () => {
    render(<CountUp value="60%" />);

    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("keeps values without a leading integer untouched", () => {
    render(<CountUp value="10+ years" />);

    expect(screen.getByText("10+ years")).toBeInTheDocument();
  });

  it("applies the className to the counting element", () => {
    render(<CountUp value="4+" className="text-2xl" />);

    expect(screen.getByText("4+")).toHaveClass("text-2xl");
  });
});
