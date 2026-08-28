import React, { FC, Fragment } from "react";

import { SectionProps } from "@/components/Section/types";
import ComponentsHandler from "@/components/componentsHandler";

const SectionNoTitle: FC<SectionProps> = ({ components }) => {
  return (
    <section className="text-center">
      <div className={`grid gap-6 text-left mx-auto`}>
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
