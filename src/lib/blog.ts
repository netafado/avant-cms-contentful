import { cache } from "react";
import { client } from "@/lib/contentful";
import type { BlogPostFieldsFragment } from "@/lib/contentful/__generated/sdk";

export type Post = {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  body: string;
  seoFields?: BlogPostFieldsFragment["seoFields"];
};

function toPost(item: BlogPostFieldsFragment): Post {
  return {
    title: item.title ?? "",
    slug: item.slug ?? "",
    date: item.date ? String(item.date) : "",
    description: item.description ?? "",
    tags: (item.tags ?? []).filter((tag): tag is string => Boolean(tag)),
    body: item.body ?? "",
    seoFields: item.seoFields ?? undefined,
  };
}

function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
}

/**
 * Lists published blog posts from Contentful, newest first. Memoized per
 * request so the listing page and the sitemap share a single CMS call.
 * Returns an empty list when the CMS is unreachable so callers can
 * render an empty state instead of failing.
 */
export const listPosts = cache(async (): Promise<Post[]> => {
  try {
    const data = await client.blogPosts();
    const items = data.blogPostCollection?.items ?? [];
    return sortByDateDesc(
      items
        .filter((item): item is BlogPostFieldsFragment => item !== null)
        .map(toPost)
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
});

/**
 * Fetches a single blog post by slug, memoized per request so
 * generateMetadata and the page component share a single CMS call.
 * Returns null when the post is missing or the CMS is unreachable.
 */
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  try {
    const data = await client.blogPost({ where: { slug } });
    const item = data.blogPostCollection?.items?.[0];
    return item ? toPost(item) : null;
  } catch (error) {
    console.error(`Error fetching blog post "${slug}":`, error);
    return null;
  }
});
