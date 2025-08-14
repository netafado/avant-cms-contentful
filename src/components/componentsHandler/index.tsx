import {
  SectionComponentsItem,
  ComponentTagList,
  SingleAchievement,
  ComponentCard,
} from "@/lib/contentful/__generated/sdk";
import Banner from "@/components/Banner";
import { BannerProps } from "../Banner/types";
import { FC } from "react";

import {
  isComponentBanner,
  isComponentCards,
  isComponentCard,
  isComponentTagList,
  isSingleAchievement,
} from "@/utils/componentsGuard";

type CardProps = {
  company: string;
  role: string;
  roles: string;
  description: string;
  duration: string;
  tools: string[];
};

const Card = (props: CardProps) => {
  const { company, role, duration, tools, description } = props;
  return (
    <div className="p-4 border border-gray-300 dark:border-gray-800 rounded-sm">
      <h3 className="text-white  font-semibold">{company}</h3>
      <p className="text-sm">{role}</p>
      <p className="text-sm text-gray-500 text-xs">{duration}</p>
      <ul className="mt-2 list-none flex flex-wrap gap-2 text-sm text-gray-700">
        {tools?.map((tool, idx) => (
          <li
            className="bg-success-500/30 text-xs text-success-500 px-2 rounded-sm"
            key={idx}
          >
            {tool}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
};

type ComponentTagListProps = {
  list: string[];
  title: string;
};

const ComponentTags: FC<ComponentTagListProps> = ({ list, title }) => {
  return (
    <div className="border py-2 px-4 border-gray-700 pr-4">
      <h3 className="mt-4 pb-2 font-semibold">{title}:</h3>
      {list.map((tool, index) => (
        <span
          key={index}
          className="inline-block text-xs bg-violet-800/20 text-violet-500 px-3 py-1 rounded-full text-sm font-semibold mr-1 mb-1"
        >
          {tool}
        </span>
      ))}
    </div>
  );
};

const transformToComponentProps = <T extends object, S extends object>(
  component: S,
  propMap: { [K in keyof T]: keyof S }
): T => {
  const result = {} as T;
  (Object.keys(propMap) as Array<keyof T>).forEach((key) => {
    const sourceKey = propMap[key];
    if (component && component[sourceKey] !== undefined) {
      result[key] = component[sourceKey] as T[typeof key];
    }
  });
  return result;
};

const ComponentsHandler = {
  ComponentBanner: (component: SectionComponentsItem) => {
    if (!isComponentBanner(component)) {
      return null;
    }
    const bannerProps: BannerProps = {
      name: component.title || "Default Name",
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
            alt: "Default image",
          },
      achievements: component.achievementsCollection?.items
        ? {
            items: component.achievementsCollection.items
              .filter((achievement): achievement is SingleAchievement =>
                isSingleAchievement(achievement)
              )
              .map((achievement) => ({
                number: achievement.number || "0",
                text: achievement.text || "Default text",
              })),
          }
        : undefined,
    };

    return <Banner {...bannerProps} />;
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
      }
    );
    return <Card {...props} />;
  },
  ComponentTagList: (component: SectionComponentsItem) => {
    const isTagList = isComponentTagList(component);
    if (!isTagList) {
      console.warn("ComponentTagList expected, but got:", component);
      return null;
    }

    const componentProps = transformToComponentProps<
      ComponentTagListProps,
      ComponentTagList
    >(component, {
      list: "tags",
      title: "title",
    });

    return <ComponentTags {...componentProps} />;
  },
  ComponentsCards: (component: SectionComponentsItem) => {
    const cards = isComponentCards(component)
      ? component.cardsCollection?.items || []
      : [];

    return <div>ComponentsCards Placeholder</div>;
  },
};

export default ComponentsHandler;
