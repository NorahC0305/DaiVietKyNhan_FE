import Header from "@components/Molecules/Header";

export default function HeaderPublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen">
            <Header />
            {children}
        </div>

    );
}
