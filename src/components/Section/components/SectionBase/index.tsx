import React, { FC, Fragment } from "react";

import { SectionProps } from "@/components/Section/types";
import ComponentsHandler, {
  type Translations,
} from "@/components/componentsHandler";
import EditorView from "@/components/EditorView";
import { GRID, TEXT_ALIGN } from "@/components/Section/constants";
import { clsx } from "clsx";
import { getTranslations } from "next-intl/server";

const SectionBase: FC<SectionProps> = async ({
  title,
  description,
  children,
  components,
  grid,
  textAlign,
}) => {
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

  const textAlignmentClass = TEXT_ALIGN[textAlign || "center"];

  return (
    <section className={`mt-16 px-6 md:mt-24 md:px-12 ${textAlignmentClass}`}>
      <div className="mx-auto max-w-[1360px]">
        <h2 className="mb-6 border-b border-black/10 pb-6 font-display text-3xl font-normal tracking-tight text-gray-900 dark:border-hairline dark:text-bright md:text-4xl">
          {title}
        </h2>
        {description && <EditorView markdown={description} />}

        {children}
      </div>
      <div className="mt-8">
        <div
          className={clsx(
            "mt-6 grid gap-6 text-left mx-auto",
            GRID[(grid as keyof typeof GRID) || "1"],
          )}
        >
          {components?.map((component, index) => {
            if (!component || !component.__typename) return null;
            return (
              <Fragment key={index}>
                {ComponentsHandler[component.__typename]?.(component, translations)}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionBase;
