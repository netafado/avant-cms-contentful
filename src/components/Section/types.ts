import { SectionComponentsItem } from "@/lib/contentful/__generated/sdk";

export type SectionComponents = SectionComponentsItem & {
  title: string;
  description: string;
  [KeyProperty: string]: unknown;
};

export type SectionProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  components?: SectionComponents[];
  grid?: string;
  layoutType?: "default" | "no-title";
  textAlign?: "left" | "center" | "right";
};
