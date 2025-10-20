"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kynhanService from "@/services/kynhan";
import type { IKyNhanDetailResponseModel } from "@/models/ky-nhan/response";
import type { IKyNhanUser } from "@/models/ky-nhan/entity";

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
    <div className="min-h-screen w-full flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-100">
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

          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760721989/ScrollPaper_dqmtkl.svg"
            alt="ScrollPaper"
            className="w-full h-auto object-contain"
            width={1600}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1600px) 98vw, 1600px"
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex items-start justify-start pl-[11%] pr-[12%] pt-[18%] pb-[18%] md:pl-[13%] md:pt-[15%] md:pb-[15%] md:pr-[48%]">
            <div className="w-full max-w-[500px] max-h-[90%] md:max-h-[92%] overflow-y-auto pr-2 break-words">
              {/* Ky Nhan Image */}
              {kynhan.imgUrl && (
                <div className="mb-6">
                  <Image
                    src={kynhan.imgUrl}
                    alt={kynhan.name}
                    width={200}
                    height={300}
                    className="object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Name */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight">
                {kynhan.name}
              </h1>

              {/* Thoi Ky */}
              {kynhan.thoiKy && (
                <div className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-black mb-2">Thời kỳ:</h2>
                  <p className="text-base md:text-lg text-black/90 leading-relaxed">
                    {kynhan.thoiKy}
                  </p>
                </div>
              )}

              {/* Chien Cong */}
              {kynhan.chienCong && (
                <div className="mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-black mb-2">Chiến công:</h2>
                  <p className="text-base md:text-lg text-black/90 leading-relaxed">
                    {kynhan.chienCong}
                  </p>
                </div>
              )}

              {/* Additional info */}
              <div className="text-sm text-black/70">
                <p>Trạng thái: {kynhan.unlocked ? "Đã mở khóa" : "Chưa mở khóa"}</p>
              </div>
            </div>
          </div>

          {/* Right-side character illustration */}
          <div className="pointer-events-none absolute inset-0 z-10 hidden md:flex items-center justify-end pr-[2%]">
            <div className="relative w-[45%] max-w-[720px] aspect-[3/5]">
              {kynhan.imgUrl ? (
                <Image
                  src={kynhan.imgUrl}
                  alt={kynhan.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1600px) 45vw, 720px"
                  className="object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                  priority
                />
              ) : (
                <Image
                  src="/DetailGirl.png"
                  alt="Detail Character"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1600px) 45vw, 720px"
                  className="object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryDetailPage;
