"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type CSSProperties, FC } from "react";
import { useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import SunHero from "../SunHero";
import { BannerProps } from "./types";

const ORBIT_TAGLINE =
  "Solution Architect | Distributed Systems & AI-Enabled Platforms";

const Banner: FC<BannerProps> = ({ name, achievements, cv }) => {
  const t = useTranslations("Banner");

  return (
    <>
      <SunHero
        masthead={<Logo name={name} as="h1" />}
        poster={{
          src: "/images/sun-hero.jpg",
          alt: `The sun rendered as a burning sphere of plasma behind the name ${name}`,
        }}
      >
        <div
          aria-label="Solution architect"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-white"
        >
          <div className="flex flex-col items-center [text-shadow:0_1px_12px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.6)]">
            <h2 className="font-mono text-bold uppercase whitespace-nowrap sm:tracking-[0.4em] md:tracking-[0.45em]">
              <span className="rounded-panel bg-white px-2 pl-3 text-center text-black">
                Solution
              </span>
            </h2>
            <span className="text-light uppercase font-mono text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.85] tracking-[-0.04em] whitespace-nowrap">
              architect
            </span>
          </div>
          <div
            aria-label={ORBIT_TAGLINE}
            role="img"
            style={
              // The sun disc is 14vh in radius (shader SUN_RADIUS), so 22vh
              // keeps the ring hugging its corona instead of the screen edge.
              { "--orbit-radius": "min(22vh, 22vw)" } as CSSProperties
            }
            className="mt-3 flex max-w-[92vw] justify-center md:absolute md:top-1/2 md:left-1/2 md:mt-0 md:block md:size-[calc(var(--orbit-radius)*2)] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <p className="hidden max-w-[44ch] [text-shadow:none] rounded-2xl border border-white/40 bg-black/40 px-4 py-2 text-center font-mono text-[11px] leading-relaxed tracking-[0.2em] text-white/90 max-md:block">
              {ORBIT_TAGLINE}
            </p>
            {/* Continuous ring of text on a circular textPath. The whole svg
                scales with the orbit box, so one viewBox tuning fits every
                breakpoint; the trailing " - " closes the seam where the phrase
                wraps back to its start. Tuned to Geist Mono's measured ~0.59em
                advance: 65 chars x (0.59*30px + 2.6 tracking) ~= 1319, the
                2*pi*210 circumference of the 440 viewBox. Keep the total at or
                under the path length — textPath silently clips the tail. */}
            <svg
              aria-hidden
              viewBox="0 0 440 440"
              className="hidden overflow-visible md:block md:size-full md:animate-orbit-spin"
            >
              <defs>
                <path
                  id="orbit-ring"
                  fill="none"
                  d="M 430 220 A 210 210 0 1 1 10 220 A 210 210 0 1 1 430 220"
                />
              </defs>
              <text
                className="fill-white font-mono"
                fontSize="30"
                letterSpacing="2.6"
              >
                <textPath href="#orbit-ring">
                  {`${ORBIT_TAGLINE} - `}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </SunHero>
      <div>
        {/* Ruled row of facts anchoring the opening: mono numerals over the
            flat ground, hairline rules. */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center text-white">
          {achievements?.items?.length ? (
            <div className="grid  w-full max-w-3xl  gap-y-8 border-y border-hairline py-4 lg:grid-cols-3 lg:divide-x lg:divide-hairline">
              {achievements.items.map((achievement, index) => (
                <div
                  key={`achievement-${index}`}
                  className="flex flex-col items-center gap-2 px-4"
                >
                  <span className="font-mono text-2xl leading-none tracking-tight text-bright tabular-nums md:text-3xl">
                    {achievement.number}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-meta uppercase md:text-[11px]">
                    {achievement.text}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center text-white">
          {cv?.src && (
            <Link
              href={cv.src}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 flex items-center rounded-full bg-bright px-10 py-3.5 font-sans text-xs tracking-[0.3em] text-inverse-ink uppercase transition-colors hover:bg-white"
            >
              <span className="block indent-[0.3em]">{t("downloadCv")}</span>
            </Link>
          )}
        </div>
        <a
          href="#content"
          aria-label="Scroll to content"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] tracking-[0.35em] text-white/60 uppercase transition-colors hover:text-white"
        >
          Scroll
          <ChevronDownIcon className="animate-scroll-cue h-4 w-4" />
        </a>
      </div>
    </>
  );
};

export default Banner;
