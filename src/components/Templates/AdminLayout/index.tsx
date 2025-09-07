"use client";

import { Toaster } from "@components/Atoms/ui/toaster";
import AdminHeader from "@pages/Admin/Components/AdminHeader";
import AdminSideBar from "@pages/Admin/Components/AdminSideBar";

export default function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen bg-gray-50/50">
        <AdminSideBar />
        <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
          <header className="bg-white px-4 md:px-6 py-3 z-10 border-b border-gray-200">
            <AdminHeader />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </>
  );
}
