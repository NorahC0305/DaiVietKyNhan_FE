import { authOptions } from "@lib/authOptions";
import HomePageClient from "@pages/Public/HomePage";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions) as UTILS.ISession;

  return (
    <HomePageClient session={session} />
  );
}
