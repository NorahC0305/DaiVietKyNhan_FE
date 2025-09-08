"use client";

import { Badge } from "@atoms/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@atoms/ui/table";
import { Button } from "@atoms/ui/button";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";

export type UserInfoRow = {
  name: string;
  email: string;
  score: number;
  date: string;
  active: boolean;
};

type Props = { rows: UserInfoRow[] };

const UsersTable = ({ rows }: Props) => {
  return (
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
          {rows?.map((u) => {
            const initials = u.name
              ?.split(" ")
              ?.map((w) => w[0])
              ?.join("");
            return (
              <TableRow key={u.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold">
                      {initials[0]}
                    </div>
                    <div className="font-medium text-gray-900">{u.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900">{u.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-[#D86D38]/20 text-white border-0">
                    {u.score}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{u.date}</TableCell>
                <TableCell>
                  {u.active ? (
                    <Badge variant="outline" className="bg-[#d16834] text-white border-0">
                      Hoạt động
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-[#F26644] text-white border-0">
                      Không hoạt động
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-600">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LucideIcon name="Eye" spin iconSize={20} iconColor={COLORS.TEXT.DARK} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LucideIcon name="Pencil" iconSize={20} iconColor={COLORS.TEXT.DARK} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LucideIcon name="MoreHorizontal" iconSize={20} iconColor={COLORS.TEXT.DARK} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;


