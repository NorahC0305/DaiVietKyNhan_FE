"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@atoms/ui/card";
import { Button } from "@atoms/ui/button";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";

const AdminDashboardPage = () => {
  const stats = [
    {
      title: "Tổng người dùng",
      value: "1,234",
      change: "+12%",
      icon: "Users",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Hoạt động hôm nay",
      value: "567",
      change: "+8%",
      icon: "Activity",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Nội dung mới",
      value: "89",
      change: "+23%",
      icon: "FileText",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Phản hồi",
      value: "45",
      change: "+5%",
      icon: "MessageSquare",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Tổng quan về hệ thống quản trị
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LucideIcon name="Download" iconSize={16} iconColor={COLORS.TEXT.DARK} />
            <span className="hidden sm:inline">Xuất báo cáo</span>
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2"
            style={{ backgroundColor: COLORS.BACKGROUND.ORANGE }}
          >
            <LucideIcon name="Plus" iconSize={16} iconColor={COLORS.TEXT.LIGHT} />
            <span className="hidden sm:inline">Thêm mới</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} so với tháng trước
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <LucideIcon
                    name={stat.icon as any}
                    iconSize={24}
                    iconColor={stat.color}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcon name="Clock" iconSize={20} iconColor={COLORS.TEXT.DARK} />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <LucideIcon name="User" iconSize={16} iconColor={COLORS.BACKGROUND.ORANGE} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Người dùng mới đã đăng ký
                    </p>
                    <p className="text-xs text-gray-500">
                      {item} phút trước
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcon name="Zap" iconSize={20} iconColor={COLORS.TEXT.DARK} />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "Users", label: "Quản lý người dùng", color: "bg-blue-50 text-blue-600" },
                { icon: "FileText", label: "Nội dung", color: "bg-green-50 text-green-600" },
                { icon: "Settings", label: "Cài đặt", color: "bg-orange-50 text-orange-600" },
                { icon: "BarChart3", label: "Báo cáo", color: "bg-purple-50 text-purple-600" },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <LucideIcon
                      name={action.icon as any}
                      iconSize={20}
                      iconColor={action.color.split(' ')[1]}
                    />
                  </div>
                  <span className="text-xs font-medium text-center">
                    {action.label}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
