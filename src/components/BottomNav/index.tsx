"use client";
import NextLink from "next/link";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

export type DockLink = {
  href: string;
  label: string;
  icon: ReactNode;
  plain: boolean;
};

type BottomNavProps = {
  links: DockLink[];
  /** External profiles, parked at the dock's right end behind a divider. */
  socials?: DockLink[];
  /** Path used for the active-link highlight; shared with the top bar. */
  activePath: string;
};

/**
 * Mobile-only floating dock for the primary site links, styled after a native
 * tab bar: the active entry expands into a labelled pill. Scrolling down
 * slides it off-screen; the first upward tick brings it back.
 */
const BottomNav = ({ links, socials, activePath }: BottomNavProps) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Ignore jitter at the very top so the dock never hides on landing.
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-transform duration-300 ease-out md:hidden",
        hidden ? "translate-y-[calc(100%+2rem)]" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="flex items-center gap-0.5 rounded-full border border-white/10 bg-black/70 p-1.5 shadow-lg shadow-black/40 backdrop-blur-md"
      >
        {links.map((link) => {
          const active =
            activePath === link.href || link.href.endsWith(activePath);
          const className = clsx(
            "flex items-center rounded-full transition-colors duration-300",
            active
              ? "gap-2 bg-white/15 px-4 py-2.5 text-white"
              : "p-2.5 text-white/60 hover:text-white",
          );
          const children = (
            <>
              {link.icon}
              {active && (
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase">
                  {link.label}
                </span>
              )}
            </>
          );
          return link.plain ? (
            <NextLink
              key={link.href}
              href={link.href}
              aria-label={link.label}
              aria-current={active ? "page" : undefined}
              className={className}
            >
              {children}
            </NextLink>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              aria-current={active ? "page" : undefined}
              className={className}
            >
              {children}
            </Link>
          );
        })}
        {socials && socials.length > 0 && (
          <>
            <div aria-hidden className="mx-1 h-4 w-px bg-white/25" />
            {socials.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2.5 text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.icon}
              </NextLink>
            ))}
          </>
        )}
      </nav>
    </div>
  );
};

export default BottomNav;
