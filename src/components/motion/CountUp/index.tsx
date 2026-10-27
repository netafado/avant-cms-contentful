"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

type CountUpProps = {
  /** Final text, optionally with a leading integer ("60%", "4+", "10+"). */
  value: string;
  className?: string;
  duration?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a stat's leading integer up from 0 the first time it scrolls into
 * view ("60%" sweeps 0% -> 60%). Renders the final string on the server and
 * whenever the value has no leading integer or the visitor prefers reduced
 * motion, so the DOM text always settles on the real value.
 */
const CountUp: FC<CountUpProps> = ({ value, className, duration = 900 }) => {
  const match = useMemo(() => value.match(/^(\d+)([\s\S]*)$/), [value]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(`${Math.round(easeOutCubic(progress) * target)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, match, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;
