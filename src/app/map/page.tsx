import { IUserLandWithLandArrayResponseModel } from "@models/user-land/response";
import MapPageClient from "@pages/Map";
import userLandService from "@services/user-land";

async function getUserLand() {
  const userLand = await userLandService.getUserLand();
  return userLand;
}

export default async function MapPServer() {
  const userLand = (await getUserLand()) as IUserLandWithLandArrayResponseModel;
  return (
    <>
      <MapPageClient userLand={userLand.data} />
    </>
  );
}
