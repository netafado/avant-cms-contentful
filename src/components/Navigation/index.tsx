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
    icon: <BookmarkIcon />,
  },
  {
    href: "https://www.linkedin.com/in/isaias-francisco-21097437",
    icon: <LinkedInLogoIcon />,
  },
  {
    href: "https://github.com/netafado",
    icon: <GitHubLogoIcon />,
  },
];

const siteLinks = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/resume", label: "Resume", icon: <FileTextIcon /> },
];

const Navigation = ({ currentPath }: { currentPath: string }) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="p-1 bg-gradient-to-tr from-gray-100 dark:bg-gradient-to-tr dark:from-zinc-800 dark:to-zinc-900 fixed dark:border-r border-gray-700 top-0 right-0 z-50 flex flex-col items-center justify-between pb-0 h-full">
      <div className="flex py-0 pb-0 flex-col justify-between w-full h-full z-50 gap-1">
        <div className="bg-gray-800 ">
          {siteLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={clsx(
                "text-gray-900 bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                "px-2 py-3 px-3 flex items-center dark:border-b border-gray-700 hover:border-gray-600 transition-colors duration-200 w-full justify-center text-gray-400",
                {
                  "bg-lime-500 dark:bg-lime-500 text-white hover:bg-lime-700 dark:hover:bg-lime-700":
                    currentPath === link.href ||
                    link.href.endsWith(currentPath),
                }
              )}
            >
              <span className="flex items-center gap-2 hidden">
                {link.label}
              </span>
              {link.icon}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={toggleTheme}
            className="text-gray-900 dark:hover:bg-gray-600 border border-gray-300 px-2 py-3 hover:bg-gray-300 dark:border-gray-700 md:hover:border-gray-600 transition-colors duration-200 w-full rounded-full flex items-center justify-center"
          >
            {theme === "dark" ? (
              <SunIcon className="text-yellow-400" />
            ) : (
              <MoonIcon className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="relative dark:border-t border-gray-700 bg-gray-300 dark:bg-gray-600 flex py-2 items-center flex-col justify-center  w-full z-50 gap-2">
          {links.map((link, index) => (
            <button
              key={index}
              className="text-gray-900 px-2 py-1 hover:bg-gray-600"
            >
              <Link href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </Link>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
