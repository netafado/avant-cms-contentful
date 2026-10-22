import { listPosts, getPost, type Post } from "./blog";
import { client } from "@/lib/contentful";
import type { BlogPostFieldsFragment } from "@/lib/contentful/__generated/sdk";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  // Request-scope memoization is a server concern; skip it so each test
  // starts from a clean slate.
  cache: (fn: unknown) => fn,
}));

jest.mock("@/lib/contentful", () => ({
  client: {
    blogPosts: jest.fn(),
    blogPost: jest.fn(),
  },
}));

const blogPostsMock = client.blogPosts as jest.Mock;
const blogPostMock = client.blogPost as jest.Mock;

function cmsEntry(overrides: Partial<BlogPostFieldsFragment> = {}) {
  return {
    __typename: "BlogPost",
    sys: { id: "entry-1", spaceId: "space" },
    title: "A post",
    slug: "a-post",
    date: "2026-09-08",
    description: "A description.",
    tags: ["ai", null, "web"],
    body: "## Body",
    seoFields: null,
    ...overrides,
  } as BlogPostFieldsFragment;
}

describe("listPosts", () => {
  it("returns CMS entries mapped onto the Post shape, sorted newest first", async () => {
    blogPostsMock.mockResolvedValue({
      blogPostCollection: {
        items: [
          cmsEntry({ sys: { id: "old", spaceId: "space" }, date: "2026-07-30", slug: "old-post" }),
          cmsEntry({ sys: { id: "new", spaceId: "space" }, date: "2026-09-08", slug: "new-post" }),
          null,
        ],
      },
    });

    const posts: Post[] = await listPosts();
    expect(posts.map((post) => post.slug)).toEqual(["new-post", "old-post"]);
    expect(posts[0]).toMatchObject({
      title: "A post",
      date: "2026-09-08",
      description: "A description.",
      tags: ["ai", "web"],
      body: "## Body",
    });
  });

  it("returns an empty list when the CMS is unreachable", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    blogPostsMock.mockRejectedValue(new Error("CMS down"));

    await expect(listPosts()).resolves.toEqual([]);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

describe("getPost", () => {
  it("filters by slug and returns the matching post", async () => {
    blogPostMock.mockResolvedValue({
      blogPostCollection: { items: [cmsEntry()] },
    });

    const post = await getPost("a-post");
    expect(blogPostMock).toHaveBeenCalledWith({ where: { slug: "a-post" } });
    expect(post).toMatchObject({ slug: "a-post", title: "A post" });
  });

  it("returns null for an unknown slug", async () => {
    blogPostMock.mockResolvedValue({ blogPostCollection: { items: [] } });

    await expect(getPost("does-not-exist")).resolves.toBeNull();
  });

  it("returns null when the CMS is unreachable", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    blogPostMock.mockRejectedValue(new Error("CMS down"));

    await expect(getPost("a-post")).resolves.toBeNull();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
