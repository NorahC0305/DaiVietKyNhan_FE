"use client";

import { Button } from "@atoms/ui/button";
import { Input } from "@atoms/ui/input";
import LucideIcon from "@atoms/LucideIcon";
import { COLORS } from "@constants/colors";

const Toolbar = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Input
            size="sm"
            inputMode="search"
            placeholder="Tìm kiếm người dùng..."
            className="bg-transparent hover:bg-transparent"
            color="black"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 border-gray-300">
          <LucideIcon name="Filter" iconSize={16} />
          Lọc
        </Button>
      </div>
      <Button
        size="sm"
        className="gap-2"
        style={{ backgroundColor: COLORS.BACKGROUND.ORANGE }}
      >
        <LucideIcon name="Plus" iconSize={16} />
        Thêm người dùng
      </Button>
    </div>
  );
};

export default Toolbar;
