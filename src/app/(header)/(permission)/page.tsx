import HomePageClient from "@pages/Public/HomePage";
import userService from "@services/user";
import { IUser } from "@models/user/entity";

async function userMe() {
  try {
    return await userService.getMe() as IUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  const user = await userMe() as IUser;

  return (
    <HomePageClient user={user} />
  );
}
