import { ReactNode } from "react";

export type SunHeroProps = {
  /** Framed wordmark rendered at the top edge, over the sun. */
  masthead?: ReactNode;
  /** Static fallback shown before/without WebGL (no-JS, reduced motion). */
  poster?: {
    src: string;
    alt: string;
  };
  /** Overlay content anchored to the lower field (achievements, CTAs). */
  children?: ReactNode;
};
