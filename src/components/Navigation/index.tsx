"use client";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  BookmarkIcon,
  HomeIcon,
  SunIcon,
  MoonIcon,
  FileTextIcon,
  GlobeIcon,
  LayersIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import NextLink from "next/link";
import { useTheme } from "@/providers/theme";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter, routing } from "@/i18n/routing";
import { useTransition } from "react";
import BottomNav from "@/components/BottomNav";

const links = [
  {
    href: "https://medium.com/@isaias.fran",
    label: "Medium articles",
    icon: <BookmarkIcon className="h-4 w-4" />,
  },
  {
    href: "https://www.linkedin.com/in/isaias-francisco-21097437",
    label: "LinkedIn profile",
    icon: <LinkedInLogoIcon className="h-4 w-4" />,
  },
  {
    href: "https://github.com/netafado",
    label: "GitHub profile",
    icon: <GitHubLogoIcon className="h-4 w-4" />,
  },
];

const CLASSES = {
  // difference blend keeps the white type legible over both the black hero
  // and light sections without any bar background.
  wrapper: "fixed inset-x-0 top-0 z-50 text-white mix-blend-difference",
  bar: "mx-auto flex h-16 w-full items-center justify-between gap-4 px-6 md:h-20 md:px-10",
  group: "flex items-center gap-0.5 md:gap-1",
  siteLink:
    "relative flex items-center gap-2 p-2 text-[11px] tracking-[0.22em] text-white/60 uppercase transition-colors duration-300 hover:text-white",
  active:
    "text-white after:absolute after:inset-x-2 after:bottom-0.5 after:h-px after:bg-white after:content-['']",
  iconLink:
    "flex items-center p-2 text-white/60 transition-colors duration-300 hover:text-white",
  divider: "mx-2 h-4 w-px bg-white/25",
};

type NavigationProps = {
  /** Path used for active-link highlight; defaults to the current pathname. */
  currentPath?: string;
  /**
   * The blog lives outside the locale segment and has no translation, so its
   * layout hides the language switch rather than linking to a missing route.
   */
  showLanguageSwitch?: boolean;
};

const Navigation = ({
  currentPath,
  showLanguageSwitch = true,
}: NavigationProps) => {
  const { toggleTheme, theme } = useTheme();
  const t = useTranslations("Navigation");
  const tLanguage = useTranslations("Language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // /blog is served unprefixed outside the [locale] segment, so it needs the
  // plain next/link; the locale-aware Link would produce a missing /en/blog.
  const siteLinks = [
    { href: "/", label: t("home"), icon: <HomeIcon className="h-4 w-4" />, plain: false },
    {
      href: "/projects",
      label: t("projects"),
      icon: <LayersIcon className="h-4 w-4" />,
      plain: false,
    },
    {
      href: "/blog",
      label: t("blog"),
      icon: <ReaderIcon className="h-4 w-4" />,
      plain: true,
    },
    {
      href: "/resume",
      label: t("resume"),
      icon: <FileTextIcon className="h-4 w-4" />,
      plain: false,
    },
  ];

  const activePath = currentPath ?? pathname;

  const switchTo =
    routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const handleLanguageSwitch = () => {
    startTransition(() => {
      router.replace(pathname, { locale: switchTo });
    });
  };

  return (
    <>
      <nav className={CLASSES.wrapper} aria-label="Main navigation">
        <div className={CLASSES.bar}>
          {/* On mobile the toggles pin to opposite corners: language on the
              left, theme on the right, so the top bar stays clean now that
              the socials live in the bottom dock. */}
          <div className="flex items-center md:hidden">
            {showLanguageSwitch && (
              <button
                onClick={handleLanguageSwitch}
                disabled={isPending}
                aria-label={t("switchLanguage")}
                className={clsx(
                  CLASSES.iconLink,
                  isPending && "cursor-wait opacity-50"
                )}
              >
                <GlobeIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          {/* Site links live in the mobile bottom dock; the top bar keeps
              them for desktop only. */}
          <ul role="menubar" className={clsx(CLASSES.group, "hidden md:flex")}>
            {siteLinks.map((link) => {
              const className = clsx(CLASSES.siteLink, {
                [CLASSES.active]:
                  activePath === link.href || link.href.endsWith(activePath),
              });
              // Icons are the mobile-only affordance; desktop shows text only.
              const children = (
                <>
                  <span className="hidden md:inline">{link.label}</span>
                  <span className="md:hidden">{link.icon}</span>
                </>
              );
              return link.plain ? (
                <NextLink
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  role="menuitem"
                  className={className}
                >
                  {children}
                </NextLink>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  role="menuitem"
                  className={className}
                >
                  {children}
                </Link>
              );
            })}
          </ul>

          <div className={CLASSES.group}>
            {/* Socials are docked in the BottomNav on mobile; the top bar
                keeps them for desktop only. */}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                aria-label={link.label}
                className={clsx(CLASSES.iconLink, "hidden md:flex")}
                rel="noopener noreferrer"
              >
                {link.icon}
              </Link>
            ))}
            <div aria-hidden className={clsx(CLASSES.divider, "hidden md:block")} />
            {showLanguageSwitch && (
              <button
                onClick={handleLanguageSwitch}
                disabled={isPending}
                aria-label={t("switchLanguage")}
                className={clsx(
                  CLASSES.siteLink,
                  "hidden md:flex",
                  isPending && "cursor-wait opacity-50"
                )}
              >
                {tLanguage(switchTo)}
              </button>
            )}
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              className={clsx(CLASSES.iconLink, "p-2")}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>
      <BottomNav
        links={siteLinks}
        activePath={activePath}
        socials={links.map((link) => ({ ...link, plain: true }))}
      />
    </>
  );
};

export default Navigation;
