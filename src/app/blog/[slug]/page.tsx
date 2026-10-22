import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import EditorView from "@/components/EditorView";
import { getPost } from "@/lib/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }
  const seo = post.seoFields;
  const title = seo?.pageTitle || post.title;
  const description = seo?.pageDescription || post.description;
  return {
    title,
    description,
    alternates: { canonical: seo?.canonicalUrl || `/blog/${post.slug}` },
    robots: {
      index: !seo?.noindex,
      follow: !seo?.nofollow,
    },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto mt-16 max-w-3xl px-4 pb-24 text-gray-900 dark:text-gray-100 md:mt-24">
      <Link
        href="/blog"
        className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        ← Blog
      </Link>

      <article className="mt-8">
        <header className="border-b border-black/10 pb-6 dark:border-white/15">
          <p className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(post.date))}
            </time>
          </p>
          <h1 className="mt-3 font-display text-3xl font-normal md:text-4xl">
            {post.title}
          </h1>
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
        </header>

        <div className="mt-8">
          <EditorView markdown={post.body} />
        </div>
      </article>
    </main>
  );
}