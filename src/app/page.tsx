import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import JsonLd from "@/components/JsonLd";
import { getPageData } from "@/lib/pages";
import { buildMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("/");
  return buildMetadata(page?.seoFields, "/");
}

export default async function Page() {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <PageContent url="/" />
    </>
  );
}
