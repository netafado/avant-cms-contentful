import { getLandingPage } from "@/lib/contentful";
import { Section as SectionType } from "@/lib/contentful/__generated/sdk";
import transFormToSections from "@/utils/transformToSectionComponents";
import { ThemeProvider } from "@/providers/theme";
import Providers from "@/components/Providers";
import MainLayout from "@/app/mainLayout";

interface PageContentProps {
  url?: string;
}

export default async function PageContent({ url = "/" }: PageContentProps) {
  // `getLandingPage` is React-`cache()`-wrapped, so this shares one
  // Contentful round-trip with `generateMetadata` in the same request.
  const homePageData = await getLandingPage(url);
  const { sectionsCollection } = homePageData || {};
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
