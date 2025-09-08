"use client";

import { Button } from "@atoms/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@atoms/ui/table";
import LucideIcon from "@atoms/LucideIcon";

export type UserPoint = {
  id: string;
  name: string;
  currentPoint: number;
  lastChange: { delta: number; date: string };
};

type Props = { rows: UserPoint[] };

const PointsTable = ({ rows }: Props) => {
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Người dùng</TableHead>
            <TableHead>Điểm hiện tại</TableHead>
            <TableHead>Thay đổi gần nhất</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((u) => {
            const initial = u.name.split(" ")[0][0];
            return (
              <TableRow key={u.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold">
                      {initial}
                    </div>
                    <div className="font-medium text-gray-900">{u.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-md bg-[#D86D38]/20 text-white px-2 py-1 text-xs font-semibold">
                    {u.currentPoint}
                  </span>
                </TableCell>
                <TableCell className="text-gray-800">{`${u.lastChange.delta > 0 ? "+" : ""}${u.lastChange.delta} (${u.lastChange.date})`}</TableCell>
                <TableCell className="">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <LucideIcon name="Edit" iconSize={18} />
                    Chỉnh sửa
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PointsTable;


