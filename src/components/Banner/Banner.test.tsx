import { render, within } from "@testing-library/react";
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
  it("renders the logo masthead with the name as the h1", () => {
    render(<Banner {...mockProps} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
    const mark = within(heading).getByRole("img");
    expect(mark).toHaveAttribute("alt", "Test Name");
  });

  it("renders the sun poster fallback image", () => {
    render(<Banner {...mockProps} />);

    const imageElement = screen.getByAltText(/burning sphere of plasma/i);
    expect(imageElement).toHaveAttribute("src", "/images/sun-hero.jpg");
  });

  it("renders the role tagline", () => {
    render(<Banner {...mockProps} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders the hero transformation message with the orbiting tagline", () => {
    render(<Banner {...mockProps} />);

    const transformation = screen.getByRole("heading", { level: 2 });
    expect(transformation).toHaveTextContent("AI");
    expect(transformation).not.toHaveTextContent("Human native");
    expect(screen.getByText("transformation")).toHaveClass(
      "uppercase",
      "font-mono",
    );

    const orbit = screen.getByRole("img", {
      name: "System design - AI engineer - LLMs integration - AI for humans",
    });
    expect(orbit).toBeInTheDocument();
    expect(orbit).toHaveTextContent("LLMs integration");
  });

  it("renders all achievements", () => {
    render(<Banner {...mockProps} />);

    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("10+")).toBeInTheDocument();
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
      />,
    );

    const cvLink = screen.getByText("Download CV").closest("a");
    expect(cvLink).toHaveAttribute("href", "https://example.com/cv.pdf");
  });

  it("renders without achievements and cv when none provided", () => {
    render(<Banner {...mockProps} achievements={undefined} cv={undefined} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(
      within(heading).getByRole("img"),
    ).toHaveAttribute("alt", "Test Name");
    expect(screen.queryByText("Download CV")).not.toBeInTheDocument();
  });
});
