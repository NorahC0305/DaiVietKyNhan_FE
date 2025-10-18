import { authOptions } from "@lib/authOptions";
import { IMePaginationResponse, IMeResponse } from "@models/user/response";
import UserInfoPage from "@pages/Admin/User/UserInfo";
import userService from "@services/user";
import { getServerSession } from "next-auth";

export default async function UserInfoServer() {
  const session = await getServerSession(authOptions) as UTILS.ISession;
  let listUsers: IMePaginationResponse | null = null;
  if (session) {
    listUsers = await userService.getUsers() as IMePaginationResponse;
  }
 
  return <UserInfoPage listUsers={listUsers!.data!} />;
}
