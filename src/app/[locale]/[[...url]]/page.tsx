import PageContent from "@/components/PageContent";

export default async function Page({
  params,
}: {
  params: Promise<{ url?: string[] }>;
}) {
  const { url } = await params;
  const urlString = url?.length ? `/${url.join("/")}` : "/";
  return <PageContent url={urlString} />;
}
