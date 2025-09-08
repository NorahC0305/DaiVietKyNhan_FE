"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/ui/card";
import Toolbar from "./Components/Toolbar";
import UsersTable from "./Components/UsersTable";

const UserInfoPage = () => {
  const users = [
    {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      score: 850,
      date: "2024-01-15",
      active: true,
    },
    {
      name: "Trần Thị B",
      email: "tranthib@email.com",
      score: 720,
      date: "2024-02-20",
      active: true,
    },
    {
      name: "Lê Văn C",
      email: "levanc@email.com",
      score: 650,
      date: "2024-03-10",
      active: false,
    },
    {
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      score: 920,
      date: "2024-01-28",
      active: true,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-gray-300 bg-admin-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
            Thông tin khán giả
          </CardTitle>
          <div className="text-sm text-gray-500">
            Quản lý và theo dõi thông tin khán giả
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Toolbar />
          <UsersTable rows={users} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfoPage;
