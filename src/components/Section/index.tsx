import React, { FC } from "react";

import { SectionProps } from "./types";
import SectionNoTitle from "./components/SectionNoTitle";
import SectionBase from "./components/SectionBase";

const SectionOptions = {
  default: SectionBase,
  "no-title": SectionNoTitle,
};

const Section: FC<SectionProps> = ({
  title,
  description,
  children,
  components,
  grid,
  layoutType = "default",
  ...rest
}) => {
  const LayoutComponent = SectionOptions[layoutType] || SectionBase;

  return (
    <LayoutComponent
      {...{ title, description, children, components, grid, ...rest }}
    />
  );
};

export default Section;
