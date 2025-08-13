import {
  BackpackIcon,
  GitHubLogoIcon,
  HomeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const Navigation = () => {
  return (
    <div className="fixed top-0 right-0 z-50 bg-gray-800 p-2 flex flex-col items-center justify-center gap-2">
      <div className="flex py-2 items-center flex-col justify-center h-full w-full z-50 gap-2">
        <button className="bg-gray-800 text-white rounded">
          <HomeIcon />
        </button>
        <button className="bg-gray-800 px-1 text-white rounded">
          <BackpackIcon />
        </button>
        <button className="bg-gray-800 text-white rounded">
          <InstagramLogoIcon />
        </button>
        <button className="bg-gray-800 text-white rounded">
          <LinkedInLogoIcon />
        </button>
        <button className="bg-gray-800 text-white rounded">
          <GitHubLogoIcon />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
