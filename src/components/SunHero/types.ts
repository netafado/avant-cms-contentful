import { ReactNode } from "react";

export type SunHeroProps = {
  /** Small mono line rendered above the name, e.g. the page owner's role. */
  tagline?: string;
  /** Static fallback shown before/without WebGL (no-JS, reduced motion). */
  poster?: {
    src: string;
    alt: string;
  };
  /** Overlay content (name, achievements, CTAs), centered over the sun. */
  children?: ReactNode;
};
