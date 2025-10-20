import TestPageClient from "@pages/Public/Test";
import { UserDataProvider } from "@contexts/UserDataContext";

export default function TestPage() {
    return (
        <UserDataProvider>
            <div className="flex justify-center items-center h-screen">
                <TestPageClient />
            </div>
        </UserDataProvider>
    )
}