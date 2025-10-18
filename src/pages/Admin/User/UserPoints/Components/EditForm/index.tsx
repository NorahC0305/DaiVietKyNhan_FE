"use client";

import { Button } from "@/components/Atoms/ui/button";
import { Input } from "@/components/Atoms/ui/input";
import { Label } from "@/components/Atoms/ui/label";
import { COLORS } from "@constants/colors";

const EditForm = () => {
  return (
    <div className="rounded-lg border border-gray-300 bg-admin-primary p-4 space-y-3">
      <p className="text-lg font-bold text-gray-700">Chỉnh sửa điểm số</p>
      <p className="text-sm font-medium text-gray-700">Chỉnh sửa điểm số cho người dùng</p>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Người dùng</Label>
            <Input placeholder="Tìm kiếm người dùng..." className="bg-transparent hover:bg-gray-100" />
          </div>
          <div>
            <Label>Điểm số mới</Label>
            <Input placeholder="Nhập điểm số" inputMode="numeric" className="bg-transparent hover:bg-gray-100" />
          </div>
        </div>

        <div>
          <Label>Lý do thay đổi</Label>
          <Input placeholder="Nhập lý do thay đổi điểm..." inputMode="text" className="bg-transparent hover:bg-gray-100" />
        </div>

        <Button style={{ backgroundColor: COLORS.BACKGROUND.ORANGE }}>Cập nhật điểm số</Button>
      </div>
    </div>
  );
};

export default EditForm;


