"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@atoms/ui/button";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";
import { IUser } from "@models/user/entity";
import { IRoleModel } from "@models/role/model";
import { signOut } from "next-auth/react";
import { ROUTES } from "@routes";

interface UserWithRole extends IUser {
  role?: IRoleModel;
}

interface ApiUserResponse {
  data: UserWithRole;
}

interface AdminHeaderProps {
  user: ApiUserResponse;
  pageTitle?: string;
}

const AdminHeader = ({
  user,
  pageTitle = "Bảng điều khiển",
}: AdminHeaderProps) => {
  // State for dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2);
  };

  // Extract user data from API response
  const userData = user?.data;

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: ROUTES.AUTH.LOGIN,
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      {/* Left side - Page title and breadcrumb */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {pageTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Chào mừng trở lại, {userData?.name}
          </p>
        </div>
        {userData?.role && (
          <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold rounded-full shadow-sm">
            {userData.role.name}
          </div>
        )}
      </div>

      {/* Right side - User actions and profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl hover:bg-gray-100 transition-all duration-200"
          title="Tìm kiếm"
        >
          <LucideIcon
            name="Search"
            iconSize={20}
            iconColor={COLORS.TEXT.DARK}
          />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl hover:bg-gray-100 transition-all duration-200 relative"
          title="Thông báo"
        >
          <LucideIcon name="Bell" iconSize={20} iconColor={COLORS.TEXT.DARK} />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl hover:bg-gray-100 transition-all duration-200"
          title="Cài đặt"
        >
          <LucideIcon
            name="Settings"
            iconSize={20}
            iconColor={COLORS.TEXT.DARK}
          />
        </Button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* User Profile */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3 pl-2">
            <div className="relative">
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-white font-semibold text-sm">
                    {getUserInitials(userData?.name || "")}
                  </span>
                </div>
              )}
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900">
                {userData?.name}
              </p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>

            {/* Dropdown arrow */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <LucideIcon
                name={isDropdownOpen ? "ChevronUp" : "ChevronDown"}
                iconSize={16}
                iconColor={COLORS.TEXT.DARK}
              />
            </Button>
          </div>

          {/* Dropdown Menu - Only Logout */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-3 h-auto text-sm text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LucideIcon name="LogOut" iconSize={16} iconColor="#dc2626" />
                <span className="ml-3">Đăng xuất</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
