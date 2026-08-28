/**
 * Single source of truth for site-wide SEO and brand metadata.
 *
 * Keep this file boring and synchronous: no fetch, no Contentful. The
 * Contentful `seoFields` fragment may override individual fields per-page,
 * but the defaults and the stable entity IDs (e.g. `personId`) live here.
 */
export const siteConfig = {
  /**
   * TODO: replace with the real production URL before deploy. Used as
   * `metadataBase`, canonical URLs, sitemap, llms.txt, and as the root of
   * every JSON-LD `@id`. Read from `NEXT_PUBLIC_SITE_URL` when available
   * so the same build can be served from preview, UAT, and prod.
   */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://isaias-santos-home-page.example.com",

  siteName: "Isaias F. Santos",
  defaultTitle: "Isaias F. Santos — Full-Stack Developer",
  titleTemplate: "%s | Isaias F. Santos",
  defaultDescription:
    "Portfolio of Isaias F. Santos, a full-stack developer in São Paulo specializing in Next.js, Contentful, React, and Node.",
  defaultOgImage: "/android-chrome-512x512.png",
  locale: "en",
  /**
   * Twitter handle. Unknown today — left null so we don't publish a wrong
   * `@creator` tag. Set to a string (e.g. "@netafado") once confirmed.
   */
  twitterHandle: null as string | null,

  /** SameAs anchors for the Person entity. Match the socials in Navigation. */
  socials: {
    linkedin: "https://www.linkedin.com/in/isaias-francisco-21097437",
    github: "https://github.com/netafado",
    medium: "https://medium.com/@isaias.fran",
    email: "mailto:isaias.santos@ignitevisibility.com",
  },

  /** Stable person @id, referenced by every other entity in the JSON-LD graph. */
  get personId() {
    return `${this.siteUrl}/#person`;
  },
  get websiteId() {
    return `${this.siteUrl}/#website`;
  },
  get organizationId() {
    return `${this.siteUrl}/#organization`;
  },
  get profilePageId() {
    return `${this.siteUrl}/#profile`;
  },
  get logoUrl() {
    return `${this.siteUrl}/android-chrome-512x512.png`;
  },
} as const;

export type SiteConfig = typeof siteConfig;
