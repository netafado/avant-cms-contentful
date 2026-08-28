import { Metadata } from "next";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Isaias Santos";

export const DEFAULT_TITLE = "Isaias Santos - Full Stack Developer";

export const DEFAULT_DESCRIPTION =
  "Portfolio of Isaias Santos, a Full Stack Developer specializing in Next.js and Contentful.";

export const SOCIAL_LINKS = {
  github: "https://github.com/netafado",
  linkedin: "https://www.linkedin.com/in/isaias-francisco-21097437",
  medium: "https://medium.com/@isaias.fran",
};

type SeoImage = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  title?: string | null;
  description?: string | null;
};

type SeoFields = {
  pageTitle?: string | null;
  pageDescription?: string | null;
  canonicalUrl?: string | null;
  nofollow?: boolean | null;
  noindex?: boolean | null;
  shareImagesCollection?: {
    items?: Array<SeoImage | null> | null;
  } | null;
};

/**
 * Maps Contentful's ComponentSeo entry onto Next.js metadata, falling back to
 * site defaults. Called from generateMetadata in every page route.
 */
export function buildMetadata(
  seo: SeoFields | null | undefined,
  path = "/"
): Metadata {
  const cleanPath = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}`;
  const canonical = seo?.canonicalUrl || cleanPath;
  const title = seo?.pageTitle || undefined;
  const description = seo?.pageDescription || DEFAULT_DESCRIPTION;

  const cmsImages = (seo?.shareImagesCollection?.items || [])
    .filter((image): image is SeoImage => Boolean(image?.url))
    .map((image) => ({
      url: image.url as string,
      width: image.width || undefined,
      height: image.height || undefined,
      alt: image.title || image.description || SITE_NAME,
    }));

  const images = cmsImages.length
    ? cmsImages
    : [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: DEFAULT_TITLE,
        },
      ];

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: new URL(canonical, SITE_URL).toString(),
    },
    robots: {
      index: !seo?.noindex,
      follow: !seo?.nofollow,
    },
    openGraph: {
      title: title || DEFAULT_TITLE,
      description,
      url: new URL(cleanPath, SITE_URL).toString(),
      siteName: SITE_NAME,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: title || DEFAULT_TITLE,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Full Stack Developer",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: new URL("/images/sun-hero.jpg", SITE_URL).toString(),
    sameAs: Object.values(SOCIAL_LINKS),
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Contentful",
      "GraphQL",
      "Tailwind CSS",
      "AWS",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DEFAULT_TITLE,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };
}
