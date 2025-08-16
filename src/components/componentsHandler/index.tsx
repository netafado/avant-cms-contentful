import {
  SectionComponentsItem,
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
