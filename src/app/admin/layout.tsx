import AdminLayoutClient from "@components/Templates/AdminLayout";
import { authOptions } from "@lib/authOptions";
import { IUser } from "@models/user/entity";
import { IRoleModel } from "@models/role/model";
import userService from "@services/user";
import { getServerSession } from "next-auth";

interface UserWithRole extends IUser {
  role?: IRoleModel;
}

interface ApiUserResponse {
  data: UserWithRole;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions) as UTILS.ISession;

  let user: ApiUserResponse | null = null;
  if (session) {
      user = await userService.getMe() as ApiUserResponse;
  }

  return <AdminLayoutClient user={user!}>{children}</AdminLayoutClient>;
}
