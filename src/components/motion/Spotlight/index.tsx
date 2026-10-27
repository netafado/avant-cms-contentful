"use client";
import clsx from "clsx";
import { FC, ReactNode, useRef } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Tracks the pointer inside the wrapper and feeds --mx/--my to the
 * `.spotlight` glow in globals.css. One handler per card instead of a
 * document-level listener; the card itself stays a server component.
 */
const Spotlight: FC<SpotlightProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={handlePointerMove} className={clsx("spotlight", className)}>
      {children}
    </div>
  );
};

export default Spotlight;
