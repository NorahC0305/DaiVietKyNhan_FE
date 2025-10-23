
export const dynamic = 'force-dynamic';


import ForceLandscape from "@components/Atoms/ForceLandscape";
import { Footer } from "@components/Molecules/Footer";
import HeaderSSR from "@components/Molecules/HeaderSSR";
import { AttendanceProvider } from "@/contexts/AttendanceContext";
import { getAttendanceListSSR } from "@/lib/attendance";

export default async function HeaderPublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Fetch attendance data on server
    const initialAttendanceList = await getAttendanceListSSR();

    return (
        <div className="w-full min-h-screen">
            <HeaderSSR />
            <ForceLandscape>
                <AttendanceProvider initialAttendanceList={initialAttendanceList || []}>
                    {children}
                </AttendanceProvider>
            </ForceLandscape>
            <Footer />
        </div>

    );
}
