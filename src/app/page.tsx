import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { buildBreadcrumbList, buildProfilePage } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/");
}

export default async function Page() {
  return (
    <>
      <PageContent url="/" />
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", url: "/" },
        ])}
      />
      <JsonLd
        data={buildProfilePage({
          path: "/",
          name: "Isaias F. Santos — Full-Stack Developer",
          description:
            "Portfolio of Isaias F. Santos, a full-stack developer in São Paulo specialising in Next.js, Contentful, React, and Node.js.",
        })}
      />
    </>
  );
}
