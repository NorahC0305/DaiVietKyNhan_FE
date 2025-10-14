import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import Header from "../Header";
import userService from "@services/user";
import { IMeResponse } from "@models/user/response";

export default async function HeaderSSR() {
  const session = (await getServerSession(authOptions)) as UTILS.ISession;
  let user: IMeResponse["data"] | null = null;
  if (session) {
    const response = (await userService.getMe()) as IMeResponse;
    if (response.data) {
      user = response.data;
    }
  }
  console.log("user", user);
  return <Header user={user} />;
}
