import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildBreadcrumbList, buildProfilePage } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";

type Params = { url: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { url } = await params;
  return buildPageMetadata(`/${url}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { url } = await params;
  const fullPath = `/${url}`;
  return (
    <>
      <PageContent url={fullPath} />
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", url: "/" },
          { name: url, url: fullPath },
        ])}
      />
      <JsonLd
        data={buildProfilePage({
          path: fullPath,
          name: `${url} | Isaias F. Santos`,
          description: "Page on the portfolio of Isaias F. Santos.",
        })}
      />
    </>
  );
}
