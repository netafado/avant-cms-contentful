import { Section as SectionType } from "@/lib/contentful/__generated/sdk";
import { SectionProps } from "@/components/Section/types";

const transFormToSections = (sections: SectionType[]): SectionProps[] => {
  return sections.map((section) => {
    const components = (section.componentsCollection?.items || [])
      .filter(
        (component): component is NonNullable<typeof component> =>
          component !== null
      )
      .map((component) => ({
        ...component,
        title: (component as any).title || "Component Title",
        description: (component as any).description || "Component Description",
      }));
    return {
      ...section,
      grid: section.grid || "1",
      title: section.title || "Section Title",
      description: section.description || "Section Description",
      layoutType: section.layoutType || "default",
      components,
    };
  });
};

export default transFormToSections;
