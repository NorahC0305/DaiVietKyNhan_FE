import Header from "@components/Molecules/Header";
import ForceLandscape from "@components/Atoms/ForceLandscape";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
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
