import HomePageClient from "@pages/Public/HomePage";
import userService from "@services/user";
import { UserSchema } from "@models/user/entity";
import { IBackendResponse } from "@models/backend";
import { IUser } from "@models/user/entity";
import systemService from "@services/system";
import { GetSystemConfigWithAmountUserResSchema, IGetSystemConfigWithAmountUserResponse } from "@models/system/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

async function userMe() {
  try {
    return await userService.getMe();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions) as UTILS.ISession;
  const user = await userMe() as IBackendResponse<typeof UserSchema>;
  const activeWithAmountUser = await systemService.getActiveWithAmountUser(true) as IBackendResponse<typeof GetSystemConfigWithAmountUserResSchema>;

  return (
    <HomePageClient
      user={user.data as IUser}
      activeWithAmountUser={activeWithAmountUser.data as IGetSystemConfigWithAmountUserResponse}
      accessToken={session?.accessToken} />
  );
}
