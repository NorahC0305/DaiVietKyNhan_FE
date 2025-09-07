"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/ui/card";
import { Button } from "@atoms/ui/button";
import { Input } from "@atoms/ui/input";
import { Badge } from "@atoms/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@atoms/ui/table";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";

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
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Input
                  inputMode="search"
                  placeholder="Tìm kiếm người dùng..."
                  className="bg-transparent hover:bg-transparent "
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <LucideIcon
                  name="Filter"
                  iconSize={16}
                  iconColor={COLORS.TEXT.DARK}
                />
                Lọc
              </Button>
            </div>
            <Button
              size="sm"
              className="gap-2"
              style={{ backgroundColor: COLORS.BACKGROUND.ORANGE }}
            >
              <LucideIcon
                name="Plus"
                iconSize={16}
                iconColor={COLORS.TEXT.LIGHT}
              />
              Thêm người dùng
            </Button>
          </div>

          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điểm số</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => {
                  const initials = u.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("");
                  return (
                    <TableRow key={u.email}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold">
                            {initials[0]}
                          </div>
                          <div className="font-medium text-gray-900">
                            {u.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">{u.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-[#D86D38]/20 text-white border-0"
                        >
                          {u.score}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">{u.date}</TableCell>
                      <TableCell>
                        {u.active ? (
                          <Badge
                            variant="outline"
                            className="bg-[#d16834] text-white border-0"
                          >
                            Hoạt động
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-[#F26644] text-white border-0"
                          >
                            Không hoạt động
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2 text-gray-600">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <LucideIcon
                              name="Eye"
                              spin
                              iconSize={20}
                              iconColor={COLORS.TEXT.DARK}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <LucideIcon
                              name="Pencil"
                              iconSize={20}
                              iconColor={COLORS.TEXT.DARK}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <LucideIcon
                              name="MoreHorizontal"
                              iconSize={20}
                              iconColor={COLORS.TEXT.DARK}
                            />
                          </Button>
                        </div>
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

export default UserInfoPage;
