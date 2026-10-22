import { NextRequest, NextResponse } from "next/server";
import { getPost, listPosts } from "@/lib/blog";

// Blog content lives in Contentful and must reflect publishes immediately.
export const dynamic = "force-dynamic";

/**
 * JSON view of the blog for the WebMCP tools (list_posts / get_post), which
 * run in the browser and cannot reach the CMS directly. `GET /api/blog`
 * returns every post without bodies; `GET /api/blog?slug=<slug>` returns one
 * post with its markdown body.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    const post = await getPost(slug);
    if (!post) {
      return NextResponse.json(
        { error: `Post not found: ${slug}` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      title: post.title,
      slug: post.slug,
      date: post.date,
      description: post.description,
      tags: post.tags,
      body: post.body,
    });
  }

  const posts = await listPosts();
  return NextResponse.json(
    posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      date: post.date,
      description: post.description,
      tags: post.tags,
    }))
  );
}
