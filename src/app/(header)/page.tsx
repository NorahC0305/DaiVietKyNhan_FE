import HomePageClient from "@pages/Public/HomePage";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log('session', session);

  return (
    <HomePageClient />
  );
}
