"use client";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  BookmarkIcon,
  HomeIcon,
  SunIcon,
  MoonIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "@/providers/theme";
import clsx from "clsx";
import Link from "next/link";

const links = [
  {
    href: "https://medium.com/@isaias.fran",
    icon: <BookmarkIcon className="h-5 w-5" />,
    label: "Medium articles",
  },
  {
    href: "https://www.linkedin.com/in/isaias-francisco-21097437",
    icon: <LinkedInLogoIcon className="h-5 w-5" />,
    label: "LinkedIn profile",
  },
  {
    href: "https://github.com/netafado",
    icon: <GitHubLogoIcon className="h-5 w-5" />,
    label: "GitHub profile",
  },
];

const siteLinks = [
  { href: "/", label: "Home", icon: <HomeIcon className="h-5 w-5" /> },
  {
    href: "/resume",
    label: "Resume",
    icon: <FileTextIcon className="h-5 w-5" />,
  },
];

const CLASSES = {
  wrapper:
    "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/50 motion-reduce:transition-none",
};

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <nav
      aria-label="Primary"
      className={clsx(CLASSES.wrapper)}
    >
      <ul
        role="menubar"
        className="relative flex items-center justify-center gap-1 px-1 py-1"
      >
        {siteLinks.map((link) => {
          const isActive =
            currentPath === link.href ||
            (link.href !== "/" && currentPath.startsWith(link.href));
          return (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                aria-label={link.label}
                aria-current={isActive ? "page" : undefined}
                role="menuitem"
                className={clsx(
                  "p-2 flex items-center justify-center rounded-full text-zinc-300 transition-colors duration-200 hover:bg-zinc-800 hover:text-amber-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  {
                    "bg-amber-500 text-black hover:bg-amber-400 hover:text-black":
                      isActive,
                  }
                )}
              >
                <span className="sr-only">{link.label}</span>
                {link.icon}
              </Link>
            </li>
          );
        })}

        <li role="none" aria-hidden="true" className="mx-1 h-6 w-px bg-zinc-800" />

        <li role="none">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            className={clsx(
              "p-2 flex items-center justify-center rounded-full text-zinc-300 transition-colors duration-200 hover:bg-zinc-800 hover:text-amber-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            )}
          >
            {theme === "dark" ? (
              <SunIcon className="text-amber-400" />
            ) : (
              <MoonIcon className="text-zinc-400" />
            )}
          </button>
        </li>

        <li role="none" aria-hidden="true" className="mx-1 h-6 w-px bg-zinc-800" />

        {links.map((link) => (
          <li key={link.href} role="none">
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={clsx(
                "p-2 flex items-center justify-center rounded-full text-zinc-300 transition-colors duration-200 hover:bg-zinc-800 hover:text-amber-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              )}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
