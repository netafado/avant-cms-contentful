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
    label: "Medium articles",
    icon: <BookmarkIcon className="h-5 w-5" />,
  },
  {
    href: "https://www.linkedin.com/in/isaias-francisco-21097437",
    label: "LinkedIn profile",
    icon: <LinkedInLogoIcon className="h-5 w-5" />,
  },
  {
    href: "https://github.com/netafado",
    label: "GitHub profile",
    icon: <GitHubLogoIcon className="h-5 w-5" />,
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
  wrapper: "fixed bottom-10 right-1/2 translate-x-1/2 z-50",
  pill: "relative flex items-center justify-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-1 h-12 backdrop-blur-md",
  item: "p-2 flex items-center justify-center gap-2 rounded-full duration-200 text-gray-300 hover:bg-white/10 hover:text-white",
  active: "bg-solar-500 text-white hover:bg-solar-600 hover:text-white",
};

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <nav className={CLASSES.wrapper} aria-label="Main navigation">
      <div className={CLASSES.pill}>
        <ul
          role="menubar"
          className="relative flex items-center justify-center gap-2"
        >
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              role="menuitem"
              className={clsx(CLASSES.item, {
                [CLASSES.active]:
                  currentPath === link.href ||
                  link.href.endsWith(currentPath),
              })}
            >
              <span className="hidden md:inline">{link.label}</span>
              {link.icon}
            </Link>
          ))}
        </ul>

        <div className="relative flex items-center justify-center gap-2 border-l border-white/10 py-2 pl-2">
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className={clsx(CLASSES.item, "p-3")}
          >
            {theme === "dark" ? (
              <SunIcon className="text-solar-400" />
            ) : (
              <MoonIcon className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="relative flex items-center justify-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              aria-label={link.label}
              className={clsx(CLASSES.item)}
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
