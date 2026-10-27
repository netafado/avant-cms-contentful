"use client";
import { ReactNode, ViewTransition } from "react";

/**
 * Activates the View Transitions API for client-side navigations: Next's
 * router wraps route updates in a transition, so the outgoing page snapshot
 * cross-fades into the incoming one (220ms, tuned via the ::view-transition-*
 * rules in globals.css). Cross-root-layout navigations (/en <-> /blog) are
 * hard document loads animated by the CSS-only `@view-transition` rule.
 * Browsers without the API skip straight to the instant swap.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  return <ViewTransition>{children}</ViewTransition>;
};

export default PageTransition;
