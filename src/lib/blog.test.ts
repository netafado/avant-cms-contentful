import {
  listPosts,
  getPost,
  parseFrontmatter,
  type Post,
} from "./blog";

describe("parseFrontmatter", () => {
  it("parses scalar key/value lines", () => {
    const raw = `---
title: Hello
slug: hello-world
date: 2026-09-12
description: A short description.
---

# Body
`;
    const { frontmatter, body } = parseFrontmatter(raw);
    expect(frontmatter).toEqual({
      title: "Hello",
      slug: "hello-world",
      date: "2026-09-12",
      description: "A short description.",
      tags: [],
    });
    expect(body.trim()).toBe("# Body");
  });

  it("parses comma-separated arrays into trimmed string arrays", () => {
    const raw = `---
title: Tagged
slug: tagged
date: 2026-08-01
description: Has tags.
tags: [ai, agents, webmcp]
---

body
`;
    const { frontmatter } = parseFrontmatter(raw);
    expect(frontmatter.tags).toEqual(["ai", "agents", "webmcp"]);
  });
});

describe("listPosts", () => {
  it("returns posts sorted by date descending", () => {
    const posts = listPosts();
    const dates = posts.map((post) => post.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
    expect(posts.length).toBe(3);
  });

  it("returns posts with all required fields populated", () => {
    for (const post of listPosts()) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.slug.length).toBeGreaterThan(0);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.description.length).toBeGreaterThan(0);
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.body.length).toBeGreaterThan(0);
    }
  });
});

describe("getPost", () => {
  it("returns the post matching the slug", () => {
    const expected = listPosts()[0];
    const post = getPost(expected.slug) as Post | undefined;
    expect(post).toBeDefined();
    expect(post?.slug).toBe(expected.slug);
    expect(post?.title).toBe(expected.title);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });
});