import AdminSideBar from "@components/Admin/Components/AdminSideBar";
import HeaderAdminSSR from "@components/Organisms/HeaderAdminSSR";
import { Toaster } from "@components/Atoms/ui/toaster";

export default async function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      <AdminSideBar />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        <HeaderAdminSSR />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
