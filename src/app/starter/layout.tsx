import StarterLayoutClient from "@components/Templates/StarterLayout";

export default function StarterLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StarterLayoutClient>
        {children}
      </StarterLayoutClient>
    </>
  );
}
