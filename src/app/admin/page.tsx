"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng tự động đến trang quản lý user info
    router.replace("/admin/manage-user/info");
  }, [router]);

  // Hiển thị loading hoặc null trong khi chuyển hướng
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
