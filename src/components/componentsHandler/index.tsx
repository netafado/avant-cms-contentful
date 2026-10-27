import {
  SectionComponentsItem,
  ComponentBanner,
  ComponentTagList,
  SingleAchievement,
  ComponentCard,
} from "@/lib/contentful/__generated/sdk";
import Banner from "@/components/Banner";
import { BannerProps } from "../Banner/types";

import Card from "@/components/Card";
import type { CardProps } from "@/components/Card/types";
import transformToComponentProps from "@/utils/transformToComponentProps";
import ComponentTags from "@/components/CardWithTagList";
import ProjectCard, {
  SPAN_CLASSES,
  type ProjectCardVariant,
} from "@/components/ProjectCard";
import Spotlight from "@/components/motion/Spotlight";
import slugify from "@/utils/slugify";
import { toProjectSummary } from "@/lib/projects";

import {
  isComponentBanner,
  isComponentCards,
  isComponentCard,
  isComponentProjectList,
  isComponentTagList,
  isSingleAchievement,
} from "@/utils/componentsGuard";

type ComponentTagListProps = {
  color?: string;
  list: string[];
  title: string;
};

type Translations = {
  defaultName: string;
  defaultText: string;
  defaultImageAlt: string;
  defaultCvFileName: string;
  viewProject: string;
  categories: string;
  technologies: string;
};

// Bento emphasis by position in the CMS list: the opening card is the
// featured cell, the next one is wide-short, and the personal-project card
// gets the dashed self-reference treatment wherever it sits.
const projectVariant = (
  project: ReturnType<typeof toProjectSummary>,
  index: number
): ProjectCardVariant => {
  if (/^personal project/i.test(project.client)) return "meta";
  if (index === 0) return "featured";
  if (index === 1) return "wide";
  return "default";
};

const buildBanner = (
  component: ComponentBanner,
  t: Translations
): BannerProps => ({
  name: component.title || t.defaultName,
  cv: component.cv
    ? {
        src: component.cv.url || "",
        fileName: component.cv.fileName || t.defaultCvFileName,
        contentType: component.cv.contentType || "application/pdf",
      }
    : undefined,
  image: component.mainImage
    ? {
        src: component.mainImage.url || "",
        width: component.mainImage.width || 400,
        height: component.mainImage.height || 400,
        alt:
          component.mainImage.title ||
          component.mainImage.description ||
          "",
      }
    : {
        src: "/default-image.jpg",
        width: 400,
        height: 400,
        alt: t.defaultImageAlt,
      },
  achievements: component.achievementsCollection?.items
    ? {
        items: component.achievementsCollection.items
          .filter((achievement): achievement is SingleAchievement =>
            isSingleAchievement(achievement)
          )
          .map((achievement) => ({
            number: achievement.number || "0",
            text: achievement.text || t.defaultText,
          })),
      }
    : undefined,
});

const ComponentsHandler = {
  ComponentBanner: (component: SectionComponentsItem, t: Translations) => {
    if (!isComponentBanner(component)) {
      return null;
    }
    return <Banner {...buildBanner(component, t)} />;
  },
  ComponentCard: (component: SectionComponentsItem) => {
    if (!isComponentCard(component)) {
      return null;
    }
    const props = transformToComponentProps<CardProps, ComponentCard>(
      component,
      {
        company: "company",
        role: "title",
        roles: "subtitle",
        description: "description",
        duration: "subtitle",
        tools: "categories",
        color: "company",
      }
    );
    return (
      <Spotlight className="stagger-item h-full">
        <Card
          {...props}
          id={props.company ? slugify(props.company) : undefined}
        />
      </Spotlight>
    );
  },
  ComponentTagList: (component: SectionComponentsItem) => {
    const isTagList = isComponentTagList(component);
    if (!isTagList) {
      return null;
    }

    const componentProps = transformToComponentProps<
      ComponentTagListProps,
      ComponentTagList
    >(component, {
      list: "tags",
      title: "title",
      color: "color",
    });

    return <ComponentTags {...componentProps} />;
  },
  ComponentsCards: (component: SectionComponentsItem) => {
    const hasCards = isComponentCards(component);
    return hasCards ? <div>ComponentsCards Placeholder</div> : null;
  },
  // Each card sits inside a Spotlight that is the section grid's direct
  // child, so the CMS `grid` field keeps control of the column count and the
  // bento span classes land on the wrapper.
  ComponentProjectList: (component: SectionComponentsItem, t: Translations) => {
    if (!isComponentProjectList(component)) {
      return null;
    }
    const projects = (component.projectsCollection?.items ?? [])
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .map(toProjectSummary)
      .filter((project) => project.slug);
    const labels = {
      viewProject: t.viewProject,
      categories: t.categories,
      technologies: t.technologies,
    };
    return (
      <>
        {projects.map((project, index) => {
          const variant = projectVariant(project, index);
          return (
            <Spotlight
              key={project.slug}
              className={`stagger-item h-full ${SPAN_CLASSES[variant]}`}
            >
              <ProjectCard
                project={project}
                labels={labels}
                variant={variant}
                index={index + 1}
              />
            </Spotlight>
          );
        })}
      </>
    );
  },
};

export default ComponentsHandler;
export type { Translations };
