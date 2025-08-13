export type BannerProps = {
  name: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  achievements?: {
    number: string;
    text: string;
  }[];
};
