import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import LucideIcon from "@/components/Atoms/LucideIcon";

const data = [
  {
    title: "Tổng người dùng",
    icon: "Users",
    value: "2,847",
    change: "+12% từ tháng trước",
    changeClass: "text-green-600",
  },
  {
    title: "Người dùng hoạt động",
    icon: "Activity",
    value: "2,350",
    change: "+8% từ tuần trước",
    changeClass: "text-green-600",
  },
  {
    title: "Tổng lượt chơi",
    icon: "PlayCircle",
    value: "16,940",
    change: "+15% từ tháng trước",
    changeClass: "text-green-600",
  },
  {
    title: "Thời gian TB/phiên",
    icon: "Clock",
    value: "10m 8s",
    change: "-1m 23s từ tháng trước",
    changeClass: "text-red-600",
  },
];

const TopStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {data?.map((item) => (
        <Card key={item.title} className="bg-admin-primary border border-gray-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <LucideIcon
                name={item.icon as any}
                iconSize={18}
                className="text-muted-foreground"
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold">{item.value}</div>
            <CardDescription className={`mt-1 text-xs ${item.changeClass}`}>
              {item.change}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopStats;
