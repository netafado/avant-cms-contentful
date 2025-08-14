type Achievements = {
  number: string;
  text: string;
};
export type BannerProps = {
  name: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  achievements?: {
    items: Achievements[];
  };
};
