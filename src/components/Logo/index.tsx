import clsx from "clsx";
import { ElementType, FC } from "react";

type LogoProps = {
  /**
   * Full name. The first word becomes the primary line; the remaining words
   * are compressed to initials + surname ("Isaias Francisco Santos" renders
   * "ISAIAS" over "F.SANTOS", matching the brand mark).
   */
  name: string;
  /** Small line rendered beneath the frame. */
  tagline?: string;
  /** Element used for the frame — h1 on the home hero, div elsewhere. */
  as?: ElementType;
  className?: string;
};

const compactSurname = (words: string[]) =>
  words
    .map((word, index) =>
      index === words.length - 1 ? word : `${word.charAt(0)}.`,
    )
    .join("");

const splitName = (name: string) => {
  const [main, ...rest] = name.trim().split(/\s+/);
  return {
    main: main || name,
    secondary: rest.length ? compactSurname(rest) : null,
  };
};

const Logo: FC<LogoProps> = ({
  name,
  tagline = "Software Engineer",
  as: Frame = "div",
  className,
}) => {
  const { main, secondary } = splitName(name);

  return (
    <div
      className={clsx(
        "flex w-full flex-col items-center text-white select-none",
        className,
      )}
    >
      <Frame className="border border-white/70 px-7 py-5 text-center md:px-3 md:py-4">
        {/* indent mirrors the tracking so both lines stay optically centered */}
        <span className="block font-sans text-3xl leading-none font-extrabold tracking-[0.3em] indent-[0.3em] uppercase md:text-2xl">
          {main}
        </span>
        {secondary && (
          <span className="mt-1 block font-sans text-[8px] leading-none font-light tracking-[0.5em] indent-[0.5em] uppercase md:mt-1">
            {secondary}
          </span>
        )}
      </Frame>
      {tagline && (
        <span className="mt-2 block font-mono text-[9px] tracking-[0.55em] indent-[0.55em] text-white/70 uppercase sticky top-2 ">
          {tagline}
        </span>
      )}
    </div>
  );
};

export default Logo;
