import React, { FC, Fragment } from "react";

import { SectionProps } from "@/components/Section/types";
import ComponentsHandler from "@/components/componentsHandler";

const SectionNoTitle: FC<SectionProps> = ({ components, grid }) => {
  return (
    <section className="text-center mt-10 px-4">
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
    </section>
  );
};

export default SectionNoTitle;
