import MapsLayoutClient from "@components/Templates/MapsLayout";

export default function MapsLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MapsLayoutClient>
        {children}
      </MapsLayoutClient>
    </>
  );
}
