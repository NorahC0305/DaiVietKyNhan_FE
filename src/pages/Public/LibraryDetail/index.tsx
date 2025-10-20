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
    <div className="min-h-screen w-full flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
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

          <div className="flex items-center justify-center">
            {/* Main scroll container */}
            <div className="relative w-[1400px] h-[800px] lg:h-[900px]">
              <Image src="https://res.cloudinary.com/dznt9yias/image/upload/v1760726800/frame1_qudfzd.png" alt="Library Detail" className="relative w-full" fill />
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Content area */}
                <div className="flex justify-around items-center h-full">

                  {/* Two column layout */}
                  <div className="gap-8 flex justify-between items-center w-[80%]">
                    {/* ------------------- Left Column ------------------- */}
                    <div className="space-y-2.5 w-[34%] z-20">
                      <RadialGradial className="ml-5 text-4xl lg:text-6xl">
                        TRƯNG TRẮC
                      </RadialGradial>
                      {/* Danh hiệu */}
                      <div className="ml-6">
                        <H3LibDetail className="text-2xl lg:text-4xl">DANH HIỆU</  H3LibDetail>
                        <PLibDetail>
                          {kynhan.thoiKy || "-"}
                        </PLibDetail>
                      </div>

                      {/* Năm sinh - mất */}
                      <div className="ml-8">
                        <H3LibDetail className="text-2xl lg:text-4xl">NĂM SINH - MẤT</H3LibDetail>
                        <PLibDetail>
                          Không rõ năm sinh - Năm 43 tại sông Hát Giang
                        </PLibDetail>
                      </div>

                      {/* Quê quán */}
                      <div className="ml-12">
                        <H3LibDetail className="text-2xl lg:text-4xl">QUÊ QUÁN</H3LibDetail>
                        <PLibDetail>
                          Huyện Mê Linh, Giao Châu
                          (nay thuộc Hà Nội, Việt Nam)
                        </PLibDetail>
                      </div>

                      {/* Xuất thân */}
                      <div className="ml-20">
                        <H3LibDetail className="text-2xl lg:text-4xl">XUẤT THÂN</H3LibDetail>
                        <PLibDetail>
                          Con gái Lạc tướng Mê Linh Trưng
                          Định và bà Man Thiện.
                          Dòng dõi quý tộc Lạc Việt
                        </PLibDetail>
                      </div>

                      {/* Khởi nghĩa */}
                      <div className="ml-28">
                        <H3LibDetail className="text-2xl lg:text-4xl">KHỞI NGHĨA</H3LibDetail>
                        <PLibDetail>
                          Năm 40, phát động tại Hát Môn,
                          khí thế lan khắp Giao Châu
                        </PLibDetail>
                      </div>
                    </div>

                    {/* ------------------- Character illustration in center ------------------- */}
                    <div className="absolute flex justify-center items-center w-[80%] h-[75%] z-10 pointer-events-none">
                      <div className="relative w-[333px] h-[666px]">
                        <Image
                          src="https://res.cloudinary.com/dznt9yias/image/upload/v1760976164/motakynhan/images/file_hil65k.png"
                          alt={kynhan.name}
                          fill
                          priority
                        />

                        <>
                        </>
                      </div>

                      {/* Decorative background circle */}
                      <div className="absolute -z-10 w-[500px] h-[500px] lg:w-[650px] lg:h-[650px]">
                        <Image src="https://res.cloudinary.com/dznt9yias/image/upload/v1760942553/trongdongdongson_okrufz.png" alt="Detail Circle" fill />
                      </div>
                    </div>

                    {/* -------------------- Right Column -------------------- */}
                    <div className="space-y-6 z-20 flex flex-col justify-end items-center w-[32%]">
                      {/* Người đồng hành */}
                      <div className="text-end w-full mr-10">
                        <H3LibDetail className="text-2xl lg:text-4xl">NGƯỜI ĐỒNG HÀNH</H3LibDetail>
                        <PLibDetail>
                          Trưng Nhị - Em gái
                          Chiến hữu cùng vào sinh ra tử
                        </PLibDetail>
                      </div>

                      {/* Phu quân */}
                      <div className="text-end w-full mr-12">
                        <H3LibDetail className="text-2xl lg:text-4xl">PHU QUÂN</H3LibDetail>
                        <PLibDetail>
                          Thi Sách, Lạc tướng Chu Diên
                          Người đồng tâm chí hướng, hi sinh vì đại nghĩa
                        </PLibDetail>
                      </div>

                      {/* Chiến công */}
                      <div className="text-end w-full mr-20">
                        <H3LibDetail className="text-2xl lg:text-4xl">CHIẾN CÔNG</H3LibDetail>
                        <PLibDetail>
                          Chiếm 65 thành, đánh bại Tô Định, lập nên
                          chính quyền tự chủ sau hơn 200 năm đô hộ
                        </PLibDetail>
                      </div>

                      {/* Đỉnh cao */}
                      <div className="text-end w-full mr-32">
                        <H3LibDetail className="text-2xl lg:text-4xl">ĐỈNH CAO</H3LibDetail>
                        <PLibDetail>
                          Trưng Trắc lên ngôi Trưng Nữ Vương
                          đóng đô tại Mê Linh, mở đầu chính
                          quyền tự chủ đầu tiên
                        </PLibDetail>
                      </div>

                      {/* Kết cục */}
                      <div className="text-end w-full mr-44">
                        <H3LibDetail className="text-2xl lg:text-4xl">KẾT CỤC</H3LibDetail>
                        <PLibDetail>
                          Tuẫn tiết tại sông Hát Giang (43) khi kháng
                          chiến chống Mã Viện thất thủ
                        </PLibDetail>
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    </div >
  )

};

export default LibraryDetailPage;
