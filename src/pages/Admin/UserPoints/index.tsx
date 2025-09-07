"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/ui/card";
import { Input } from "@atoms/ui/input";
import { Button } from "@atoms/ui/button";
import { COLORS } from "@constants/colors";
import LucideIcon from "@atoms/LucideIcon";
import { Label } from "@components/Atoms/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@atoms/ui/table";

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
          {/* summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 min-h-32">
            {[
              { label: "Điểm trung bình", value: average },
              { label: "Điểm cao nhất", value: highest },
              { label: "Người dùng có điểm cao", value: highUsers },
            ].map((i) => (
              <div
                key={i.label}
                className="rounded-lg border border-gray-300 bg-admin-primary p-4 font-bold"
              >
                <p className="text-sm text-gray-600">{i.label}</p>
                <p className="pt-6 mt-1 text-2xl font-bold text-gray-900">
                  {i.value}
                </p>
              </div>
            ))}
          </div>

          {/* edit form */}
          <div className="rounded-lg border border-gray-300 bg-admin-primary p-4 space-y-3">
            <p className="text-lg font-bold text-gray-700">Chỉnh sửa điểm số</p>
            <p className="text-sm font-medium text-gray-700">
              Chỉnh sửa điểm số cho người dùng
            </p>

            <div className="space-y-3">
              {/* Row 1: user + new points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Người dùng</Label>
                  <Input
                    placeholder="Tìm kiếm người dùng..."
                    className="bg-transparent hover:bg-gray-100"
                  />
                </div>
                <div>
                  <Label>Điểm số mới</Label>
                  <Input
                    placeholder="Nhập điểm số"
                    inputMode="numeric"
                    className="bg-transparent hover:bg-gray-100"
                  />
                </div>
              </div>

              {/* Row 2: reason full width */}
              <div>
                <Label>Lý do thay đổi</Label>
                <Input
                  placeholder="Nhập lý do thay đổi điểm..."
                  inputMode="text"
                  className="bg-transparent hover:bg-gray-100"
                />
              </div>

              {/* Row 3: submit */}
              <Button style={{ backgroundColor: COLORS.BACKGROUND.ORANGE }}>
                Cập nhật điểm số
              </Button>
            </div>
          </div>

          {/* table */}
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
                {data.map((u) => {
                  const initial = u.name.split(" ")[0][0];
                  return (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold">
                            {initial}
                          </div>
                          <div className="font-medium text-gray-900">
                            {u.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-md bg-[#D86D38]/20 text-white px-2 py-1 text-xs font-semibold">
                          {u.currentPoint}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-800">{`${
                        u.lastChange.delta > 0 ? "+" : ""
                      }${u.lastChange.delta} (${
                        u.lastChange.date
                      })`}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPointPage;
