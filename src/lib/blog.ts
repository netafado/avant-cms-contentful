import post1 from "@/content/blog/ai-agents-reshaping-the-web.md" with { type: "text" };
import post2 from "@/content/blog/llm-discoverability-seo.md" with { type: "text" };
import post3 from "@/content/blog/headless-cms-ai-content-pipelines.md" with { type: "text" };

export type Post = {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  body: string;
};

type Frontmatter = {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
};

export function parseFrontmatter(
  raw: string
): { frontmatter: Frontmatter; body: string } {
  const normalized = raw.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  if (lines[0]?.trim() !== "---") {
    throw new Error("Missing opening frontmatter fence");
  }
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      endIndex = i;
      break;
    }
  }
  if (endIndex === -1) {
    throw new Error("Missing closing frontmatter fence");
  }

  const meta: Record<string, string | string[]> = {};
  for (const line of lines.slice(1, endIndex)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    let value = trimmed.slice(colon + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).trim();
      meta[key] = value
        ? value.split(",").map((entry) => entry.trim())
        : [];
    } else {
      meta[key] = value;
    }
  }

  const frontmatter: Frontmatter = {
    title: String(meta.title ?? ""),
    slug: String(meta.slug ?? ""),
    date: String(meta.date ?? ""),
    description: String(meta.description ?? ""),
    tags: Array.isArray(meta.tags) ? meta.tags : [],
  };

  const body = lines.slice(endIndex + 1).join("\n").trim();
  return { frontmatter, body };
}

const POSTS: Post[] = [post1, post2, post3]
  .map((raw) => {
    const { frontmatter, body } = parseFrontmatter(raw);
    return { ...frontmatter, body };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function listPosts(): Post[] {
  return POSTS;
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}