import {
  SITE_URL,
  SOCIAL_LINKS,
  personJsonLd,
} from "@/lib/seo";
import { listPosts, getPost } from "@/lib/blog";

/**
 * WebMCP tools exposed to AI agents via document.modelContext.
 * See https://github.com/webmachinelearning/webmcp
 */

/** MCP-style tool result carrying a single text payload. */
export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

const MAX_PAGE_CONTENT_LENGTH = 10_000;

/** Custom event dispatched to ask the ThemeProvider to flip the theme. */
export const TOGGLE_THEME_EVENT = "webmcp:toggle-theme";

export function textResult(text: string): ToolResult {
  return { content: [{ type: "text", text }] };
}

export function errorResult(text: string): ToolResult {
  return { content: [{ type: "text", text: `Error: ${text}` }], isError: true };
}

export function parseSitemap(
  xml: string
): Array<{ loc: string; lastmod?: string }> {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new Error("/sitemap.xml is not valid XML");
  }
  // Match by localName so the sitemap namespace cannot break lookups.
  return elementsByLocalName(doc, "url").map((entry) => {
    const loc = elementsByLocalName(entry, "loc")[0]?.textContent?.trim() ?? "";
    const lastmod = elementsByLocalName(entry, "lastmod")[0]?.textContent?.trim();
    return lastmod ? { loc, lastmod } : { loc };
  });
}

function elementsByLocalName(root: Document | Element, name: string): Element[] {
  return Array.from(root.getElementsByTagName("*")).filter(
    (element) => element.localName === name
  );
}

const getProfileTool: WebMCP.ModelContextTool = {
  name: "get_profile",
  title: "Get profile",
  description:
    "Returns Isaias Santos's profile as JSON: name, role, summary, skills, social links, and site URL.",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: true },
  execute: async () => {
    const person = personJsonLd();
    return textResult(
      JSON.stringify(
        {
          name: person.name,
          jobTitle: person.jobTitle,
          summary: person.description,
          skills: person.knowsAbout,
          socialLinks: SOCIAL_LINKS,
          siteUrl: SITE_URL,
        },
        null,
        2
      )
    );
  },
};

const listPagesTool: WebMCP.ModelContextTool = {
  name: "list_pages",
  title: "List pages",
  description:
    "Returns every page on this site as JSON, read from /sitemap.xml. Each entry has the page URL and an optional lastmod date.",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: true },
  execute: async () => {
    try {
      const response = await fetch(`${window.location.origin}/sitemap.xml`);
      if (!response.ok) {
        throw new Error(`/sitemap.xml responded with status ${response.status}`);
      }
      const pages = parseSitemap(await response.text());
      return textResult(JSON.stringify(pages, null, 2));
    } catch (error) {
      return errorResult(
        error instanceof Error ? error.message : "Could not read /sitemap.xml"
      );
    }
  },
};

const getPageContentTool: WebMCP.ModelContextTool = {
  name: "get_page_content",
  title: "Get page content",
  description:
    "Returns the current page's title, URL, and visible text content as JSON (capped at 10,000 characters).",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: true },
  execute: async () => {
    const fullText = (
      document.body?.innerText ??
      document.body?.textContent ??
      ""
    )
      .replace(/\s+/g, " ")
      .trim();
    const truncated = fullText.length > MAX_PAGE_CONTENT_LENGTH;
    return textResult(
      JSON.stringify(
        {
          title: document.title,
          url: window.location.href,
          text: fullText.slice(0, MAX_PAGE_CONTENT_LENGTH),
          truncated,
        },
        null,
        2
      )
    );
  },
};

/**
 * Resolves a raw path-or-URL against a site origin, returning null unless it
 * stays on that origin. Site-relative paths, same-origin absolute URLs, and
 * bare relative segments (e.g. "about") are all allowed.
 */
export function resolveInternalUrl(raw: string, origin: string): URL | null {
  if (!raw) return null;
  let resolved: URL;
  try {
    resolved = new URL(raw, origin);
  } catch {
    return null;
  }
  return resolved.origin === origin ? resolved : null;
}

const navigateToPageTool: WebMCP.ModelContextTool = {
  name: "navigate_to_page",
  title: "Navigate to page",
  description:
    'Navigates the browser to another page of this site. Accepts a site-relative path such as "/about" or an absolute URL on this site.',
  inputSchema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description:
          'Site-relative path (e.g. "/about") or an absolute URL on this site.',
      },
    },
    required: ["path"],
  },
  execute: async (input) => {
    const raw = typeof input.path === "string" ? input.path.trim() : "";
    const resolved = resolveInternalUrl(raw, window.location.origin);
    if (!resolved) {
      return errorResult(
        `"${raw}" is not a path or URL on this site. Provide a site-relative path like "/about" or an absolute URL on this site.`
      );
    }
    const target = resolved.pathname + resolved.search + resolved.hash;
    window.location.assign(target);
    return textResult(`Navigating to ${target}`);
  },
};

const toggleThemeTool: WebMCP.ModelContextTool = {
  name: "toggle_theme",
  title: "Toggle color theme",
  description:
    "Switches the site color theme between dark and light. Returns the newly applied theme.",
  inputSchema: { type: "object", properties: {} },
  execute: async () => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    window.dispatchEvent(new CustomEvent(TOGGLE_THEME_EVENT));
    return textResult(JSON.stringify({ theme: nextTheme }));
  },
};

const listPostsTool: WebMCP.ModelContextTool = {
  name: "list_posts",
  title: "List blog posts",
  description:
    "Returns every blog post as JSON: title, slug, date, description, and tags. Sorted by date, newest first.",
  inputSchema: { type: "object", properties: {} },
  annotations: { readOnlyHint: true },
  execute: async () => {
    const posts = listPosts().map(({ title, slug, date, description, tags }) => ({
      title,
      slug,
      date,
      description,
      tags,
    }));
    return textResult(JSON.stringify(posts, null, 2));
  },
};

const getPostTool: WebMCP.ModelContextTool = {
  name: "get_post",
  title: "Get blog post",
  description:
    "Returns a single blog post by slug as JSON, including its frontmatter fields and raw markdown body.",
  inputSchema: {
    type: "object",
    properties: {
      slug: {
        type: "string",
        description: "The post slug, as returned by list_posts.",
      },
    },
    required: ["slug"],
  },
  annotations: { readOnlyHint: true },
  execute: async (input) => {
    const slug = typeof input.slug === "string" ? input.slug.trim() : "";
    if (!slug) {
      return errorResult("Missing slug");
    }
    const post = getPost(slug);
    if (!post) {
      return errorResult(`Post not found: ${slug}`);
    }
    return textResult(
      JSON.stringify(
        {
          title: post.title,
          slug: post.slug,
          date: post.date,
          description: post.description,
          tags: post.tags,
          markdown: post.body,
        },
        null,
        2
      )
    );
  },
};

export const webMcpTools: WebMCP.ModelContextTool[] = [
  getProfileTool,
  listPagesTool,
  listPostsTool,
  getPostTool,
  getPageContentTool,
  navigateToPageTool,
  toggleThemeTool,
];
