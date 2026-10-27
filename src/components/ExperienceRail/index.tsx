"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export type ExperienceRailItem = {
  /** DOM id of the matching card (`slugify(company)`). */
  id: string;
  label: string;
};

type ExperienceRailProps = {
  items: ExperienceRailItem[];
};

/**
 * Desktop-only sticky table of contents for the Work Experience cards: a
 * company list beside a 2px bright indicator that slides to the active entry
 * as the cards scroll past. The cards themselves are server-rendered; this
 * component finds them by id once mounted.
 */
const ExperienceRail = ({ items }: ExperienceRailProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const cards = items
      .map((item) => document.getElementById(item.id))
      .filter((card): card is HTMLElement => card !== null);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // A card is active while its top passes the upper third of the screen.
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(
      `[data-rail-id="${CSS.escape(activeId)}"]`,
    );
    if (link) {
      setIndicator({ top: link.offsetTop, height: link.offsetHeight });
    }
  }, [activeId, items]);

  if (items.length === 0) return null;

  return (
    <aside aria-label="Work experience" className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24">
        <div className="relative border-l border-hairline pl-6">
          <span
            aria-hidden
            className="absolute left-[-1px] w-[2px] bg-bright transition-[top,height] duration-300 ease-out"
            style={{ top: indicator.top, height: indicator.height }}
          />
          <ul ref={listRef} className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-rail-id={item.id}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={clsx(
                    "block font-mono text-[10px] uppercase tracking-widest transition-colors hover:text-bright",
                    activeId === item.id ? "text-bright" : "text-dim",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ExperienceRail;
