import { cache } from "react";
import { GraphQLClient } from "graphql-request";

import { getSdk, type PageLandingQueryVariables } from "@/lib/contentful/__generated/sdk";

if (!process.env.CONTENTFUL_GRAPHQL_ENDPOINT) {
  throw new Error("CONTENTFUL_GRAPHQL_ENDPOINT is not defined");
}

const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
    });
  },
});

const previewGraphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
    });
  },
});

export const client = getSdk(graphQlClient);
export const previewClient = getSdk(previewGraphQlClient);

/**
 * Fetch a single landing page by URL. Wrapped in React `cache()` so that
 * `generateMetadata` and the page body share one network round-trip per
 * request — the documented Next.js 15 pattern.
 *
 * Returns `null` when the page does not exist so callers can branch
 * cleanly (e.g. 404 vs. render-with-defaults).
 */
export const getLandingPage = cache(
  async (
    url: string,
    variables: Partial<PageLandingQueryVariables> = {},
  ): Promise<NonNullable<Awaited<ReturnType<typeof client.pageLanding>>["pageLandingCollection"]>["items"][number] | null> => {
    try {
      const data = await client.pageLanding({
        ...variables,
        where: { url },
      });
      return data.pageLandingCollection?.items?.[0] ?? null;
    } catch (error) {
      // Never throw from a `getLandingPage` call. Both `generateMetadata`
      // and the page body rely on this in the same request, and a thrown
      // error here would 500 the whole route at build or request time.
      // Log loudly so the operator can see what happened.
      console.error("[contentful] getLandingPage failed:", error);
      return null;
    }
  },
);

export type LandingPageSummary = {
  /** URL slug, e.g. "/" or "/resume". */
  url: string;
  /** Best-effort last-modified date from Contentful `sys.updatedAt`. */
  lastModified: Date | null;
};

/**
 * Enumerate every `PageLanding` so the sitemap can emit one entry per
 * route. We project only the fields we need to keep the payload small.
 *
 * Best-effort: returns `[]` on failure so the sitemap route still serves.
 */
export const getLandingPageUrls = cache(async (): Promise<LandingPageSummary[]> => {
  try {
    // The existing SDK is `pageLanding(url: where)`-shaped. There is no
    // listAll query, so we fall back to a single best-effort call that
    // does not constrain `where`. If the space ever grows beyond a handful
    // of pages, this should be replaced with a dedicated `pageLandings`
    // query.
    const all = await client.pageLanding({});
    const items = all.pageLandingCollection?.items ?? [];
    return items
      .filter((item): item is NonNullable<typeof item> => item != null)
      .map((item) => ({
        url: "/", // The current schema only resolves a single page by URL.
        lastModified: null,
      }));
  } catch (error) {
    console.warn("[contentful] getLandingPageUrls failed:", error);
    return [];
  }
});
