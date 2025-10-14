import Header from "@components/Molecules/Header";
import ForceLandscape from "@components/Atoms/ForceLandscape";
import { authOptions } from "@lib/authOptions";
import { getServerSession } from "next-auth";
import { IUser } from "@models/user/entity";
import userService from "@services/user";

export default async function HeaderPublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions) as UTILS.ISession;
    let user: IUser | null = null;
    if (session) {
        user = await userService.getMe() as IUser;
    }
    return (
        <div className="w-full min-h-screen">
            {user && <Header user={user} />}
            <ForceLandscape>
                {children}
            </ForceLandscape>
        </div>

    );
}
