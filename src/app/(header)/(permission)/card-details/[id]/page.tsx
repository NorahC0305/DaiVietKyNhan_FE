import CardDetailsPage from "@pages/Public/CardDetails";

type PageProps = {
  params: { id: string };
};

export default async function CardDetailsServer({ params }: PageProps) {
  const { id } = params;

  return (
    <>
      <CardDetailsPage />
    </>
  );
}
