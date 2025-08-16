import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  BookmarkIcon,
  HomeIcon,
  PieChartIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
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
  return (
    <div className="bg-gradient-to-tr from-black/50 to-transparent fixed border-r border-gray-700 top-0 right-0 z-50 flex flex-col items-center justify-between pb-0 rounded-lg h-full">
      <div className="flex py-0 pb-0 flex-col justify-between w-full h-full z-50 gap-1">
        <div className="bg-gray-800 ">
          {siteLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={clsx(
                "text-gray-300 hover:underline hover:underline-offset-4 bg-gray-800 hover:bg-gray-700",
                "px-2 py-3 px-3 flex items-center border-b border-gray-700 hover:border-gray-600 transition-colors duration-200 w-full justify-center text-gray-400",
                {
                  "bg-lime-500 text-white hover:bg-lime-700":
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

        <div className="border-t border-gray-700 bg-gray-600 flex py-2 items-center flex-col justify-center  w-full z-50 gap-2">
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
