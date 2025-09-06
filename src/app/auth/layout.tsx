import AuthLayoutClient from "@components/Templates/Auth";

export default function AuthLayout({
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
