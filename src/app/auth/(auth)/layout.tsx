import AuthLayoutClient from "@components/Templates/Auth";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <AuthLayoutClient>
            {children}
        </AuthLayoutClient>
    );
}
