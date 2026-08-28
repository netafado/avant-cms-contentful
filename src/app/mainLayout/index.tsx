import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Image from "next/image";
import { FC } from "react";

import { SectionProps } from "@/components/Section/types";

type MainLayoutProps = {
  url: string;
  sections: SectionProps[];
};

const MainLayout: FC<MainLayoutProps> = ({ sections, url }) => {
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
                title={section.title || "Section Title"}
                description={section.description}
                components={section.components || []}
              />
            );
          })}
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-[24px] border-t border-white/10 bg-black p-6 font-mono text-xs uppercase tracking-widest text-gray-500">
        <a
          className="flex items-center gap-2 transition-colors hover:text-solar-300"
          href="https://medium.com/@isaias.fran"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          medium Articles
        </a>
        <a
          className="flex items-center gap-2 transition-colors hover:text-solar-300"
          href="https://github.com/netafado/avant-cms-contentful"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Developed with Next.js, Contentful and AWS
        </a>
      </footer>
    </div>
  );
};

export default MainLayout;
