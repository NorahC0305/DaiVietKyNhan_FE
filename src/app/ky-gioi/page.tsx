import { IUserLandWithLandArrayResponseModel } from "@models/user-land/response";
import MapPageClient from "@pages/Map";
import userLandService from "@services/user-land";

export const dynamic = "force-dynamic";

async function getUserLand() {
  const userLand = await userLandService.getUserLand();
  return userLand;
}

export default async function MapServer() {
  const userLand = (await getUserLand()) as IUserLandWithLandArrayResponseModel;

  return (
    <>
      <MapPageClient userLand={userLand.data} />
    </>
  );
}
