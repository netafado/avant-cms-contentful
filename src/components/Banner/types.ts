type Achievements = {
  number: string;
  text: string;
};

export type BannerProps = {
  name: string;
  /** Optional secondary mono line, e.g. "Full-Stack Developer". */
  role?: string;
  /** Optional third mono line, e.g. "Next.js · Contentful · Node". */
  subtitle?: string;
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
