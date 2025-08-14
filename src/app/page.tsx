import Image from "next/image";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { SectionProps } from "@/components/Section/types";
import { client } from "@/lib/contentful";
import { Section as SectionType } from "@/lib/contentful/__generated/sdk";

const transFormToSections = (sections: SectionType[]): SectionProps[] => {
  return sections.map((section) => {
    const components = (section.componentsCollection?.items || [])
      .filter(
        (component): component is NonNullable<typeof component> =>
          component !== null
      )
      .map((component) => ({
        ...component,
        title: (component as any).title || "Component Title",
        description: (component as any).description || "Component Description",
      }));
    return {
      ...section,
      grid: section.grid || "1",
      title: section.title || "Section Title",
      description: section.description || "Section Description",
      components,
    };
  });
};

const getLandingPageData = async () => {
  try {
    const data = await client.pageLanding();
    return data;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};
const homePageData = await getLandingPageData();

export default function Home() {
  const { sectionsCollection } =
    homePageData.pageLandingCollection?.items[0] || {};
  const sections = transFormToSections(
    (sectionsCollection?.items as unknown as SectionType[]) || []
  );

  return (
    <div className="font-sans w-full">
      <main>
        <Navigation />
        <div className="mx-auto my-auto px-4">
          <div className="items-center py-10 md:p-10 lg:p-20">
            <Banner
              name="Isaias Santos"
              image={{
                src: "/isaias-c.png",
                width: 400,
                height: 400,
                alt: "",
              }}
              achievements={[
                { number: "60%", text: "Frontend" },
                { number: "40%", text: "Backend" },
                { number: "10+", text: "Years of Experience" },
                { number: "20+", text: "Projects" },
              ]}
            />
          </div>
        </div>

        {sections.map((section, index) => {
          if (!section) return null;
          return (
            <Section
              key={index}
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
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          Medium Articles
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
}
