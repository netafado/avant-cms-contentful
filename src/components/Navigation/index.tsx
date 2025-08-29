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
  },
  {
    href: "https://www.linkedin.com/in/isaias-francisco-21097437",
    icon: <LinkedInLogoIcon className="h-5 w-5" />,
  },
  {
    href: "https://github.com/netafado",
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
  mobile: "fixed bottom-10 right-1/2 translate-x-1/2 z-50 overflow-hidden",
  desktop: "hidden md:flex",
};

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className={clsx(CLASSES.mobile, CLASSES.mobile)}>
      <div className="relative flex border-gray-300 dark:border-gray-700 items-center justify-center gap-2 bg-gray-300/40 rounded-full px-1 h-12 border border-gray-200">
        <ul
          role="menubar"
          className="relative flex border-gray-700 items-center justify-center gap-2"
        >
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              role="menuitem"
              className={clsx(
                "text-gray-900 bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                "p-2 flex items-center dark:border-b border-gray-700 hover:border-gray-600 duration-200 justify-center text-gray-400 rounded-full",
                {
                  "bg-lime-500 dark:bg-lime-500 text-white hover:bg-lime-700 dark:hover:bg-lime-700":
                    currentPath === link.href ||
                    link.href.endsWith(currentPath),
                }
              )}
            >
              <span className="flex items-center gap-2 hidden ">
                {link.label}
              </span>
              {link.icon}
            </Link>
          ))}
        </ul>

        <div className="relative  flex border-gray-300 dark:border-gray-700 dark:border-gray-700 py-2 items-center justify-center gap-2 border-l pl-2">
          <button
            onClick={toggleTheme}
            className={clsx(
              "text-gray-900 bg-gray-300  dark:bg-gray-800 dark:text-gray-300",
              "p-3 flex items-center dark:border-b border-gray-700 hover:border-gray-600 duration-200 justify-center text-gray-400 rounded-full"
            )}
          >
            {theme === "dark" ? (
              <SunIcon className="text-yellow-400" />
            ) : (
              <MoonIcon className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="relative flex border-gray-700 py-2 items-center justify-center gap-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              className={clsx(
                "text-gray-900 bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                "p-2 flex items-center dark:border-b border-gray-700 hover:border-gray-600 duration-200 justify-center text-gray-400 rounded-full"
              )}
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
