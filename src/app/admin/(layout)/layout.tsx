import AdminLayoutClient from "@components/Templates/AdminLayout";
import AdminSideBar from "@pages/Admin/Components/AdminSideBar";
import HeaderAdminSSR from "@components/Organisms/HeaderAdminSSR";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen bg-white">
      <AdminSideBar />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        <HeaderAdminSSR />
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </div>
    </div>
  );
}
