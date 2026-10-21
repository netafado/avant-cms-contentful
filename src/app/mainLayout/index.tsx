import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { FC } from "react";
import { getTranslations } from "next-intl/server";

import { SectionProps } from "@/components/Section/types";

type MainLayoutProps = {
  url: string;
  sections: SectionProps[];
};

const MainLayout: FC<MainLayoutProps> = async ({ sections, url }) => {
  const t = await getTranslations("Layout");

  return (
    <div className="font-sans w-full">
      <main>
        <Navigation currentPath={url} />
        <div id="content" className="scroll-mt-4">
          {sections.map((section, index) => {
            if (!section) return null;
            return (
              <Section
                key={`section-${index}_${section.title || "default"}`}
                {...section}
                title={section.title || t("sectionTitleFallback")}
                description={section.description}
                components={section.components || []}
              />
            );
          })}
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 border-t border-white/10 bg-black px-6 py-8 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
        <a
          className="transition-colors duration-300 hover:text-white"
          href="https://medium.com/@isaias.fran"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footerMedium")}
        </a>
        <a
          className="transition-colors duration-300 hover:text-white"
          href="https://github.com/netafado/avant-cms-contentful"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footerTech")}
        </a>
      </footer>
    </div>
  );
};

export default MainLayout;
