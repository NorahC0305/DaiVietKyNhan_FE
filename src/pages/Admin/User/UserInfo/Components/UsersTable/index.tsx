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
import { Skeleton } from "@atoms/ui/skeleton";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";
import { IMePaginationResponse } from "@models/user/response";
import { USER } from "@constants/user";
import { formatDate } from "@utils/Date";

export type SortField = 'name' | 'email' | 'coin' | 'point' | 'createdAt' | 'status';
export type SortDirection = 'asc' | 'desc';

interface Props {
  rows: NonNullable<IMePaginationResponse['data']>['results'] | undefined;
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSort?: (field: SortField) => void;
  isLoading?: boolean;
  skeletonRowCount?: number;
}

const UsersTable = ({ rows, sortField, sortDirection, onSort, isLoading = false, skeletonRowCount = 5 }: Props) => {
  /**
   * Get Sort Icon
   * @param field 
   * @returns 
   */
  const handleSort = (field: SortField) => {
    onSort?.(field);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <LucideIcon name="ArrowUpDown" iconSize={14} className="text-gray-400" />;
    }
    return sortDirection === 'asc'
      ? <LucideIcon name="ArrowUp" iconSize={14} className="text-gray-600" />
      : <LucideIcon name="ArrowDown" iconSize={14} className="text-gray-600" />;
  };

  /**
   * Skeleton Row Component
   */
  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-300/50" />
          <Skeleton className="h-4 w-32 bg-gray-300/50" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-48 bg-gray-300/50" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-12 rounded-full bg-gray-300/50" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-12 rounded-full bg-gray-300/50" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24 bg-gray-300/50" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-full bg-gray-300/50" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="h-8 w-8 rounded bg-gray-300/50" />
          <Skeleton className="h-8 w-8 rounded bg-gray-300/50" />
        </div>
      </TableCell>
    </TableRow>
  );
  //-----------------------------End-----------------------------//

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-semibold hover:bg-transparent"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Người dùng
                  {getSortIcon('name')}
                </div>
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-semibold hover:bg-transparent"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-2">
                  Email
                  {getSortIcon('email')}
                </div>
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-semibold hover:bg-transparent"
                onClick={() => handleSort('coin')}
              >
                <div className="flex items-center gap-2 justify-center">
                  Xu
                  {getSortIcon('coin')}
                </div>
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-semibold hover:bg-transparent"
                onClick={() => handleSort('point')}
              >
                <div className="flex items-center gap-2 justify-center">
                  Điểm số
                  {getSortIcon('point')}
                </div>
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-semibold hover:bg-transparent"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center gap-2">
                  Ngày tham gia
                  {getSortIcon('createdAt')}
                </div>
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-semibold hover:bg-transparent"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2 justify-center">
                  Trạng thái
                  {getSortIcon('status')}
                </div>
              </Button>
            </TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: skeletonRowCount }).map((_, index) => (
              <SkeletonRow key={`skeleton-${index}`} />
            ))
          ) : (
            rows?.map((u) => {
              const initials = u.name
                ?.split(" ")
                ?.map((w) => w[0])
                ?.join("");
              return (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-gray-900">{u.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">{u.email}</TableCell>
                  <TableCell className="text-gray-900 text-center">
                    <Badge variant="outline" className="bg-[#D86D38]/20 text-white border-0">
                      {u.coin}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-[#D86D38]/20 text-white border-0">
                      {u.point}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-900">{formatDate(u.createdAt)}</TableCell>
                  <TableCell className="text-center">
                    {u.status === USER.USER_STATUS.ACTIVE ? (
                      <Badge variant="outline" className="bg-[#d16834] text-white border-0">
                        {USER.USER_STATUS.ACTIVE ? 'Hoạt động' : 'Không hoạt động'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-[#F26644] text-white border-0">
                        {USER.USER_STATUS.INACTIVE ? 'Không hoạt động' : 'Hoạt động'}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-600">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <LucideIcon name="Eye" iconSize={20} iconColor={COLORS.TEXT.DARK} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <LucideIcon name="Pencil" iconSize={20} iconColor={COLORS.TEXT.DARK} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;


