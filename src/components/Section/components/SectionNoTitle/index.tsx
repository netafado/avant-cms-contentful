import React, { FC, Fragment } from "react";

import { SectionProps } from "@/components/Section/types";
import ComponentsHandler, {
  type Translations,
} from "@/components/componentsHandler";
import { getTranslations } from "next-intl/server";

const SectionNoTitle: FC<SectionProps> = async ({ components }) => {
  const t = await getTranslations("Components");
  const translations: Translations = {
    defaultName: t("defaultName"),
    defaultText: t("defaultText"),
    defaultImageAlt: t("defaultImageAlt"),
    defaultCvFileName: t("defaultCvFileName"),
  };

  return (
    <section className="text-center mt-10 px-4">
      <div className={`mt-6 grid gap-6 text-left max-w-5xl mx-auto px-4`}>
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
