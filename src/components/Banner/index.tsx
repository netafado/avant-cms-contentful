import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { BannerProps } from "./types";

/**
 * Server-rendered, full-viewport, dark-only hero in the spirit of the
 * CodePen reference (centered spectral subject + gradient display name
 * + monospace role caption) using the supplied image as the visual
 * reference (a glowing halo + marble bust + headphones).
 *
 * No `"use client"` directive: the halo animation, `prefers-reduced-motion`
 * guard, and scroll cue are pure CSS. This keeps the entire hero in the
 * initial HTML response, which is required for both Lighthouse and AI
 * search engines.
 */
const Banner: FC<BannerProps> = ({
  name,
  role = "Full-Stack Developer",
  subtitle,
  image,
  cv,
  achievements,
}) => {
  return (
    <section
      aria-labelledby="hero-name"
      className="relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-black px-4 pt-[14vh] pb-10 sm:pt-[18vh]"
    >
      {/* Halo: two stacked radial gradients with different blur radii to
          fake the CodePen's UnrealBloom look without a 3D library. The
          outer copy is wrapped in `mix-blend-screen` for a warmer edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 md:h-[44vmin] md:w-[44vmin]"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,180,40,0.85),rgba(255,90,10,0.45)_45%,rgba(120,30,5,0.15)_70%,transparent_78%)] blur-md motion-safe:animate-[halo-spin_22s_linear_infinite]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,220,150,0.9),rgba(255,140,30,0.55)_50%,transparent_75%)] opacity-90 blur-xl motion-safe:animate-[halo-spin_28s_linear_infinite_reverse] mix-blend-screen" />
      </div>

      {/* Portrait, sitting on top of the halo. */}
      <div className="relative z-10 mb-6 aspect-square w-[60vmin] max-w-[420px] sm:mb-8 sm:w-[44vmin]">
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          className="relative z-10 mx-auto h-full w-full object-contain"
          priority
          sizes="(min-width: 768px) 44vmin, 60vmin"
        />
      </div>

      {/* Name + role caption. The H1 carries the full visible text via
          aria-label so screen readers and AI retrievers both get the
          brand name, not just the gradient. */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h1
          id="hero-name"
          aria-label={name}
          className="bg-clip-text text-transparent bg-gradient-to-b from-orange-200 via-amber-300 to-orange-500 text-6xl font-bold leading-[0.95] tracking-tight drop-shadow-[0_0_28px_rgba(255,160,40,0.35)] sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {name}
        </h1>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.4em] text-zinc-300 sm:text-sm">
          {role}
        </p>
        {subtitle ? (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500 sm:text-xs">
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* CTAs: a single, demoted CV download. The full achievements bar
          would compete with the spectral hero, so it is moved below the
          fold inside this same section. */}
      <div className="relative z-10 mt-8 flex w-full flex-col items-center gap-6">
        {cv?.src ? (
          <Link
            href={cv.src}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-300 transition-colors duration-300 hover:text-amber-300 focus:text-amber-300 focus:outline-none"
          >
            <span aria-hidden="true">↓ </span>Download CV
          </Link>
        ) : null}

        {/* Achievements strip — only rendered when Contentful provided
            them. Centered, mono, low-contrast, sits at the bottom of the
            hero so it does not steal attention from the name. */}
        {achievements?.items?.length ? (
          <dl className="grid w-full max-w-3xl grid-cols-2 gap-3 border-t border-zinc-900 pt-4 text-center sm:grid-cols-4">
            {achievements.items.map((achievement, index) => (
              <div
                key={`${achievement.text}-${index}`}
                className="flex flex-col items-center gap-1"
              >
                <dt className="font-mono text-2xl font-bold text-amber-300 sm:text-3xl">
                  {achievement.number}
                </dt>
                <dd className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {achievement.text}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {/* Scroll cue, hidden for reduced-motion users. */}
      <div
        aria-hidden="true"
        className="motion-safe:animate-bounce-slow absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-zinc-500"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
