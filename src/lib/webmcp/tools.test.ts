import {
  webMcpTools,
  parseSitemap,
  resolveInternalUrl,
  ToolResult,
} from "./tools";

function getTool(name: string) {
  const tool = webMcpTools.find((candidate) => candidate.name === name);
  if (!tool) throw new Error(`Tool "${name}" is not registered`);
  return tool;
}

async function runTool(
  name: string,
  input: Record<string, unknown> = {}
): Promise<ToolResult> {
  return (await getTool(name).execute(input, {
    signal: new AbortController().signal,
  })) as ToolResult;
}

function resultText(result: ToolResult): string {
  return result.content[0].text;
}

describe("webMcpTools", () => {
  it("exposes five uniquely named, well-formed tools", () => {
    const names = webMcpTools.map((tool) => tool.name);
    expect(names).toEqual([
      "get_profile",
      "list_pages",
      "list_posts",
      "get_post",
      "get_page_content",
      "navigate_to_page",
      "toggle_theme",
    ]);
    for (const tool of webMcpTools) {
      expect(tool.name).toMatch(/^[A-Za-z0-9_-]{1,128}$/);
      expect(tool.description.length).toBeGreaterThan(10);
      expect(typeof tool.execute).toBe("function");
    }
  });
});

describe("get_profile", () => {
  it("returns profile JSON built from the SEO data", async () => {
    const result = await runTool("get_profile");
    expect(result.isError).toBeFalsy();

    const profile = JSON.parse(resultText(result));
    expect(profile.name).toBe("Isaias Santos");
    expect(profile.jobTitle).toBe("Full Stack Developer");
    expect(Array.isArray(profile.skills)).toBe(true);
    expect(profile.skills).toContain("Next.js");
    expect(profile.socialLinks.github).toBe("https://github.com/netafado");
  });
});

describe("list_pages", () => {
  const sampleSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>http://localhost:3000/</loc>
        <lastmod>2026-09-01</lastmod>
      </url>
      <url>
        <loc>http://localhost:3000/about</loc>
      </url>
    </urlset>`;

  it("parses sitemap entries, preserving optional lastmod", () => {
    expect(parseSitemap(sampleSitemap)).toEqual([
      { loc: "http://localhost:3000/", lastmod: "2026-09-01" },
      { loc: "http://localhost:3000/about" },
    ]);
  });

  it("fetches and serializes /sitemap.xml", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () => Promise.resolve(sampleSitemap),
    });
    const originalFetch = global.fetch;
    global.fetch = fetchMock as unknown as typeof fetch;

    try {
      const result = await runTool("list_pages");
      expect(result.isError).toBeFalsy();
      expect(fetchMock).toHaveBeenCalledWith("http://localhost/sitemap.xml");
      expect(JSON.parse(resultText(result))).toHaveLength(2);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it("returns an error result when the sitemap is unreachable", async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.resolve(""),
    }) as unknown as typeof fetch;

    try {
      const result = await runTool("list_pages");
      expect(result.isError).toBe(true);
      expect(resultText(result)).toContain("500");
    } finally {
      global.fetch = originalFetch;
    }
  });
});

describe("get_page_content", () => {
  it("returns the current document title, URL, and text", async () => {
    document.title = "About | Isaias Santos";
    document.body.innerHTML = "<h1>About</h1><p>I build web apps.</p>";

    const result = await runTool("get_page_content");
    expect(result.isError).toBeFalsy();

    const page = JSON.parse(resultText(result));
    expect(page.title).toBe("About | Isaias Santos");
    expect(page.url).toBe("http://localhost/");
    expect(page.text).toContain("About");
    expect(page.text).toContain("I build web apps.");
    expect(page.truncated).toBe(false);
  });
});

describe("navigate_to_page", () => {
  const ORIGIN = "http://localhost:3000";

  it("allows paths and URLs that resolve to this site", () => {
    expect(resolveInternalUrl("/about", ORIGIN)?.pathname).toBe("/about");
    expect(
      resolveInternalUrl("http://localhost:3000/blog?q=1#top", ORIGIN)
    ).toMatchObject({ pathname: "/blog", search: "?q=1", hash: "#top" });
    // Bare relative segments resolve against the current directory on-site.
    expect(resolveInternalUrl("about", ORIGIN)?.pathname).toBe("/about");
  });

  it.each([
    "https://evil.com/steal",
    "//evil.com",
    "javascript:alert(1)",
    "",
  ])("refuses to resolve %p", (raw) => {
    expect(resolveInternalUrl(raw, ORIGIN)).toBeNull();
  });

  it("returns an error result for paths off this site", async () => {
    const result = await runTool("navigate_to_page", {
      path: "https://evil.com/steal",
    });
    expect(result.isError).toBe(true);
    expect(resultText(result)).toContain("evil.com");
  });

  it("returns an error result for a missing path", async () => {
    const result = await runTool("navigate_to_page", {});
    expect(result.isError).toBe(true);
  });

  it("navigates for a valid on-site path", async () => {
    // jsdom makes Location unforgeable so assign cannot be spied; assert the
    // success result, which is produced right before window.location.assign.
    const result = await runTool("navigate_to_page", { path: "/about" });
    expect(result.isError).toBeFalsy();
    expect(resultText(result)).toContain("/about");
  });
});

describe("toggle_theme", () => {
  it("dispatches the theme event and reports the flipped theme", async () => {
    const dispatchSpy = jest.spyOn(window, "dispatchEvent");
    document.documentElement.classList.add("dark");

    const result = await runTool("toggle_theme");
    expect(result.isError).toBeFalsy();
    expect(JSON.parse(resultText(result))).toEqual({ theme: "light" });
    expect(dispatchSpy).toHaveBeenCalled();

    document.documentElement.classList.remove("dark");
    const lightResult = await runTool("toggle_theme");
    expect(JSON.parse(resultText(lightResult))).toEqual({ theme: "dark" });

    dispatchSpy.mockRestore();
  });
});

describe("list_posts", () => {
  it("returns every post as JSON with frontmatter fields and no body", async () => {
    const result = await runTool("list_posts");
    expect(result.isError).toBeFalsy();

    const posts = JSON.parse(resultText(result));
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    const slugs = posts.map((post: { slug: string }) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const post of posts) {
      expect(typeof post.title).toBe("string");
      expect(typeof post.slug).toBe("string");
      expect(typeof post.date).toBe("string");
      expect(typeof post.description).toBe("string");
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post).not.toHaveProperty("body");
    }

    const dates = posts.map((post: { date: string }) => post.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});

describe("get_post", () => {
  it("returns the post's frontmatter and raw markdown body", async () => {
    const listResult = await runTool("list_posts");
    const posts = JSON.parse(resultText(listResult));
    const [first] = posts;

    const result = await runTool("get_post", { slug: first.slug });
    expect(result.isError).toBeFalsy();

    const post = JSON.parse(resultText(result));
    expect(post.title).toBe(first.title);
    expect(post.slug).toBe(first.slug);
    expect(post.date).toBe(first.date);
    expect(post.description).toBe(first.description);
    expect(post.tags).toEqual(first.tags);
    expect(typeof post.markdown).toBe("string");
    expect(post.markdown.length).toBeGreaterThan(0);
    expect(post.markdown).toContain("# ");
  });

  it("returns an error result for an unknown slug", async () => {
    const result = await runTool("get_post", { slug: "does-not-exist" });
    expect(result.isError).toBe(true);
    expect(resultText(result)).toContain("does-not-exist");
  });
});
