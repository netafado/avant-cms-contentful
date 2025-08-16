import PageContent from "@/components/PageContent";

export default async function Page({ params }: { params: { url: string } }) {
  const { url } = await params;
  return <PageContent url={url} />;
}
