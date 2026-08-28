/**
 * Pure JSON-LD builders. Each builder returns a `schema-dts`-typed object
 * ready to be serialised into a `<script type="application/ld+json">` tag.
 *
 * Design rules:
 *  - The `Person` is the only literal entity. Everything else references it
 *    by `@id` so the schema graph is a graph, not a pile of disconnected
 *    objects. This is what lets Google (and AI retrievers) treat scattered
 *    mentions as one entity.
 *  - Builders take their inputs explicitly and never read the filesystem
 *    or network. That makes them trivial to unit-test.
 */
import type {
  BreadcrumbList,
  Organization,
  Person,
  ProfilePage,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig } from "./site-config";

const sameAs = [
  siteConfig.socials.linkedin,
  siteConfig.socials.github,
  siteConfig.socials.medium,
].filter(Boolean);

export function buildPerson(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": siteConfig.personId,
    name: "Isaias F. Santos",
    givenName: "Isaias",
    familyName: "Santos",
    alternateName: "Isaias Francisco Santos",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-stack developer in São Paulo, Brazil, specialising in Next.js, Contentful, React, and Node.js.",
    url: siteConfig.siteUrl,
    image: siteConfig.logoUrl,
    sameAs,
    email: siteConfig.socials.email.replace(/^mailto:/, ""),
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Contentful",
      "Headless CMS",
      "AWS Amplify",
      "Server-Side Rendering",
      "Static Site Generation",
      "GraphQL",
      "Tailwind CSS",
    ],
    worksFor: { "@id": siteConfig.organizationId },
  };
}

export function buildOrganization(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteConfig.organizationId,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: siteConfig.logoUrl,
      width: "512",
      height: "512",
    },
    sameAs,
    founder: { "@id": siteConfig.personId },
  };
}

export function buildWebSite(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteConfig.websiteId,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    inLanguage: siteConfig.locale,
    publisher: { "@id": siteConfig.organizationId },
    author: { "@id": siteConfig.personId },
  };
}

export type BreadcrumbItemInput = { name: string; url: string };

/**
 * Build a BreadcrumbList. Each item's `url` should be a path (e.g. `/about`).
 * It is resolved against `siteConfig.siteUrl` to keep the JSON-LD portable.
 */
export function buildBreadcrumbList(
  items: BreadcrumbItemInput[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.siteUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

export type ProfilePageInput = {
  /** Path (e.g. "/" or "/resume"). Resolved against `siteConfig.siteUrl`. */
  path: string;
  name: string;
  description: string;
  /** ISO 8601 date string. Used as `dateModified`. */
  lastModified?: string;
};

/**
 * Build a `ProfilePage` for the portfolio root or any page that is
 * "about-this-person" shaped. Articles, blog posts, and product pages
 * should NOT use this — they need an `Article`/`BlogPosting` schema
 * instead. The `schemaType` arg is reserved for that future swap.
 */
export function buildProfilePage(
  input: ProfilePageInput,
): WithContext<ProfilePage> {
  const url = input.path.startsWith("http")
    ? input.path
    : `${siteConfig.siteUrl}${input.path.startsWith("/") ? "" : "/"}${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    inLanguage: siteConfig.locale,
    isPartOf: { "@id": siteConfig.websiteId },
    mainEntity: { "@id": siteConfig.personId },
    about: { "@id": siteConfig.personId },
    dateModified: input.lastModified,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
    },
  };
}
