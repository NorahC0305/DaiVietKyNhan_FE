"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kynhanService from "@/services/kynhan";
import type { IKyNhanDetailResponseModel } from "@/models/ky-nhan/response";
import type { IKyNhanUser } from "@/models/ky-nhan/entity";
import H3LibDetail from "./H3";
import PLibDetail from "./P";
import RadialGradial from "@components/Atoms/RadialGradient";
import KyNhanSummary from "./KyNhanSummary";
import ChiTietKyNhan from "./ChiTietKyNhan";

interface LibraryDetailPageProps {
  id: string;
}

const LibraryDetailPage = ({ id }: LibraryDetailPageProps) => {
  const [kynhan, setKynhan] = useState<IKyNhanUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchKyNhanDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const kyNhanId = parseInt(id);
        if (isNaN(kyNhanId)) {
          setError("ID không hợp lệ");
          return;
        }

        const response = await kynhanService.getKyNhanById(kyNhanId) as IKyNhanDetailResponseModel;

        if (response?.data) {
          setKynhan(response.data);
        } else {
          setError("Không tìm thấy thông tin kỳ nhân");
        }
      } catch (error) {
        console.error("Error fetching kynhan detail:", error);
        setError("Đã có lỗi xảy ra khi tải thông tin kỳ nhân");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchKyNhanDetail();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  if (error || !kynhan) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error || "Không tìm thấy kỳ nhân"}</div>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[1600px] px-2 py-8">
        <div className="relative w-full">
          {/* Back button */}
          <button
            onClick={handleGoBack}
            className="absolute top-4 left-4 z-20 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white/100 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại
          </button>

          {/* ----- Ky Nhan Summary Section ----- */}
          <KyNhanSummary />

          {/* ----- Chi Tiet Ky Nhan Section ----- */}
          <ChiTietKyNhan kyNhanId={kynhan.id} />
        </div>
      </div>
    </div>
  )

};

export default LibraryDetailPage;
