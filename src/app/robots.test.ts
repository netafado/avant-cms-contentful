import robots from "./robots";
import { siteConfig } from "@/lib/seo/site-config";

describe("robots metadata route", () => {
  it("allows the wildcard user agent and disallows /api/", () => {
    const result = robots();
    const wildcard = result.rules?.find(
      (rule) => (rule as { userAgent?: string | string[] }).userAgent === "*",
    ) as { allow?: string; disallow?: string[] } | undefined;
    expect(wildcard).toBeDefined();
    expect(wildcard?.allow).toBe("/");
    expect(wildcard?.disallow).toEqual(expect.arrayContaining(["/api/"]));
  });

  it.each([
    "GPTBot",
    "OAI-SearchBot",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "Googlebot",
    "Bingbot",
  ])("explicitly allows %s", (userAgent) => {
    const result = robots();
    const rule = result.rules?.find(
      (r) => (r as { userAgent?: string | string[] }).userAgent === userAgent,
    );
    expect(rule).toBeDefined();
    expect(
      (rule as { allow?: string | string[] }).allow,
    ).toBeTruthy();
  });

  it("exposes a sitemap URL and a host header", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${siteConfig.siteUrl}/sitemap.xml`);
    expect(result.host).toBe(siteConfig.siteUrl);
  });
});
