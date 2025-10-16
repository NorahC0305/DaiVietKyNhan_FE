"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@atoms/ui/card";
import Toolbar from "./Components/Toolbar";
import UsersTable, { SortField, SortDirection } from "./Components/UsersTable";
import { IMePaginationResponse } from "@models/user/response";
import { EnhancedPagination } from "@atoms/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/Atoms/ui/select";
import { Rows } from "lucide-react";
import { useUsersList } from "@hooks/useUser";

interface UserInfoPageProps {
  listUsers: IMePaginationResponse['data'];
  initialUsersResponse?: IMePaginationResponse;
}

const UserInfoPage = ({ listUsers: initialListUsers, initialUsersResponse }: UserInfoPageProps) => {

  /**
   * Use Hooks
   */
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const { data: usersResponse, isFetching, error } = useUsersList({
    search,
    sortBy: sortField,
    sortOrder: sortDirection,
    page,
    limit: itemsPerPage,
  }, initialUsersResponse);
  //-----------------------------End-----------------------------//

  /**
   * Use Data
   */
  const listUsers = usersResponse?.data || initialListUsers;
  //-----------------------------End-----------------------------//


  /**
   * Handle Search
   * @param searchValue 
   */
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(1);
  };
  //-----------------------------End-----------------------------//


  /**
   * Handle 
   * @param field 
   */
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };
  //-----------------------------End-----------------------------//


  /**
   * Handle Pagination
   * @param value 
   */
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  //-----------------------------End-----------------------------//

  return (
    <div className="space-y-6">
      <Card className="border-gray-300 bg-admin-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
            Thông tin người dùng
          </CardTitle>
          <div className="text-sm text-gray-500">
            Quản lý và theo dõi thông tin người dùng
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Toolbar onSearch={handleSearch} />
          {error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-red-500">Có lỗi xảy ra khi tải dữ liệu</div>
            </div>
          ) : (
            <UsersTable
              rows={listUsers?.results}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              isLoading={isFetching}
              skeletonRowCount={itemsPerPage}
            />
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-[100px] bg-background border-border text-foreground h-9">
                <Rows className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {[15, 30, 45, 60].map(size => (
                  <SelectItem key={size} value={String(size)}>{size} / trang</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {listUsers && !isFetching && !error && (
            <EnhancedPagination
              currentPage={listUsers?.pagination?.current || 1}
              totalPages={listUsers?.pagination?.totalPage || 0}
              totalItems={listUsers?.pagination?.totalItem || 0}
              itemsPerPage={listUsers?.pagination?.pageSize || 0}
              onPageChange={handlePageChange}
            // showItemCount={false}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserInfoPage;
