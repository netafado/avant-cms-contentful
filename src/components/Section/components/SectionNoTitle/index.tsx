import React, { FC, Fragment } from "react";

import { SectionProps } from "@/components/Section/types";
import ComponentsHandler, {
  type Translations,
} from "@/components/componentsHandler";
import { getTranslations } from "next-intl/server";

const SectionNoTitle: FC<SectionProps> = async ({ components }) => {
  const t = await getTranslations("Components");
  const tProjects = await getTranslations("Projects");
  const translations: Translations = {
    defaultName: t("defaultName"),
    defaultText: t("defaultText"),
    defaultImageAlt: t("defaultImageAlt"),
    defaultCvFileName: t("defaultCvFileName"),
    viewProject: tProjects("viewProject"),
    categories: tProjects("categories"),
    technologies: tProjects("technologies"),
  };

  return (
    <section className="text-center">
      <div className={`grid gap-6 text-left mx-auto`}>
        {components?.map((component, index) => {
          if (!component || !component.__typename) return null;
          return (
            <Fragment key={index}>
              {ComponentsHandler[component.__typename]?.(component, translations)}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default SectionNoTitle;
