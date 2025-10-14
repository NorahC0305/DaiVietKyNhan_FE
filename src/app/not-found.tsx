import NotFoundPageClient from "@pages/Public/NotFoundPage";
import HeaderSSR from "@components/Molecules/HeaderSSR";

export default async function NotFound() {
  return (
    <>
      <HeaderSSR />
      <NotFoundPageClient />
    </>
  )
}