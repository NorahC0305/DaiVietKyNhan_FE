"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/ui/card";
import SummaryCards from "./Components/SummaryCards";
import EditForm from "./Components/EditForm";
import PointsTable from "./Components/PointsTable";

const data = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    currentPoint: 850,
    lastChange: { delta: 50, date: "2024-03-10" },
  },
  {
    id: "2",
    name: "Trần Thị B",
    currentPoint: 720,
    lastChange: { delta: 50, date: "2024-03-10" },
  },
  {
    id: "3",
    name: "Lê Văn C",
    currentPoint: 650,
    lastChange: { delta: 50, date: "2024-03-10" },
  },
  {
    id: "4",
    name: "Phạm Thị D",
    currentPoint: 920,
    lastChange: { delta: 50, date: "2024-03-10" },
  },
];

const UserPointPage = () => {
  const average = Math.round(
    data.reduce((acc, u) => acc + u.currentPoint, 0) / data.length
  );
  const highest = Math.max(...data.map((u) => u.currentPoint));
  const highUsers = data.filter((u) => u.currentPoint >= 900).length;

  return (
    <div className="space-y-6">
      {/* Points overview and editor */}
      <Card className="border-gray-300 bg-admin-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
            Điểm số & chỉnh sửa điểm
          </CardTitle>
          <div className="text-sm text-gray-500">
            Quản lý và theo dõi điểm số & chỉnh sửa điểm
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <SummaryCards
            average={average}
            highest={highest}
            highUsers={highUsers}
          />
          <EditForm />
          <PointsTable rows={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPointPage;
