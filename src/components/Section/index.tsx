import React, { FC, Fragment } from "react";

import { SectionProps } from "./types";
import ComponentsHandler from "../componentsHandler";

const Section: FC<SectionProps> = ({
  title,
  description,
  children,
  components,
  grid,
}) => {
  console.log("grid Section with title:", grid, "grid components:", grid);
  return (
    <section className="text-center mt-10 px-4">
      <div className="max-w-5xl  mx-auto">
        <h2 className="text-3xl bg-clip-text text-transparent font-bold bg-gradient-to-b from-brand-400 to-brand-600 mb-2">
          {title}
        </h2>

        <p className="mt-2 text-gray-500">{description}</p>
        {children}
      </div>
      <div className="mt-10">
        <div
          className={`mt-6 grid grid-cols-1 md:grid-cols-${grid} gap-6 text-left max-w-5xl mx-auto px-4`}
        >
          {components?.map((component, index) => {
            if (!component || !component.__typename) return null;
            return (
              <Fragment key={index}>
                {ComponentsHandler[component.__typename]?.(component)}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section;
