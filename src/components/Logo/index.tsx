import clsx from "clsx";
import Image from "next/image";
import { ElementType, FC } from "react";

type LogoProps = {
  /**
   * Full name, used as the mark's alt text so the frame element (an h1 on
   * the home hero) still carries the site name for assistive tech and SEO.
   */
  name: string;
  /** Small line rendered beneath the mark. */
  tagline?: string;
  /** Element used for the frame — h1 on the home hero, div elsewhere. */
  as?: ElementType;
  className?: string;
};

const Logo: FC<LogoProps> = ({
  name,
  tagline = "Software Engineer",
  as: Frame = "div",
  className,
}) => {
  return (
    <div
      className={clsx(
        "mt-3 flex w-full flex-col items-center text-white select-none",
        className,
      )}
    >
      <Frame>
        <Image
          src="/images/i-santos-logo.png"
          alt={name}
          width={1279}
          height={271}
          priority
          sizes="(min-width: 768px) 154px, 128px"
          className="h-auto w-32 md:w-[154px]"
        />
      </Frame>
      {tagline && (
        <span className="mt-2 block font-mono text-[9px] leading-none tracking-[0.55em] indent-[0.55em] text-white/70 uppercase">
          {tagline}
        </span>
      )}
    </div>
  );
};

export default Logo;
