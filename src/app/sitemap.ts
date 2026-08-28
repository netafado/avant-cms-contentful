import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { getLandingPageUrls } from "@/lib/contentful";

/**
 * Next.js metadata route. Generates `/sitemap.xml` at build/request time.
 *
 * Static routes come from a hard-coded list. Contentful-driven routes
 * come from `getLandingPageUrls()` — it enumerates every `PageLanding` and
 * surfaces its `url` + `sys.updatedAt`. We tolerate the Contentful call
 * failing (empty array) so the build still ships a sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  let cmsRoutes: MetadataRoute.Sitemap = [];
  try {
    const pages = await getLandingPageUrls();
    cmsRoutes = pages.map((page) => ({
      url: page.url.startsWith("http")
        ? page.url
        : `${siteConfig.siteUrl}${page.url.startsWith("/") ? "" : "/"}${page.url}`,
      lastModified: page.lastModified ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (err) {
    // Contentful may be unreachable at build time. Log and fall through
    // with only the static routes — still a valid sitemap.
    console.warn("[sitemap] failed to fetch landing pages:", err);
  }

  return [...staticRoutes, ...cmsRoutes];
}
