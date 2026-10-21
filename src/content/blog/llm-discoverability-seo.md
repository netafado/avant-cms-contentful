---
title: LLM Discoverability: SEO for the Age of AI
slug: llm-discoverability-seo
date: 2026-08-21
description: If ChatGPT, Claude, and Perplexity are the new search engines, the old SEO playbook needs updating. Here is what to add to your site and what to stop relying on.
tags: [seo, llm, llms-txt, ai, discoverability]
---

For twenty years, SEO meant Google. You optimized for crawler bots, structured data, page speed, backlinks, and the occasional algorithm update. Most of that still matters — Google is not going anywhere — but a meaningful share of discovery now happens in conversational UIs that do not behave like Google at all.

When someone asks ChatGPT "who is a good Next.js developer for a content-heavy marketing site?", the model is not running PageRank. It is recalling from a corpus it trained on, augmented by retrieval over a handful of indexed sources. Your job is to make sure you are in that corpus, and that the answer is unambiguous.

## The robots.txt question

`robots.txt` is no longer just about Googlebot. Every serious AI lab now publishes crawler user agents, and they are showing up in access logs:

- `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI)
- `ClaudeBot`, `Claude-Web`, `anthropic-ai` (Anthropic)
- `PerplexityBot`, `Perplexity-User`
- `Google-Extended` (Gemini training, separate from indexing)
- `Applebot-Extended`, `CCBot`, `cohere-ai`, `Bytespider`

The choice is yours: explicitly allow them, explicitly block them, or ignore the question and accept the default. Most public-content sites should allow them. If you do, your content becomes eligible to be cited in model outputs, which is the new form of "ranking".

## llms.txt: a proposed standard

`llms.txt` is a small, proposed convention: a markdown file at the site root that gives an LLM-friendly table of contents and short description of each page. It looks roughly like:

```markdown
# Isaias Santos
> Full Stack Developer based in Berlin.

## Pages
- [About](https://example.com/about): short bio, work history, and contact.
- [Projects](https://example.com/projects): a list of recent client work.
```

That is dramatically easier for a model to ingest than crawling every page and parsing HTML. Pair it with `llms-full.txt` containing the full text of each page if you want to be thorough.

## Structured data still earns its keep

JSON-LD is not dead. Models still pay attention to schema.org types — `Person`, `Organization`, `Article`, `FAQPage`, `Product`. A `Person` schema with `knowsAbout` fields tells the model what topics you are credible on. An `Article` schema with `datePublished` and `author` helps a model decide whether to cite you.

The meta principle: anything that lets a model answer the question "is this the right source?" without reading the page is worth doing.

## What to stop doing

A few tactics from the old playbook are now actively unhelpful:

- **Keyword-stuffed prose.** Models paraphrase, not copy. Dense keyword text reads as low-quality to both humans and models.
- **Hidden text meant only for crawlers.** Models can and do ignore CSS-hidden content as a quality signal.
- **Reliance on backlinks as the primary authority signal.** Backlinks still matter, but citation-worthiness in an LLM is closer to "does this page answer the question clearly" than "how many domains link here".

The shortest version of this advice: write pages that would make a knowledgeable friend want to cite you, then mark them up well enough that a machine can find them. That is the whole game now.