import Image from "next/image";
import Banner from "@/components/Banner";
import Navigator from "@/components/Navigation";
import SectionAbout from "@/components/SectionAbout";
import Section from "@/components/Section";

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
    tools: ["React", "Tailwind", "TypeScript"],
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
  {
    company: "Object Edge",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Focused on building responsive user interfaces and improving user experience.",
  },
  {
    company: "Happy BIZ",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Focused on building responsive user interfaces and improving user experience.",
  },
  {
    company: "Fontoura Hot",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Focused on building responsive user interfaces and improving user experience.",
  },
];

const frontendTools = ["Next.js", "React", "Tailwind", "TypeScript", "Node.js"];

const integrationTools = [
  "Contentful",
  "commercetools",
  "doordash",
  "stripe",
  "braintree",
  "copilotKit",
  "ChatGPT",
];

const backendTools = ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"];

export default function Home() {
  return (
    <div className="font-sans w-full">
      <main>
        <Navigator />
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
          title="Full-Stack Developer"
          description="Senior Full Stack Developer with over 10 years of experience designing and building scalable microservices and modern web applications. Some technologies I work with:"
          frontendTools={frontendTools}
          backendTools={backendTools}
          integrationTools={integrationTools}
        />

        <Section
          title="Experience"
          description="Interested in collaborating or have any questions? Feel free to reach out!"
        >
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
        </Section>
      </main>
      <footer className="row-start-3 mt-4 flex gap-[24px] flex-wrap items-center justify-center p-5 text-sm text-gray-500">
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
          Medium Articles
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
          Developed with Next.js, Contentful and AWS
        </a>
      </footer>
    </div>
  );
}
