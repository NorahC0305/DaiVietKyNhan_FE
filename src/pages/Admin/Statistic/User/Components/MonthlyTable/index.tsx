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

export interface MonthlyStat {
  month: string;
  newUsers: number;
  newUsersChange: number; // percent, can be negative
  activeUsers: number;
  sessions: number;
  avgTime: string;
}

interface Props {
  data: MonthlyStat[];
}

const MonthlyTable = ({ data }: Props) => {
  const getChangeBadgeClass = (value: number) => {
    if (value > 0) return "text-emerald-600";
    if (value < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  return (
    <Card className="xl:col-span-2 border-gray-300">
      <CardHeader>
        <CardTitle className="text-base">
          Thống kê người dùng theo tháng
        </CardTitle>
        <CardDescription>
          Người dùng mới và hoạt động trong 3 tháng qua
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tháng</TableHead>
              <TableHead>Người dùng mới</TableHead>
              <TableHead>Hoạt động</TableHead>
              <TableHead>Phiên</TableHead>
              <TableHead>Thời gian TB</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {row.newUsers.toLocaleString()}
                      <Badge
                        variant="outline"
                        className={getChangeBadgeClass(row.newUsersChange)}
                      >
                        {row.newUsersChange > 0
                          ? `+${row.newUsersChange}%`
                          : `${row.newUsersChange}%`}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{row.activeUsers.toLocaleString()}</TableCell>
                  <TableCell>{row.sessions.toLocaleString()}</TableCell>
                  <TableCell>{row.avgTime}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MonthlyTable;
