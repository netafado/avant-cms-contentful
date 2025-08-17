import { client } from "@/lib/contentful";
import { Section as SectionType } from "@/lib/contentful/__generated/sdk";
import transFormToSections from "@/utils/transformToSectionComponents";
import { ThemeProvider } from "@/providers/theme";
import Providers from "@/components/Providers";
import MainLayout from "@/app/mainLayout";

const getLandingPageData = async (url: string) => {
  try {
    const data = await client.pageLanding({
      where: {
        url,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};

interface PageContentProps {
  url?: string;
}

export default async function PageContent({ url = "/" }: PageContentProps) {
  const homePageData = await getLandingPageData(url);
  const { sectionsCollection } =
    homePageData.pageLandingCollection?.items[0] || {};
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
