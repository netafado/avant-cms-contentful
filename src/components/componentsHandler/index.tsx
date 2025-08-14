import {
  SectionComponentsItem,
  ComponentTagList,
  SingleAchievement,
  ComponentCard,
} from "@/lib/contentful/__generated/sdk";
import Banner from "@/components/Banner";
import Tag from "@/components/Tag";
import { BannerProps } from "../Banner/types";
import { FC } from "react";
import Card from "@/components/Card";
import type { CardProps } from "@/components/Card/types";

import {
  isComponentBanner,
  isComponentCards,
  isComponentCard,
  isComponentTagList,
  isSingleAchievement,
} from "@/utils/componentsGuard";

type ComponentTagListProps = {
  color?: string;
  list: string[];
  title: string;
};

const ComponentTags: FC<ComponentTagListProps> = ({ list, title, color }) => {
  return (
    <div className="border py-2 px-4 border-gray-700 pr-4">
      <h3 className="mt-4 pb-2 font-semibold">{title}</h3>
      {list.map((tool, index) => (
        <Tag key={index} text={tool} color={color} size="small" />
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
        color: "company",
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
      color: "color",
    });

    return <ComponentTags {...componentProps} />;
  },
  ComponentsCards: (component: SectionComponentsItem) => {
    const cards = isComponentCards(component)
      ? component.cardsCollection?.items || []
      : [];
    console.log("ComponentsCards", cards);
    return <div>ComponentsCards Placeholder</div>;
  },
};

export default ComponentsHandler;
