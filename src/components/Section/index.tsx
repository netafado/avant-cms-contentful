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
}) => {
  const LayoutComponent = SectionOptions[layoutType] || SectionBase;
  console.log("Rendering Section with layoutType:", layoutType);
  return (
    <LayoutComponent {...{ title, description, children, components, grid }} />
  );
};

export default Section;
