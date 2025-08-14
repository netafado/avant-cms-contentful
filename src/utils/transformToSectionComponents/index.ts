import { Section as SectionType } from "@/lib/contentful/__generated/sdk";
import { SectionProps } from "@/components/Section/types";

const isLayoutTypeValid = (
  layoutType: unknown
): layoutType is "default" | "no-title" => {
  return layoutType === "default" || layoutType === "no-title";
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const hasProps = (obj: Record<string, unknown>, props: string[]): boolean => {
  return props.every((prop) => prop in obj);
};

const returnStringIfExists = (
  obj: Record<string, unknown>,
  prop: string,
  defaultValue: string = "Default Value"
): string => {
  return hasProps(obj, [prop]) && isString(obj[prop])
    ? (obj[prop] as string)
    : defaultValue;
};

const transFormToSections = (sections: SectionType[]): SectionProps[] => {
  return sections.map((section) => {
    const components = (section.componentsCollection?.items || [])
      .filter(
        (component): component is NonNullable<typeof component> =>
          component !== null
      )
      .map((component) => ({
        ...component,
        title:
          returnStringIfExists(component, "title") ||
          returnStringIfExists(component, "name", "Component Title"),
        description:
          returnStringIfExists(component, "description") ||
          returnStringIfExists(component, "details", "Component Description"),
      }));
    return {
      ...section,
      grid: section.grid || "1",
      title: section.title || "Section Title",
      description: section.description || "Section Description",
      layoutType: isLayoutTypeValid(section.layoutType)
        ? section.layoutType
        : "default",
      components,
    };
  });
};

export default transFormToSections;
