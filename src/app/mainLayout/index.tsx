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
    <div className="font-sans w-full pr-12">
      <main>
        <Navigation currentPath={url} />
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
      <footer className="row-start-3 mt-4 flex gap-[24px] flex-wrap items-center justify-center p-5 text-sm text-gray-500">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
