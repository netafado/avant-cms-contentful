import Image from "next/image";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import SectionAbout from "@/components/SectionAbout";
import Section from "@/components/Section";
import { client } from "@/lib/contentful";
const experience = [
  {
    company: "Bold Commerce",
    role: "Full Stack Developer",
    duration: "2019 - Present",
    tools: ["Next.js", "Contentful", "AWS", "TypeScript", "Node.js"],
    description:
      "Assisting clients in enabling and customizing the checkout experience on their storefronts. Writing robust unit tests to ensure reliability and maintainability. Collaborating with DevOps to define and implement effective deployment strategies",
  },
  {
    company: "Everest Erp",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind", "TypeScript"],
    description:
      "I led development initiatives across serverless and cloud-native environments, utilizing AWS services such as Lambda Functions, SQS, EventBridge, Cognito, and RDS to build scalable and resilient systems. On the frontend, I used React, Redux, and React Context for effective state management, with a strong focus on performance and maintainability.",
  },

  {
    company: "Valtech",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Led development of a monorepo-based architecture using Nx, supporting multiple micro-frontends with Next.js (deployed via Edgio) and backend APIs running in GKE clusters. Implemented a MACH-compliant architecture with scalable microservices, modern API layers, and cloud-native deployments. Contributed to the design and implementation of a modular, modern e-commerce platform leveraging Microservices, APIs, Cloud-native services, and Headless commerce principles.",
  },
  {
    company: "Object Edge",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Led the implementation and ongoing support of a subscription program, increasing customer retention and driving a 12% boost in recurring revenue.Supported the team’s migration from PHP to a modern stack (Vue.js and Node.js), resulting in improved performance and a more seamless user experience. Implemented MACH architecture with Vue.js, TypeScript, GraphQL, AWS, and Node.js to enhance agility and scalability. Optimized site performance to improve conversion rates and support business growth. Built backend solutions using AWS Lambda and EventBridge to automate notifications and transactional emails, streamlining operations and improving customer communication. Contributed to the architecture of a modern e-commerce platform based on Microservices, APIs, Cloud-native SaaS, and Headless commerce principles.",
  },
  {
    company: "Happy BIZ",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "Work with focus on creating mobile and web applications using React, Javascript ,Typescript, React Native and AWS. I was responsible for creating and implementing all UI/UX for web and mobile applications .",
  },
  {
    company: "Fontoura Hot",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    description:
      "In Fontoura Hot I worked as a Designer(UI/UX) and front-end developer at this time working basically with JQuery, Javascript and Wordpress",
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
const getLandingPageData = async () => {
  try {
    const data = await client.pageLanding();
    return data;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};
const homePageData = await getLandingPageData();

export default function Home() {
  console.log("Home page data:", homePageData);
  return (
    <div className="font-sans w-full">
      <main>
        <Navigation />
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
          description="Check out my work experience and the technologies I've used"
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
