"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type CSSProperties, FC } from "react";
import { useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import SunHero from "../SunHero";
import { BannerProps } from "./types";

const AI_TOPICS = [
  "LLM APIs (OpenAI, Claude)",
  "RAG",
  "Prompt Engineering",
  "AI Agents (MCP/WebMCP)",
  "CopilotKit",
  "LLMO / AI-friendly SEO",
  "Structured Data (JSON-LD)",
  "AI Content Pipelines",
];

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
          aria-label="AI transformation"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-white"
        >
          <div className="flex flex-col items-center [text-shadow:0_1px_12px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.6)]">
            <h2 className="font-mono text-bold uppercase whitespace-nowrap sm:tracking-[0.4em] md:tracking-[0.45em]">
              <span className="bg-white text-black px-2 pl-3 text-center">
                AI
              </span>
            </h2>
            <span className="text-light uppercase font-mono text-[clamp(3rem,6vw,4rem)] leading-[0.85] tracking-[-0.04em] tracking-widest whitespace-nowrap">
              transformation
            </span>
          </div>
          <ul
            aria-label="AI topics worked with"
            style={
              { "--orbit-radius": "min(36vh, 36vw)" } as CSSProperties
            }
            className="mt-3 flex max-w-[92vw] flex-wrap justify-center gap-1.5 md:absolute md:top-1/2 md:left-1/2 md:mt-0 md:block md:size-[calc(var(--orbit-radius)*2)] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2"
          >
            {AI_TOPICS.map((topic, index) => (
              <li
                key={topic}
                style={{ "--orbit-i": index } as CSSProperties}
                className="md:absolute md:inset-0 md:[transform:rotate(calc(var(--orbit-i)*45deg))]"
              >
                <span className="md:absolute md:inset-0 md:flex md:items-start md:justify-center md:animate-orbit-spin">
                  <span className="inline-block rounded-full border border-white/60 bg-black/30 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/90 md:px-3 md:text-[10px] md:animate-orbit-counter">
                    {topic}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SunHero>
      <div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center text-white">
          {achievements?.items?.length ? (
            <div className="grid  w-full max-w-3xl  gap-y-8 border-y border-white/20 py-4 [text-shadow:0_1px_16px_rgba(0,0,0,0.75)] lg:grid-cols-3 lg:divide-x lg:divide-white/20">
              {achievements.items.map((achievement, index) => (
                <div
                  key={`achievement-${index}`}
                  className="flex flex-col items-center gap-2 px-4"
                >
                  <span className="font-display text-3xl leading-none text-white md:text-4xl">
                    {achievement.number}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] text-white/70 uppercase md:text-[11px]">
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
              className="mt-12 flex items-center border border-white/70 px-10 py-3.5 font-sans text-xs tracking-[0.3em] text-white uppercase transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
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
