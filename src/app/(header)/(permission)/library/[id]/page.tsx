import LibraryDetailPage from "@pages/Public/LibraryDetail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LibraryDetailServer({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <>
      <LibraryDetailPage id={id} />
    </>
  );
}
