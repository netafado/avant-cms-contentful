import Image from "next/image";
import Banner from "./components/Banner";
import {
  HomeIcon,
  ImageIcon,
  BackpackIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import SectionAbout from "./components/SectionAbout";

const experience = [
  {
    company: "Bold Commerce",
    role: "Full Stack Developer",
    duration: "2019 - Present",
    tools: ["Next.js", "Contentful", "AWS", "TypeScript", "Node.js"],
    description:
      "Developed and maintained web applications using Next.js and Contentful.",
  },
  {
    company: "Everest Erp",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Focused on building responsive user interfaces and improving user experience.",
  },

  {
    company: "Valtech",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Focused on building responsive user interfaces and improving user experience.",
  },
];

const frontendTools = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
];

const integrationTools = [
  "Contentful",
  "commercetools",
  "doordash",
  "stripe",
  "braintree",
];

const backendTools = ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"];

export default function Home() {
  return (
    <div className="font-sans w-full">
      <main>
        <div className="fixed top-10 right-10 z-50 bg-gray-800 rounded-full p-2 flex flex-col items-center justify-center gap-2">
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
        <div className="mx-auto my-auto px-4">
          <div className="items-center py-10 md:p-10 lg:p-20">
            <Banner
              name="Isaias Santos"
              image={{
                src: "/isaias-c.png",
                width: 400,
                height: 400,
                alt: "",
              }}
              achievements={[
                { number: "60%", text: "Frontend" },
                { number: "40%", text: "Backend" },
                { number: "10+", text: "Years of Experience" },
                { number: "20+", text: "Projects" },
              ]}
            />
          </div>
        </div>

        <SectionAbout
          frontendTools={frontendTools}
          backendTools={backendTools}
          integrationTools={integrationTools}
        />

        <section className="text-center mt-10">
          <h2 className="text-3xl bg-clip-text text-transparent font-bold bg-gradient-to-b from-brand-400 to-brand-600 mb-2">
            Experience
          </h2>

          <p className="mt-2 text-gray-500">
            Interested in collaborating or have any questions? Feel free to
            reach out!
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl mx-auto px-4">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 dark:border-gray-800 rounded-sm"
              >
                <h3 className="text-white  font-semibold">{exp.company}</h3>
                <p className="text-sm">{exp.role}</p>
                <p className="text-sm text-gray-500 text-xs">{exp.duration}</p>
                <ul className="mt-2 list-none flex flex-wrap gap-2 text-sm text-gray-700">
                  {exp.tools.map((tool, idx) => (
                    <li
                      className="bg-success-500/30 text-xs text-success-500 px-2 rounded-sm"
                      key={idx}
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center p-4 text-sm text-gray-500">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
