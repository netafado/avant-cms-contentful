import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import SiteFooter from "@/components/SiteFooter";
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
      <SiteFooter />
    </div>
  );
};

export default MainLayout;
