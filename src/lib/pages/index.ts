import { cache } from "react";
import { client } from "@/lib/contentful";

/**
 * Fetches a PageLanding entry by URL, memoized per request so
 * generateMetadata and the page component share a single CMS call.
 * Returns null when the page is missing or the CMS is unreachable;
 * routes decide how to handle that (metadata falls back, render throws).
 */
export const getPageData = cache(async (url: string) => {
  try {
    const data = await client.pageLanding({ where: { url } });
    return data.pageLandingCollection?.items?.[0] ?? null;
  } catch (error) {
    console.error(`Error fetching landing page data for "${url}":`, error);
    return null;
  }
});
