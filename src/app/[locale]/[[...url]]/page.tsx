import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import JsonLd from "@/components/JsonLd";
import { getPageData } from "@/lib/pages";
import { buildMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";

// [[...url]] delivers the segments as an array (undefined for the locale root),
// while Contentful stores the homepage as "/" and sub-pages as bare slugs
// ("resume") — the same format the pre-i18n [url] route passed to PageContent.
function slugFromUrl(url?: string[]): string {
  return url?.length ? url.join("/") : "/";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; url?: string[] }>;
}): Promise<Metadata> {
  const { url } = await params;
  const slug = slugFromUrl(url);
  const page = await getPageData(slug);
  return buildMetadata(page?.seoFields, slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; url?: string[] }>;
}) {
  const { url } = await params;
  const slug = slugFromUrl(url);
  return (
    <>
      {slug === "/" && <JsonLd data={[personJsonLd(), websiteJsonLd()]} />}
      <PageContent url={slug} />
    </>
  );
}
