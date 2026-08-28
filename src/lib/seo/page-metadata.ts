import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { getLandingPage } from "@/lib/contentful";

type PageLandingLike = NonNullable<Awaited<ReturnType<typeof getLandingPage>>>;

type SeoFieldsLike = NonNullable<PageLandingLike["seoFields"]>;

/**
 * Build the Next.js `Metadata` for a given route. Pulls the Contentful
 * `seoFields` (when present) and merges it over the site defaults.
 *
 * The `generateMetadata` calls in `app/page.tsx` and `app/[url]/page.tsx`
 * both call this helper, so the merge logic lives in exactly one place.
 */
export async function buildPageMetadata(url: string): Promise<Metadata> {
  const canonical = url === "/" ? "/" : `/${url.replace(/^\/+/, "")}`;
  const fullCanonical = `${siteConfig.siteUrl}${canonical}`;

  const defaults: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: siteConfig.defaultTitle,
      template: siteConfig.titleTemplate,
    },
    description: siteConfig.defaultDescription,
    keywords: [
      "Isaias Francisco Santos",
      "Isaias F. Santos",
      "full-stack developer",
      "Next.js",
      "Contentful",
      "React",
      "Node.js",
      "TypeScript",
      "portfolio",
      "São Paulo",
    ],
    authors: [{ name: siteConfig.siteName, url: siteConfig.siteUrl }],
    creator: siteConfig.siteName,
    publisher: siteConfig.siteName,
    alternates: {
      canonical: fullCanonical,
    },
    openGraph: {
      type: "profile",
      siteName: siteConfig.siteName,
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      url: fullCanonical,
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 512,
          height: 512,
          alt: siteConfig.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      images: [siteConfig.defaultOgImage],
      ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };

  // Try to pull a Contentful-driven override. If the page is missing or
  // has no seoFields, fall back to the defaults.
  const page = await safeGetLandingPage(url);
  const seo = page?.seoFields as SeoFieldsLike | undefined;
  if (!seo) return defaults;

  const ogImage = seo.shareImagesCollection?.items?.[0];
  const ogImageUrl = ogImage?.url
    ? ogImage.url.startsWith("http")
      ? ogImage.url
      : `${siteConfig.siteUrl}${ogImage.url.startsWith("/") ? "" : "/"}${ogImage.url}`
    : undefined;

  const explicitCanonical = seo.canonicalUrl
    ? seo.canonicalUrl.startsWith("http")
      ? seo.canonicalUrl
      : `${siteConfig.siteUrl}${seo.canonicalUrl.startsWith("/") ? "" : "/"}${seo.canonicalUrl}`
    : fullCanonical;

  return {
    ...defaults,
    title: seo.pageTitle ?? defaults.title,
    description: seo.pageDescription ?? defaults.description,
    alternates: { canonical: explicitCanonical },
    openGraph: {
      type: "profile",
      siteName: siteConfig.siteName,
      title: seo.pageTitle ?? siteConfig.defaultTitle,
      description: seo.pageDescription ?? siteConfig.defaultDescription,
      url: explicitCanonical,
      locale: siteConfig.locale,
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                width: ogImage?.width ?? 1200,
                height: ogImage?.height ?? 630,
                alt:
                  ogImage?.title ||
                  ogImage?.description ||
                  siteConfig.siteName,
              },
            ],
          }
        : {}),
    },
    robots: {
      index: seo.noindex ? false : true,
      follow: seo.nofollow ? false : true,
      googleBot: {
        index: seo.noindex ? false : true,
        follow: seo.nofollow ? false : true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/**
 * Never throw from `generateMetadata` — Next.js will 500 the whole route
 * if we do. Swallow + log and return null.
 */
async function safeGetLandingPage(
  url: string,
): Promise<PageLandingLike | null> {
  try {
    return await getLandingPage(url);
  } catch (err) {
    console.warn(`[metadata] Contentful lookup failed for "${url}":`, err);
    return null;
  }
}
