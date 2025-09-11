import Header from "@components/Molecules/Header";

export default function HeaderPublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
        </>

    );
}
