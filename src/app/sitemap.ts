import type { MetadataRoute } from "next";
import { client } from "@/lib/contentful";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const data = await client.pageUrls();
    for (const item of data.pageLandingCollection?.items || []) {
      if (!item?.url || item.url === "/") continue;
      entries.push({
        url: `${SITE_URL}/${item.url.replace(/^\/+/, "")}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("Error building sitemap from Contentful:", error);
  }

  return entries;
}
