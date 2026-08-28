import { render, screen } from "@testing-library/react";
import Banner from "./index";
import { BannerProps } from "./types";

const mockProps: BannerProps = {
  name: "Test Name",
  role: "Full-Stack Developer",
  image: {
    src: "/test-image.jpg",
    width: 400,
    height: 400,
    alt: "Test portrait",
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
  it("renders the banner with correct name as the H1", () => {
    render(<Banner {...mockProps} />);
    const nameElement = screen.getByRole("heading", { level: 1 });
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent("Test Name");
  });

  it("exposes the full name in aria-label for screen readers", () => {
    render(<Banner {...mockProps} />);
    const nameElement = screen.getByRole("heading", { level: 1 });
    expect(nameElement).toHaveAttribute("aria-label", "Test Name");
  });

  it("renders the image with correct attributes and priority", () => {
    render(<Banner {...mockProps} />);
    const imageElement = screen.getByRole("img", { name: /test portrait/i });
    expect(imageElement).toHaveAttribute("src", "/test-image.jpg");
    expect(imageElement).toHaveAttribute("alt", "Test portrait");
    // `next/image` exposes `fetchpriority="high"` for `priority` images.
    expect(imageElement).toHaveAttribute("fetchpriority", "high");
  });

  it("renders the mono role caption", () => {
    render(<Banner {...mockProps} />);
    expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument();
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
    expect(
      screen.getByRole("heading", { level: 1, name: "Test Name" }),
    ).toBeInTheDocument();
  });

  it("renders the optional subtitle mono line when provided", () => {
    render(<Banner {...mockProps} subtitle="Next.js · Contentful · Node" />);
    expect(
      screen.getByText("Next.js · Contentful · Node"),
    ).toBeInTheDocument();
  });

  it("marks the root element as a full-viewport hero region", () => {
    const { container } = render(<Banner {...mockProps} />);
    const root = container.querySelector("section");
    expect(root).not.toBeNull();
    // min-h-[100dvh] is rendered as a class on the section
    expect(root!.className).toMatch(/min-h-\[100dvh\]/);
    // It is labelled by the H1 for assistive tech
    expect(root).toHaveAttribute("aria-labelledby", "hero-name");
  });
});
