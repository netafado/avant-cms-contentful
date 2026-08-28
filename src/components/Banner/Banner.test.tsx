import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Banner from "./index";
import { BannerProps } from "./types";

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
  it("renders the hero with correct name", () => {
    render(<Banner {...mockProps} />);

    const nameElement = screen.getByText("Test Name");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.tagName).toBe("H1");
  });

  it("renders the sun poster fallback image", () => {
    render(<Banner {...mockProps} />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", "/images/sun-hero.jpg");
  });

  it("renders the role tagline", () => {
    render(<Banner {...mockProps} />);

    expect(screen.getByText("// Full Stack Developer")).toBeInTheDocument();
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

  it("renders the CV link when provided", () => {
    render(
      <Banner
        {...mockProps}
        cv={{
          src: "https://example.com/cv.pdf",
          fileName: "cv.pdf",
          contentType: "application/pdf",
        }}
      />
    );

    const cvLink = screen.getByText("Download CV").closest("a");
    expect(cvLink).toHaveAttribute("href", "https://example.com/cv.pdf");
  });

  it("renders without achievements and cv when none provided", () => {
    render(
      <Banner {...mockProps} achievements={undefined} cv={undefined} />
    );

    const nameElement = screen.getByText("Test Name");
    expect(nameElement).toBeInTheDocument();
    expect(screen.queryByText("Download CV")).not.toBeInTheDocument();
  });
});
