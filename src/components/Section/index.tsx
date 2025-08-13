import React, { FC, ReactNode } from "react";

import { SectionProps } from "./types";

const Section: FC<SectionProps> = ({ title, description, children }) => {
  return (
    <section className="text-center mt-10 px-4">
      <div className="max-w-5xl  mx-auto">
        <h2 className="text-3xl bg-clip-text text-transparent font-bold bg-gradient-to-b from-brand-400 to-brand-600 mb-2">
          {title}
        </h2>

        <p className="mt-2 text-gray-500">{description}</p>

        {children}
      </div>
    </section>
  );
};

export default Section;
