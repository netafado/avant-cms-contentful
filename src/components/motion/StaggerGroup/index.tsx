"use client";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type StaggerGroupProps = {
  children: ReactNode;
  /** Classes for the wrapper itself — often the grid/flex container styles. */
  className?: string;
};

/**
 * Scroll trigger for the staggered reveal defined in globals.css: when the
 * wrapper enters the viewport it gains the `in-view` class, which plays the
 * entrance animation on its direct `.stagger-item` children (80ms per
 * sibling, reduced-motion collapses to the final state).
 */
const StaggerGroup: FC<StaggerGroupProps> = ({ children, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className={clsx(className, inView && "in-view")}>
      {children}
    </div>
  );
};

export default StaggerGroup;
