import {
  ComponentBanner,
  ComponentCard,
  ComponentsCards,
  ComponentTagList,
  SectionComponentsItem,
  SingleAchievement,
} from "@/lib/contentful/__generated/sdk";

export const isComponentBanner = (
  component: SectionComponentsItem
): component is ComponentBanner => {
  return component.__typename === "ComponentBanner";
};

export const isComponentCards = (
  component: SectionComponentsItem
): component is ComponentsCards => {
  return component.__typename === "ComponentsCards";
};

export const isComponentCard = (
  component: SectionComponentsItem
): component is ComponentCard => {
  return component.__typename === "ComponentCard";
};

export const isComponentTagList = (
  component: SectionComponentsItem
): component is ComponentTagList => {
  return component.__typename === "ComponentTagList";
};

export const isSingleAchievement = (
  achievement: unknown
): achievement is SingleAchievement => {
  return (
    typeof achievement === "object" &&
    achievement !== null &&
    (achievement as SingleAchievement).__typename === "SingleAchievement"
  );
};
