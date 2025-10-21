import MapLayoutClient from "@components/Templates/MapLayout";
import { authOptions } from "@lib/authOptions";
import { IMeResponse } from "@models/user/response";
import userService from "@services/user";
import { getServerSession } from "next-auth";

export default async function MapLayoutServer({
  params,
  children,
}: Readonly<{
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}>) {
  const { slug } = await params;

  const session = (await getServerSession(authOptions)) as UTILS.ISession;
  let user: IMeResponse["data"] | null = null;
  if (session) {
    const response = (await userService.getMe()) as IMeResponse;
    if (response.data) {
      user = response.data;
    }
  }

  return (
    <>
      <MapLayoutClient user={user} slug={slug}>{children}</MapLayoutClient>
    </>
  );
}
