import React, { FC, Fragment } from "react";

import { SectionProps } from "@/components/Section/types";
import ComponentsHandler, {
  type Translations,
} from "@/components/componentsHandler";
import EditorView from "@/components/EditorView";
import { GRID, TEXT_ALIGN } from "@/components/Section/constants";
import {
  isComponentCard,
} from "@/utils/componentsGuard";
import StaggerGroup from "@/components/motion/StaggerGroup";
import ExperienceRail, {
  type ExperienceRailItem,
} from "@/components/ExperienceRail";
import slugify from "@/utils/slugify";
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

  const list = components ?? [];
  const kinds = list.map((component) => component?.__typename);
  // Layout selection by section composition: a section of only experience
  // cards gains the sticky company rail, a section of only tag lists becomes
  // the intro/skills split, and a section containing the project list gets
  // the bento row sizing.
  const isExperience =
    list.length >= 3 && kinds.every((kind) => kind === "ComponentCard");
  const isSkills =
    list.length > 0 && kinds.every((kind) => kind === "ComponentTagList");
  const hasProjects = kinds.includes("ComponentProjectList");

  const gridClass = GRID[(grid as keyof typeof GRID) || "1"];
  const alignClass = TEXT_ALIGN[textAlign || (hasProjects ? "left" : "center")];

  const header = (
    <StaggerGroup>
      <h2 className="pb-6 font-display text-3xl font-normal tracking-tight text-gray-900 dark:text-bright md:text-4xl">
        {title}
      </h2>
      <div
        aria-hidden
        className="draw-x mb-6 h-px origin-left bg-black/10 dark:bg-hairline"
      />
      {description && <EditorView markdown={description} />}
    </StaggerGroup>
  );

  if (isExperience) {
    const railItems: ExperienceRailItem[] = list
      .filter(isComponentCard)
      .map((card) => {
        const label = String(card.company || card.title || "");
        return { id: slugify(label), label };
      })
      .filter((item) => item.id !== "");

    return (
      <section
        className={`mt-16 px-6 md:mt-24 md:px-12 ${TEXT_ALIGN[textAlign || "left"]}`}
      >
        <div className="mx-auto max-w-[1360px]">{header}</div>
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <ExperienceRail items={railItems} />
          <div className="lg:col-span-9">
            <StaggerGroup className={clsx("grid gap-6 text-left", gridClass)}>
              {list.map((component, index) => {
                if (!component || !component.__typename) return null;
                return (
                  <Fragment key={index}>
                    {ComponentsHandler[component.__typename]?.(
                      component,
                      translations
                    )}
                  </Fragment>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>
    );
  }

  if (isSkills) {
    return (
      <section className={`mt-16 px-6 md:mt-24 md:px-12 text-left`}>
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">{header}</div>
            <StaggerGroup className="flex flex-col gap-6 lg:col-span-5">
              {list.map((component, index) => {
                if (!component || !component.__typename) return null;
                return (
                  <Fragment key={index}>
                    {ComponentsHandler[component.__typename]?.(
                      component,
                      translations
                    )}
                  </Fragment>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mt-16 px-6 md:mt-24 md:px-12 ${alignClass}`}>
      <div className="mx-auto max-w-[1360px]">{header}</div>
      <div className="mt-8">
        <StaggerGroup
          className={clsx(
            "grid gap-6 text-left mx-auto",
            gridClass,
            hasProjects && "auto-rows-[minmax(240px,auto)]"
          )}
        >
          {list.map((component, index) => {
            if (!component || !component.__typename) return null;
            return (
              <Fragment key={index}>
                {ComponentsHandler[component.__typename]?.(
                  component,
                  translations
                )}
              </Fragment>
            );
          })}
        </StaggerGroup>
      </div>
      {children}
    </section>
  );
};

export default SectionBase;
