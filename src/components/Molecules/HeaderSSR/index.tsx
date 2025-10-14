import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import Header from "../Header";
import { IUser } from "@models/user/entity";
import userService from "@services/user";

export default async function HeaderSSR() {
    const session = await getServerSession(authOptions) as UTILS.ISession;
    let user: IUser | null = null;
    if (session) {
        user = await userService.getMe() as IUser;
    }

    return <Header user={user} />;
}