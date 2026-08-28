import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";

/**
 * Next.js metadata route. Generates `/robots.txt` at build/request time.
 *
 * We allow all major AI crawlers explicitly. Blocking GPTBot, OAI-SearchBot,
 * ClaudeBot, PerplexityBot, or Google-Extended would make the site invisible
 * to ChatGPT Search, Perplexity, Claude, and Google AI Overviews — the
 * 2026 LLM-search surfaces. Each bot is also given its own rule so the
 * intent is auditable.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/"],
  };

  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Amazonbot",
    "Cohere-AI",
    "CCBot",
    "Googlebot",
    "Bingbot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "YandexBot",
  ];

  return {
    rules: [
      allowAll,
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
