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
    <section className={`mt-10 px-4 ${textAlignmentClass}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl bg-clip-text text-transparent font-bold bg-gradient-to-b from-brand-400 to-brand-600 mb-2">
          {title}
        </h2>
        {description && <EditorView markdown={description} />}

        {children}
      </div>
      <div className="mt-5">
        <div
          className={clsx(
            "mt-6 grid gap-6 text-left max-w-5xl mx-auto px-4",
            GRID[(grid as keyof typeof GRID) || "1"]
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
