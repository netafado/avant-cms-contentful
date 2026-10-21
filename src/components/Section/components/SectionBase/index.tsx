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
  const translations: Translations = {
    defaultName: t("defaultName"),
    defaultText: t("defaultText"),
    defaultImageAlt: t("defaultImageAlt"),
    defaultCvFileName: t("defaultCvFileName"),
  };

  const textAlignmentClass = TEXT_ALIGN[textAlign || "center"];

  return (
    <section className={`mt-16 px-4 md:mt-24 ${textAlignmentClass}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-4 border-b border-black/10 pb-4 font-display text-3xl font-normal text-gray-900 dark:border-white/15 dark:text-white md:text-4xl">
          {title}
        </h2>
        {description && <EditorView markdown={description} />}

        {children}
      </div>
      <div className="mt-8">
        <div
          className={clsx(
            "mt-6 grid gap-6 text-left  mx-auto px-4",
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
