import AdminHeader from "@pages/Admin/Components/AdminHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import userService from "@services/user";
import { IMeResponse } from "@models/user/response";

export default async function HeaderAdminSSR() {
    const session = await getServerSession(authOptions) as UTILS.ISession;

    let user: IMeResponse | null = null;
    if (session) {
        user = await userService.getMe() as IMeResponse;
    }
    return <AdminHeader user={user!} />;
}