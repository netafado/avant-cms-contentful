"use client";
import Image from "next/image";
import classNames from "clsx";
import Reveal from "../Reveal";
import { BannerProps } from "./types";
import { FC } from "react";

const Banner: FC<BannerProps> = ({ name, image, achievements }) => {
  return (
    <>
      <div className="container relative mx-auto w-full text-center h-full">
        <Reveal
          delay={1000}
          animation="fade-in slide-in-top"
          className="prose absolute -bottom-4 left-1/2 z-20 w-full -translate-x-1/2"
        >
          <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-brand-400 to-brand-600 m-0 text-7xl drop-shadow-md md:text-8xl font-bold">
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

      <div className="max-w-2xl mt-2 flex flex-wrap justify-center gap-4 bg-gray-800 pb-3 mx-auto rounded-sm shadow-lg">
        <div className="h-px w-full bg-gradient-to-r from-brand-400 via-beta to-alpha hidden md:block" />
        {achievements?.map((achievement, index) => (
          <Reveal
            key={index}
            animation="fade-in slide-in-bottom"
            className="flex flex-1 flex-col items-center gap-2"
          >
            <span className="text-3xl font-bold text-brand-500">
              {achievement.number}
            </span>
            <span className="text-sm text-gray-500">{achievement.text}</span>
          </Reveal>
        ))}
      </div>
    </>
  );
};

export default Banner;
