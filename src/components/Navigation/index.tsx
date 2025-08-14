import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="fixed top-0 right-0 z-50 bg-gray-800 p-1 flex flex-col items-center justify-center gap-2">
      <div className="flex py-2 items-center flex-col justify-center h-full w-full z-50 gap-2">
        <button className="bg-gray-800 text-white px-2 py-1 hover:bg-gray-600">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <InstagramLogoIcon />
          </Link>
        </button>
        <button className="bg-gray-800 text-white px-2 py-1 hover:bg-gray-600">
          <Link
            href="https://www.linkedin.com/in/isaias-francisco-21097437"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInLogoIcon />
          </Link>
        </button>
        <button className="bg-gray-800 text-white px-2 py-1 hover:bg-gray-600">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/netafado"
          >
            <GitHubLogoIcon />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
