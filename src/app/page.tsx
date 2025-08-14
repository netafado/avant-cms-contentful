import Image from "next/image";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { client } from "@/lib/contentful";
import { Section as SectionType } from "@/lib/contentful/__generated/sdk";
import transFormToSections from "@/utils/transformToSectionComponents";
import { unstable_noStore as noStore } from "next/cache";

const getLandingPageData = async () => {
  // Opt out of caching for this function
  noStore();

  try {
    const data = await client.pageLanding();
    return data;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
