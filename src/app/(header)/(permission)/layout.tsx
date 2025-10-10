import HeaderPublicPermissionLayoutClient from "@components/Templates/HeaderPublicPermissionLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import { redirect } from "next/navigation";
import { ROUTES } from "@routes";

export default async function HeaderPublicPermissionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions) as UTILS.ISession;
    if (!session) {
        redirect(ROUTES.AUTH.LOGIN);
    }

    return (
        <HeaderPublicPermissionLayoutClient>
            {children}
        </HeaderPublicPermissionLayoutClient>

    );
}
