"use client";
import { ChevronDownIcon, ThickArrowDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC } from "react";
import SunHero from "../SunHero";
import { BannerProps } from "./types";

const Banner: FC<BannerProps> = ({ name, achievements, cv }) => {
  return (
    <SunHero
      tagline="Software Engineer"
      poster={{
        src: "/images/sun-hero.jpg",
        alt: `The sun rendered as a burning sphere of plasma behind the name ${name}`,
      }}
    >
      <h1 className="m-0 uppercase font-mono text-4xl font-extrabold text-white md:text-6xl">
        {name}
      </h1>
      {achievements?.items?.length ? (
        <div className="mt-10 grid w-full max-w-3xl grid-cols-2 divide-x divide-white/10 border-y border-white/10 font-mono [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] lg:grid-cols-4">
          {achievements.items.map((achievement, index) => (
            <div
              key={`achievement-${index}`}
              className="flex flex-1 flex-col items-center gap-1 px-4 py-4"
            >
              <span className="text-2xl font-bold text-solar-400 md:text-3xl">
                {achievement.number}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 md:text-xs">
                {achievement.text}
              </span>
            </div>
          ))}
        </div>
      ) : null}
      {cv?.src && (
        <Link
          href={cv.src}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center gap-2 border border-solar-500/60 px-6 py-2 font-mono text-sm uppercase tracking-widest text-solar-300 transition-colors duration-300 hover:bg-solar-500/10 hover:text-solar-200"
        >
          <ThickArrowDownIcon />
          Download CV
        </Link>
      )}
      <a
        href="#content"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.35em] text-gray-500 transition-colors hover:text-solar-300"
      >
        Scroll
        <ChevronDownIcon className="animate-scroll-cue h-4 w-4" />
      </a>
    </SunHero>
  );
};

export default Banner;
