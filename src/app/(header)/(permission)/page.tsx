import HomePageClient from "@pages/Public/HomePage";
import userService from "@services/user";
import { UserSchema } from "@models/user/entity";
import { IBackendResponse } from "@models/backend";
import { IUser } from "@models/user/entity";

async function userMe() {
  try {
    return await userService.getMe();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  const user = await userMe() as IBackendResponse<typeof UserSchema>;

  return (
    <HomePageClient user={user.data as IUser} />
  );
}
