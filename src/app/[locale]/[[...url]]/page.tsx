import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import JsonLd from "@/components/JsonLd";
import { getPageData } from "@/lib/pages";
import { buildMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ url: string }>;
}): Promise<Metadata> {
  const { url } = await params;
  const page = await getPageData(url);
  return buildMetadata(page?.seoFields, url);
}

export default async function Page({
  params,
}: {
  params: Promise<{ url?: string[] }>;
}) {
  const { url } = await params;
  const urlString = url?.length ? `/${url.join("/")}` : "/";
  return (
    <>
      {urlString === "/" && <JsonLd data={[personJsonLd(), websiteJsonLd()]} />}
      <PageContent url={urlString} />
    </>
  );
}
