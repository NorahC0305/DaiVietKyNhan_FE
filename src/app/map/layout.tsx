import MapLayoutClient from "@components/Templates/MapLayout";

export default function MapLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MapLayoutClient>
        {children}
      </MapLayoutClient>
    </>
  );
}
