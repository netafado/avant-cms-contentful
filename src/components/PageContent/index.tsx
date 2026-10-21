import { Section as SectionType } from "@/lib/contentful/__generated/sdk";
import transFormToSections from "@/utils/transformToSectionComponents";
import { getPageData } from "@/lib/pages";
import { ThemeProvider } from "@/providers/theme";
import Providers from "@/components/Providers";
import MainLayout from "@/app/mainLayout";

interface PageContentProps {
  url?: string;
}

export default async function PageContent({ url = "/" }: PageContentProps) {
  const page = await getPageData(url);
  if (!page) {
    throw new Error(`Landing page not found for url: ${url}`);
  }

  const { sectionsCollection } = page;
  const sections = transFormToSections(
    (sectionsCollection?.items as unknown as SectionType[]) || []
  );

  return (
    <ThemeProvider>
      <Providers>
        <MainLayout sections={sections} url={url} />
      </Providers>
    </ThemeProvider>
  );
}
