import { FC } from "react";
import { SectionAboutProps } from "./types";

const Section: FC<SectionAboutProps> = ({
  frontendTools,
  backendTools,
  integrationTools,
}) => {
  return (
    <section className="text-gray-400 text-center md:transition-all md:duration-1000 mx-auto max-w-3xl px-4 md:p-0 prose prose-invert prose-headings:my-4 first-of-type:prose-headings:mt-0 prose-p:mx-auto prose-p:max-w-prose md:prose-headings:my-6 prose-hr:mx-auto prose-hr:max-w-md mt-10">
      <h2 className="text-3xl bg-clip-text text-transparent font-bold bg-gradient-to-b from-brand-400 to-brand-600 mb-2">
        Full-Stack Developer
      </h2>
      <p className="mb-4 pb-2">
        Senior Full Stack Developer with over 10 years of experience designing
        and building scalable microservices and modern web applications.
      </p>
      <p className="text-lg font-semibold">Technologies I work with:</p>
      <div className="text-left flex flex-row items-center justify-center gap-4 mb-6 border-b border-gray-700 pb-4">
        <div className="border-r border-gray-700 pr-4">
          <h3 className="text-white mt-4 pb-2 font-semibold">
            Frontend Technologies:
          </h3>
          {frontendTools.map((tool, index) => (
            <span
              key={index}
              className="inline-block bg-gray-800 text-blue-500 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="border-r border-gray-700 pr-4">
          <h3 className="text-white mt-4 pb-2 font-semibold">
            Backend Technologies:
          </h3>
          {backendTools.map((tool, index) => (
            <span
              key={index}
              className="inline-block bg-pink-800/40 text-pink-500 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
            >
              {tool}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-white pb-2 font-semibold">Integrations:</h3>
          {integrationTools.map((tool, index) => (
            <span
              key={index}
              className="inline-block bg-violet-800/40 text-violet-400 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <button className="mt-4 font-semibold px-2 bg-brand-600 px-4 py-2 text-white hover:bg-brand-500 border border-brand-500 transition-colors duration-300">
        Download Resume
      </button>
    </section>
  );
};

export default Section;
