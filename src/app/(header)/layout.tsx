import Header from "@components/Molecules/Header";
import ForceLandscape from "@components/Atoms/ForceLandscape";

export default function HeaderPublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <ForceLandscape>
            {children}
            </ForceLandscape>
        </div>

    );
}
