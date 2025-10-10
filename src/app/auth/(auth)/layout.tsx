import AuthLayoutClient from "@components/Templates/Auth";
import { authOptions } from "@lib/authOptions";
import { ROUTES } from "@routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions) as UTILS.ISession;
    if (session) {
        redirect(ROUTES.PUBLIC.HOME);
    }

    return (
        <AuthLayoutClient>
            {children}
        </AuthLayoutClient>
    );
}
