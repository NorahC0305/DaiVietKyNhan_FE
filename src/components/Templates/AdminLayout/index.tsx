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
      <div className="flex h-screen bg-white">
        <AdminSideBar />
        <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
            <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </>
  );
}
