"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC } from "react";
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
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex max-w-[92vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-white px-4 md:px-8 py-3 md:py-4 bg-black/20 border border-white gradient border-white"
        >
          <h2 className="font-mono text-bold uppercase whitespace-nowrap sm:tracking-[0.4em] md:tracking-[0.45em]">
            <span className="bg-white text-black px-2 pl-3 text-center">
              AI
            </span>
          </h2>
          <span className="text-light uppercase font-mono text-[clamp(3rem,6vw,4rem)] leading-[0.85] tracking-[-0.04em] tracking-widest whitespace-nowrap">
            transformation
          </span>
          <ul
            aria-label="AI topics worked with"
            className="mt-3 md:mt-4 flex flex-wrap justify-center gap-1.5 md:gap-2"
          >
            {AI_TOPICS.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-white/60 bg-black/30 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/90 md:px-3 md:text-[10px]"
              >
                {topic}
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
