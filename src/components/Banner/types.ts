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
  cv?: {
    src: string;
    fileName: string;
    contentType: string;
  };
  achievements?: {
    items: Achievements[];
  };
};
