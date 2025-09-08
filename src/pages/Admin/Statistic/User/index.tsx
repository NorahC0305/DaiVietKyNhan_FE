import React from "react";
import HeaderActions from "./Components/HeaderActions";
import TopStats from "./Components/TopStats";
import MonthlyTable, { MonthlyStat } from "./Components/MonthlyTable";
import TopPlayers from "./Components/TopPlayers";
import CategoryStats from "./Components/CategoryStats";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";

const UserStatisticPage = () => {
  const monthlyData: MonthlyStat[] = [
    {
      month: "Tháng 1",
      newUsers: 245,
      newUsersChange: 23,
      activeUsers: 1850,
      sessions: 4200,
      avgTime: "8m 32s",
    },
    {
      month: "Tháng 2",
      newUsers: 312,
      newUsersChange: -16,
      activeUsers: 2100,
      sessions: 5100,
      avgTime: "9m 15s",
    },
    {
      month: "Tháng 3",
      newUsers: 189,
      newUsersChange: 5,
      activeUsers: 2350,
      sessions: 6200,
      avgTime: "10m 8s",
    },
  ];
  return (
    <div className="space-y-6">
      <Card className="border-gray-300 bg-admin-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
                Thông kê người dùng & lượt chơi
              </CardTitle>
              <div className="text-sm text-gray-500">
                Quản lý và theo dõi thống kê người dùng & lượt chơi
              </div>
            </div>
            <HeaderActions />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <TopStats />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <MonthlyTable data={monthlyData} />
            <TopPlayers />
          </div>
          <CategoryStats />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatisticPage;
