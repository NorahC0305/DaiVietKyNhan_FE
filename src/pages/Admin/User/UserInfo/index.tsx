"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@atoms/ui/card";
import Toolbar from "./Components/Toolbar";
import UsersTable from "./Components/UsersTable";
import { IMePaginationResponse } from "@models/user/response";
import { EnhancedPagination } from "@atoms/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/Atoms/ui/select";
import { Rows } from "lucide-react";

interface UserInfoPageProps {
  listUsers: IMePaginationResponse['data'];
}

const UserInfoPage = ({ listUsers }: UserInfoPageProps) => {

  console.log(listUsers);

  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [page, setPage] = useState<number>(1);
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
          <Toolbar />
          <UsersTable rows={listUsers?.results} />
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
          {listUsers && (
            <EnhancedPagination
              currentPage={listUsers?.pagination?.current || 1}
              totalPages={listUsers?.pagination?.totalPage || 0}
              totalItems={listUsers?.pagination?.totalItem || 0}
              itemsPerPage={listUsers?.pagination?.pageSize || 0}
              onPageChange={handlePageChange}
              showItemCount={false}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserInfoPage;
