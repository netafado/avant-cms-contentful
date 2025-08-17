"use client";
import Image from "next/image";
import classNames from "clsx";
import Reveal from "../Reveal";
import { BannerProps } from "./types";
import { FC } from "react";
import { ThickArrowDownIcon } from "@radix-ui/react-icons";

const Banner: FC<BannerProps> = ({ name, image, achievements }) => {
  return (
    <>
      <div className="mx-auto my-auto px-4 w-full">
        <div className="items-center md:py-10 md:p-10 lg:p-20">
          <div className="relative mx-auto w-full text-center h-full">
            <Reveal
              delay={1000}
              animation="fade-in slide-in-top"
              className="prose absolute -bottom-4 left-1/2 z-20 w-full -translate-x-1/2"
            >
              <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-brand-400 to-brand-600 m-0 text-6xl drop-shadow-md md:text-8xl font-bold">
                {name}
              </h1>
            </Reveal>
            <Reveal
              animation="fade-in zoom-in"
              className="absolute left-1/2 h-72 w-72 -translate-x-1/2 md:bottom-0"
            >
              <div
                className={classNames(
                  "h-full w-full rounded-full md:animate-spin-slow",
                  "bg-gradient-to-tr from-orange-700 to-yellow-400 opacity-80"
                )}
              />
            </Reveal>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="relative mx-auto z-10"
              priority
            />
          </div>

          <div className="md:transition-all border-t border-lime-800 bg-gray-800 md:duration-1000 relative z-10 mx-auto max-w-4xl p-10 text-center md:p-3 ld:grid-cols-4 prose prose-invert grid grid-cols-2 lg:grid-cols-4 bg-gradient-omega-900 shadow-lg divide-gray-600/30 lg:divide-x">
            {achievements?.items?.map((achievement, index) => (
              <Reveal
                key={index}
                animation="fade-in slide-in-bottom"
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-3xl font-bold text-brand-500">
                  {achievement.number}
                </span>
                <span className="text-sm text-gray-500">
                  {achievement.text}
                </span>
              </Reveal>
            ))}
          </div>
          <button className="mt-2 border-b border-lime-500 mx-auto px-4 py-2 text-gray-400 hover:text-brand-400 transition-colors duration-300 flex items-center justify-center gap-2">
            <ThickArrowDownIcon />
            Download CV
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
