
import ForceLandscape from "@components/Atoms/ForceLandscape";
import HeaderSSR from "@components/Molecules/HeaderSSR";

export default async function HeaderPublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="w-full min-h-screen">
            <HeaderSSR />
            <ForceLandscape>
                {children}
            </ForceLandscape>
        </div>

    );
}
