import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Atoms/ui/table";
import { Badge } from "@/components/Atoms/ui/badge";
import { Progress } from "@/components/Atoms/ui/progress";

const rows = [
  { name: "Địa lý", total: 5420, avg: 78, completion: 85, status: "Tốt" },
  { name: "Văn học", total: 4890, avg: 82, completion: 79, status: "Xuất sắc" },
  { name: "Lịch sử", total: 3650, avg: 75, completion: 72, status: "Tốt" },
  { name: "Khoa học", total: 2980, avg: 71, completion: 68, status: "Tốt" },
];

const CategoryStats = () => {
  const getStatusStyle = (status: string) => {
    if (status === "Xuất sắc") {
      return { backgroundColor: "#d86d37", color: "#ffffff", borderColor: "transparent" } as React.CSSProperties
    }
    if (status === "Tốt") {
      return { backgroundColor: "#f26644", color: "#ffffff", borderColor: "transparent" } as React.CSSProperties
    }
    return {} as React.CSSProperties
  }
  return (
    <Card className="border-gray-300">
      <CardHeader>
        <CardTitle className="text-base">
          Thống kê theo danh mục trò chơi
        </CardTitle>
        <CardDescription>
          Hiệu suất và mức độ tham gia theo từng danh mục
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Danh mục</TableHead>
              <TableHead>Tổng lượt chơi</TableHead>
              <TableHead>Điểm TB</TableHead>
              <TableHead>Tỷ lệ hoàn thành</TableHead>
              <TableHead>Hiệu suất</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((r) => (
              <TableRow key={r.name}>
                <TableCell className="font-medium">
                  <Badge
                    variant="outline"
                    className="mr-2 bg-orange-100 text-admin-primary"
                  >
                    {r.name}
                  </Badge>
                </TableCell>
                <TableCell>{r.total.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span>{r.avg}</span>
                    <Progress value={r.avg} className="!h-2 bg-orange-100" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span>{r.completion}%</span>
                    <Progress
                      value={r.completion}
                      className="!h-2 bg-orange-100"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" style={getStatusStyle(r.status)}>
                    {r.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryStats;
