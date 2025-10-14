import HeaderPublicPermissionLayoutClient from "@components/Templates/HeaderPublicPermissionLayout";

export default async function HeaderPublicPermissionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <HeaderPublicPermissionLayoutClient>
            {children}
        </HeaderPublicPermissionLayoutClient>

    );
}
