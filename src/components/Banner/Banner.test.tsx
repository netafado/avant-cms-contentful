import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Banner from "./index";
import { BannerProps } from "./types";

jest.mock("../Reveal", () => {
  return function MockReveal({ children, className }: any) {
    return <div className={className}>{children}</div>;
  };
});

const mockProps: BannerProps = {
  name: "Test Name",
  image: {
    src: "/test-image.jpg",
    width: 400,
    height: 400,
    alt: "Test image",
  },
  achievements: {
    items: [
      { number: "60%", text: "Frontend" },
      { number: "40%", text: "Backend" },
      { number: "10+", text: "Years of Experience" },
      { number: "20+", text: "Projects" },
    ],
  },
};

describe("Banner Component", () => {
  it("renders the banner with correct name", () => {
    render(<Banner {...mockProps} />);

    const nameElement = screen.getByText("Test Name");
    expect(nameElement).toBeInTheDocument();
  });

  it("renders the image with correct attributes", () => {
    render(<Banner {...mockProps} />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", "/test-image.jpg");
    expect(imageElement).toHaveAttribute("alt", "Test image");
  });

  it("renders all achievements", () => {
    render(<Banner {...mockProps} />);

    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText("Years of Experience")).toBeInTheDocument();
    expect(screen.getByText("20+")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders without achievements when none provided", () => {
    const propsWithoutAchievements = { ...mockProps, achievements: undefined };
    render(<Banner {...propsWithoutAchievements} />);

    const nameElement = screen.getByText("Test Name");
    expect(nameElement).toBeInTheDocument();
  });
});
