"use client";

import React from "react";
import { Button } from "@atoms/ui/button";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";

const AdminHeader = () => {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Left side - Mobile menu button will be handled by sidebar */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 hidden sm:block">
          Dashboard
        </h2>
      </div>

      {/* Right side - User actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-9 md:w-9 rounded-lg hover:bg-gray-100 transition-colors"
          title="Thông báo"
        >
          <LucideIcon
            name="Bell"
            iconSize={18}
            iconColor={COLORS.TEXT.DARK}
          />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-9 md:w-9 rounded-lg hover:bg-gray-100 transition-colors"
          title="Cài đặt"
        >
          <LucideIcon
            name="Settings"
            iconSize={18}
            iconColor={COLORS.TEXT.DARK}
          />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
            <LucideIcon
              name="User"
              iconSize={16}
              iconColor={COLORS.TEXT.LIGHT}
            />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
