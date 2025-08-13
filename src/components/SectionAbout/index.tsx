import { FC } from "react";
import { SectionAboutProps } from "./types";
import Section from "@/components/Section";

const SectionAbout: FC<SectionAboutProps> = ({
  frontendTools,
  backendTools,
  integrationTools,
  title,
  description,
}) => {
  return (
    <Section {...{ title, description }}>
      <div className="text-gray-400 text-left mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto px-4">
        <div className="border py-2 px-4 border-gray-700 pr-4">
          <h3 className=" mt-4 pb-2 font-semibold">Frontend Technologies:</h3>
          {frontendTools.map((tool, index) => (
            <span
              key={index}
              className="inline-block bg-gray-800 text-xs text-blue-500 px-3 py-1 rounded-full text-sm font-semibold mr-1 mb-1"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="border py-2 px-4 border-gray-700 pr-4">
          <h3 className="mt-4 pb-2 font-semibold">Backend Technologies:</h3>
          {backendTools.map((tool, index) => (
            <span
              key={index}
              className="inline-block bg-pink-800/20 text-xs text-pink-500 px-3 py-1 rounded-full text-sm font-semibold mr-1 mb-1"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="border py-2 px-4 border-gray-700 pr-4">
          <h3 className="mt-4 pb-2 font-semibold">Integrations:</h3>
          {integrationTools.map((tool, index) => (
            <span
              key={index}
              className="inline-block text-xs bg-violet-800/20 text-violet-500 px-3 py-1 rounded-full text-sm font-semibold mr-1 mb-1"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <button className="mt-4 font-semibold px-2 bg-brand-600 px-4 py-2 text-white hover:bg-brand-500 border border-brand-500 transition-colors duration-300">
        Download Resume
      </button>
    </Section>
  );
};

export default SectionAbout;
