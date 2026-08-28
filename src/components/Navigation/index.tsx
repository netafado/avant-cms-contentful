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
    icon: <BookmarkIcon className="h-4 w-4" />,
  },
  {
    href: "https://www.linkedin.com/in/isaias-francisco-21097437",
    label: "LinkedIn profile",
    icon: <LinkedInLogoIcon className="h-4 w-4" />,
  },
  {
    href: "https://github.com/netafado",
    label: "GitHub profile",
    icon: <GitHubLogoIcon className="h-4 w-4" />,
  },
];

const siteLinks = [
  { href: "/", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
  {
    href: "/resume",
    label: "Resume",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
];

const CLASSES = {
  // difference blend keeps the white type legible over both the black hero
  // and light sections without any bar background.
  wrapper: "fixed inset-x-0 top-0 z-50 text-white mix-blend-difference",
  bar: "mx-auto flex h-16 w-full items-center justify-between gap-4 px-6 md:h-20 md:px-10",
  group: "flex items-center gap-0.5 md:gap-1",
  siteLink:
    "relative flex items-center gap-2 p-2 text-[11px] tracking-[0.22em] text-white/60 uppercase transition-colors duration-300 hover:text-white",
  active:
    "text-white after:absolute after:inset-x-2 after:bottom-0.5 after:h-px after:bg-white after:content-['']",
  iconLink:
    "flex items-center p-2 text-white/60 transition-colors duration-300 hover:text-white",
  divider: "mx-2 h-4 w-px bg-white/25",
};

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <nav className={CLASSES.wrapper} aria-label="Main navigation">
      <div className={CLASSES.bar}>
        <ul role="menubar" className={CLASSES.group}>
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              role="menuitem"
              className={clsx(CLASSES.siteLink, {
                [CLASSES.active]:
                  currentPath === link.href || link.href.endsWith(currentPath),
              })}
            >
              <span className="hidden md:inline">{link.label}</span>
              {link.icon}
            </Link>
          ))}
        </ul>

        <div className={CLASSES.group}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              aria-label={link.label}
              className={clsx(CLASSES.iconLink)}
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
          <div aria-hidden className={CLASSES.divider} />
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className={clsx(CLASSES.iconLink, "p-2")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
