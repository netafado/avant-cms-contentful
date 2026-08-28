import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { FC } from "react";

import { SectionProps } from "@/components/Section/types";
import { siteConfig } from "@/lib/seo/site-config";

type MainLayoutProps = {
  url: string;
  sections: SectionProps[];
};

const MainLayout: FC<MainLayoutProps> = ({ sections, url }) => {
  const year = new Date().getFullYear();
  return (
    <div className="font-sans w-full">
      {/* Skip link must be the first focusable element on the page so
          keyboard users can jump past the navigation to the main content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-400 focus:text-black focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <header className="contents">
        <Navigation currentPath={url} />
      </header>

      <main id="main" aria-label="Main content" className="font-sans w-full">
        {sections.map((section, index) => {
          if (!section) return null;
          return (
            <Section
              key={`section-${index}_${section.title || "default"}`}
              {...section}
              title={section.title || "Section Title"}
              description={section.description}
              components={section.components || []}
            />
          );
        })}
      </main>

      <footer className="mt-16 border-t border-zinc-900 px-4 py-8 text-sm text-zinc-400">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.siteName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li>
              <a
                className="hover:text-amber-300"
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="hover:text-amber-300"
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="hover:text-amber-300"
                href={siteConfig.socials.medium}
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>
            </li>
            <li>
              <a className="hover:text-amber-300" href={siteConfig.socials.email}>
                Email
              </a>
            </li>
            <li>
              <a
                className="hover:text-amber-300"
                href="/llms.txt"
                rel="alternate"
                type="text/markdown"
              >
                llms.txt
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
