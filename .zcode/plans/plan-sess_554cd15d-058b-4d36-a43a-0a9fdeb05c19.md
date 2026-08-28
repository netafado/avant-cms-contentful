# Sun Hero Redesign + SEO/LLM Discovery Package

## Part 1 — Animated Sun Hero (CodePen-style layout)

**Effect**: full-viewport black hero with a procedural fiery sun (per your reference image: black bg → deep red → orange → white-hot core, turbulent surface, corona glow) plus the pen's analog-decay treatment: film grain, quantized VHS jitter (`floor(time*60)` UV shift), scanlines, vignette, subtle RGB bleed, and inertial pointer interaction (sun's turbulence/glow reacts to mouse position + velocity with drag/damping). Implemented as **raw WebGL, no new dependencies**.

### New files
- `src/components/SunHero/index.tsx` — client component: canvas, WebGL context, rAF loop, pointer tracking with velocity/damping; pauses off-screen (`react-intersection-observer`, already a dep) and on tab hide; caps devicePixelRatio; `prefers-reduced-motion` → renders one static frame; no-JS/no-WebGL → static poster `<Image>` fallback (the sun image).
- `src/components/SunHero/shaders.ts` — GLSL: fullscreen-quad vertex + fragment shader (fbm noise sun + corona + pointer warp + grain/jitter/scanline/vignette/RGB-shift post FX in one pass).
- `src/components/SunHero/types.ts` — hero props (name, role text, achievements, cv, poster image) matching existing Banner data.
- `public/images/sun-hero.jpg` — your reference sun image (copied/cropped from the screenshot; fallback: NASA SDO public-domain image with credit in README). Also generate `public/images/og-image.png` (1200×630) for social cards.
- `src/lib/seo/index.ts` — site URL helper (`NEXT_PUBLIC_SITE_URL`), metadata builder from Contentful `ComponentSeo`, JSON-LD builders.

### Modified files
- `src/components/Banner/index.tsx` — rewritten to render `SunHero` (same Contentful props: name, achievements, cv). Sun + corona replace the portrait photo and gradient circle. Overlay in Geist Mono (CodePen vibe): big `h1` name with subtle flicker, role line, achievements strip (mono, amber accents), CV button, scroll cue. Add a `solar` amber/orange palette + `flicker`/`scroll-cue` keyframes to `globals.css`; dark body bg → pure black.
- `src/components/Navigation/index.tsx` — fix the `clsx(CLASSES.mobile, CLASSES.mobile)` bug (desktop classes never applied); add aria-labels to icon-only links; ensure contrast over black hero.
- `src/components/componentsHandler/index.tsx` — remove stray `console.log`; delete empty `src/hooks/onScroll` stub.
- `src/app/mainLayout/index.tsx` — footer restyled to match (black, mono, subtle border).
- `src/components/Banner/Banner.test.tsx` — update to new markup.

## Part 2 — SEO + LLM Search Implementation

1. **Wire the already-fetched-but-unused Contentful SEO fields**: add `generateMetadata` to `app/page.tsx` and `app/[url]/page.tsx` using `src/lib/seo` → per-page title/description, canonical (`metadataBase` + `alternates.canonical`), robots (noindex/nofollow), OG/Twitter images from `shareImagesCollection`; fallback to static defaults. Title template `%s | Isaias Santos`.
2. **Root layout** (`app/layout.tsx`): full metadata — description, `metadataBase`, icons (favicon set already exists in `public/`), `manifest: /site.webmanifest`, default OG/Twitter card with `og-image.png`.
3. **JSON-LD**: `Person` schema (name, jobTitle, url, sameAs → GitHub/LinkedIn/Medium) + `WebSite`, injected server-side on the home page.
4. **`app/sitemap.ts`**: home + all Contentful `PageLanding` urls via a small new GraphQL query (`pageUrls.graphql`, then run `graphql-codegen:generate`).
5. **`app/robots.ts`**: allow all, explicitly allow AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, cohere-ai), point to sitemap.
6. **`public/llms.txt` + `public/llms-full.txt`**: markdown brief (who, skills, projects, links) per the llms.txt standard so LLM crawlers get a clean summary.
7. **Performance/a11y guardrails** (Core Web Vitals): text `h1` stays LCP (poster image lazy, canvas starts on idle), animation pauses off-screen/hidden tab, reduced-motion static frame.

Env: add `NEXT_PUBLIC_SITE_URL` to `.env` (README note to set it in Amplify).

## Verification
- `npm run lint`, `npm run test`, `npm run build`.
- Run dev server; browser-check hero animation (desktop + mobile widths), pointer interaction, reduced-motion fallback, nav contrast.
- Verify `/sitemap.xml`, `/robots.txt`, `/llms.txt` resolve; JSON-LD parses; per-page metadata reflects Contentful SEO fields.