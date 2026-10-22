import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/blog";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing about AI, the web, and headless CMS work from ${SITE_NAME}.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: `Writing about AI, the web, and headless CMS work from ${SITE_NAME}.`,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description: `Writing about AI, the web, and headless CMS work from ${SITE_NAME}.`,
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    <main className="mx-auto mt-16 max-w-3xl px-4 pb-24 text-gray-900 dark:text-gray-100 md:mt-24">
      <header className="border-b border-black/10 pb-6 dark:border-white/15">
        <h1 className="font-display text-3xl font-normal md:text-4xl">Blog</h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {DEFAULT_DESCRIPTION}
        </p>
      </header>

      {posts.length === 0 && (
        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          No posts published yet.
        </p>
      )}

      <ul className="mt-8 space-y-8">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border border-black/15 px-6 py-6 dark:border-white/15"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
              <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
            </p>
            <h2 className="mt-2 font-display text-2xl font-normal">
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-900 hover:text-black dark:text-gray-100 dark:hover:text-white"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              {post.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={`${post.slug}_${tag}`}
                  className="border border-black/20 px-2 py-0.5 text-[10px] tracking-[0.15em] text-gray-600 uppercase dark:border-white/20 dark:text-gray-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}