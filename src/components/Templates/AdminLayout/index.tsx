"use client";

import LucideIcon from "@components/Atoms/LucideIcon";
import { Card, CardContent } from "@components/Atoms/ui/card";
import { Toaster } from "@components/Atoms/ui/toaster";
import { IUser } from "@models/user/entity";
import { IRoleModel } from "@models/role/model";
import AdminHeader from "@pages/Admin/Components/AdminHeader";
import AdminSideBar from "@pages/Admin/Components/AdminSideBar";

interface UserWithRole extends IUser {
  role?: IRoleModel;
}

interface ApiUserResponse {
  data: UserWithRole;
}

const topStats = [
  {
    title: "Tổng người dùng",
    value: "2,847",
    delta: "+12% từ tháng trước",
    icon: "Users",
  },
  {
    title: "Lượt truy cập Web",
    value: "156",
    delta: "+8% từ tuần trước",
    icon: "FileText",
  },
  {
    title: "Câu hỏi",
    value: "89",
    delta: "+3 câu hỏi mới",
    icon: "HelpCircle",
  },
  {
    title: "Tương tác",
    value: "94.2%",
    delta: "Tỷ lệ tham gia",
    icon: "BarChart3",
  },
];

export default function AdminLayoutClient({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: ApiUserResponse;
}>) {
  return (
    <>
      <div className="flex h-screen bg-white">
        <AdminSideBar />
        <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
          <AdminHeader user={user} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Top stats */}
            <div className="my-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {topStats.map((s, i) => (
                <Card
                  key={i}
                  className="hover:shadow-md transition-shadow bg-admin-primary border-gray-300"
                >
                  <CardContent className="p-4 md:p-8 min-h-44">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-md font-bold text-gray-600 mb-2">
                          {s.title}
                        </p>

                        <div className={`p-3 rounded-lg`}>
                          <LucideIcon name={s.icon as any} iconSize={20} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-6">
                        <p className="text-2xl md:text-3xl font-bold text-gray-900">
                          {s.value}
                        </p>
                        <p className="text-xs text-gray-500">{s.delta}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}
