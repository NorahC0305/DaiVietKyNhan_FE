"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@routes";
import { IUser } from "@models/user/entity";
import { IGetSystemConfigWithAmountUserResponse } from "@models/system/response";
import { IUserRankData } from "@models/user/response";
import RadialGradial from "@components/Atoms/RadialGradient";
import { useUserRank } from "@hooks/useUser";
import { useAttendance } from "@hooks/useAttendance";
import ModalLayout from "@components/Molecules/DailyCheckin/Layouts/ModalLayout";
import { Dialog, DialogContent } from "@components/Atoms/ui/dialog";
import { useRouter } from "next/navigation";
interface HomePageClientProps {
  user: IUser;
  activeWithAmountUser: IGetSystemConfigWithAmountUserResponse;
  accessToken: string;
}

// Dữ liệu mock cho phần nhận xét
const testimonialsData = [
  {
    id: 1,
    name: "TS. Phạm Thanh Hải",
    title: "",
    quote:
      "Đây là cuốn sách rất xứng đáng để có một trên gia sách của các gia đình Việt Nam?",
    avatar:
      "https://res.cloudinary.com/dznt9yias/image/upload/v1760811389/PhanThanhHai_dtbb2b.svg",
    isMain: false,
  },
  {
    id: 2,
    name: "NSƯT Thành Lộc",
    title: "",
    quote:
      "Tôi tin đây là một cuốn sách ai cũng nên có cho chính mình, người thân và gia đình!",
    avatar:
      "https://res.cloudinary.com/dznt9yias/image/upload/v1760811335/NSUTThanhLoc_o9xoa6.svg",
    isMain: true,
  },
  {
    id: 3,
    name: "Charlie Nguyễn",
    title: "Đạo diễn",
    quote:
      "Đây là 1 dự án hiếm hoi xứng đáng được lan truyền rộng rãi trong cộng đồng.",
    avatar:
      "https://res.cloudinary.com/dznt9yias/image/upload/v1760811440/CharlieNguyen_oxuqka.svg",
    isMain: false,
  },
];

const HomePageClient = ({
  user,
  activeWithAmountUser,
  accessToken,
}: HomePageClientProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1); // Bắt đầu từ testimonial thứ 2 (index 1) làm chính

  // Memoize params để tránh re-creation mỗi lần render
  const rankParams = useMemo(() => ({ currentPage: 1, pageSize: 15 }), []);

  const { data: userRankData, isLoading: isLoadingRank } =
    useUserRank(rankParams);

  // Hook để kiểm tra trạng thái điểm danh
  const {
    attendanceList,
    isLoading: isAttendanceLoading,
    isCheckingIn,
    checkIn,
    refetch,
    isTodayCheckedIn,
    getCheckedDates,
  } = useAttendance();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000); // Tự động lướt sau mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  const getTestimonialDisplay = (indexOffset: number) => {
    const total = testimonialsData.length;
    let actualIndex = (currentIndex + indexOffset + total) % total;
    return testimonialsData[actualIndex];
  };

  const getDotClass = (index: number) => {
    if (index === currentIndex) {
      return "w-3.5 h-3.5 bg-red-600 rounded-full cursor-pointer";
    }
    return "w-2.5 h-2.5 bg-gray-500 rounded-full cursor-pointer hover:bg-gray-400";
  };

  // Process user rank data for display - memoized để tránh re-computation
  const leaderboardData = useMemo(() => {
    if (!userRankData?.data?.results) {
      return { leftColumn: [], rightColumn: [], thirdColumn: [] };
    }

    const users = userRankData.data.results;
    const leftColumn = users.slice(0, 5);
    const rightColumn = users.slice(5, 10);
    const thirdColumn = users.slice(10, 15);

    return { leftColumn, rightColumn, thirdColumn };
  }, [userRankData?.data?.results]);

  const renderRankItem = useCallback(
    (item: IUserRankData | undefined, rank: number) => (
      <div
        key={item?.id || rank}
        className="flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded"
      >
        <div className="text-lg md:text-xl font-bold text-primary opacity-70">
          {rank}.
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center flex-shrink-0">
          {item?.avatar ? (
            <Image
              src={item.avatar}
              alt={item.name || "User"}
              width={24}
              height={24}
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-600">?</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-primary text-xs md:text-sm truncate">
            {item?.name || "Chưa có dữ liệu"}
          </div>
          <div className="text-primary text-xs">{item?.point || 0}</div>
        </div>
      </div>
    ),
    []
  );
  const [showModal, setShowModal] = useState(false);

  // Tự động mở modal nếu chưa điểm danh hôm nay
  useEffect(() => {
    if (!isAttendanceLoading) {
      if (!isTodayCheckedIn()) {
        setShowModal(true);
      } else {
        // Nếu đã điểm danh rồi mà modal đang mở thì đóng nó đi
        setShowModal(false);
      }
    }
  }, [isAttendanceLoading, isTodayCheckedIn]);
  return (
    <div className="min-h-screen bg-black">
      {/* Banner 1 - Main Hero Section */}
      <section className="relative w-full sm:h-[600px] lg:h-[1100px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 cursor-pointer">
          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760803766/HomePageBanner_iyp4lc.svg"
            alt="HomePage Banner"
            width={1730}
            height={3000}
            // className="object-cover"
            onClick={() => router.push(ROUTES.PUBLIC.MAP)}
            priority
          />
        </div>
      </section>

      {/* Check-in Modal Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="!max-w-6xl !w-[95vw] lg:!w-[1200px] max-h-[90vh] overflow-hidden p-0 border-0 !bg-transparent shadow-none">
          <ModalLayout
            onClose={() => setShowModal(false)}
            onCheckinSuccess={() => {
              // Đóng modal sau khi điểm danh thành công
              setShowModal(false);
            }}
            attendanceData={{
              attendanceList,
              isLoading: isAttendanceLoading,
              isCheckingIn,
              checkIn,
              refetch,
              isTodayCheckedIn,
              getCheckedDates,
            }}
          />
        </DialogContent>
      </Dialog>
      {/* Banner 2 - Khí Chất Section */}
      <section className="relative w-full sm:h-[600px] lg:h-[1100px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 cursor-pointer">
          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760803844/KhiChatCuaBanLa_wmxfip.svg"
            alt="Khí Chất Của Bạn Là"
            width={1730}
            height={1000}
            onClick={() => router.push(ROUTES.STARTER.TEST_PLAYGROUND)}
            priority
          />
        </div>
      </section>

      {/* Ranking Section */}
      <section className="relative w-full flex items-center justify-center py-16">
        <div className="relative">
          {/* Scroll Paper Background - Điều chỉnh kích thước */}
          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760804373/CuonGiayHaiBenMauTrang_w8cxky.svg"
            alt="Bảng Xếp Hạng"
            width={1000}
            height={600}
            className="w-full h-auto max-h-[600px] object-contain"
            priority
          />

          {/* Content Overlay - Điều chỉnh positioning */}
          <div className="absolute top-3 left-0 right-0 bottom-0 z-10  mx-auto h-[100%] flex flex-col justify-center">
            {/* Content Container - Giới hạn kích thước */}
            <div className="w-full overflow-hidden">
              <div className="flex items-center justify-center">
                <RadialGradial className="text-center lg:text-6xl py-3 text-5xl font-bd-street-sign">
                  BẢNG XẾP HẠNG
                </RadialGradial>
              </div>
              <div className="w-full flex justify-center items-center gap-3 md:gap-4">
                <div className="w-[80%] flex justify-around items-center">
                  {isLoadingRank ? (
                    <div className="flex justify-center items-center w-full py-8">
                      <div className="text-primary">Đang tải dữ liệu...</div>
                    </div>
                  ) : (
                    <>
                      {/* Left Column - 1-5 */}
                      <div className="space-y-1 md:space-y-2">
                        {Array.from({ length: 5 }, (_, index) => {
                          const rank = index + 1;
                          const item = leaderboardData.leftColumn[index];
                          return renderRankItem(item, rank);
                        })}
                      </div>

                      {/* Right Column - 6-10 */}
                      <div className="space-y-1 md:space-y-2">
                        {Array.from({ length: 5 }, (_, index) => {
                          const rank = index + 6;
                          const item = leaderboardData.rightColumn[index];
                          return renderRankItem(item, rank);
                        })}
                      </div>

                      {/* Third Column - 11-15 */}
                      <div className="space-y-1 md:space-y-2">
                        {Array.from({ length: 5 }, (_, index) => {
                          const rank = index + 11;
                          const item = leaderboardData.thirdColumn[index];
                          return renderRankItem(item, rank);
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* <div className="w-full flex items-center justify-center mt-0 lg:mt-4">
                <button className="text-primary cursor-pointer font-bold text-sm lg:text-lg hover:underline">
                  Xem thêm
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-gradient-to-b from-gray-900 to-black py-16 pb-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Headline */}
          <div className="w-full mb-10 lg:mb-16 flex items-center justify-center gap-4">
            <div className="line" />
            <h3 className="text-3xl lg:text-4xl text-white font-bd-street-sign text-center">
              NHỮNG NHẬN XÉT VỀ ĐẠI VIỆT KỲ NHÂN
            </h3>
            <div className="line" />
          </div>

          {/* Testimonials Carousel Container */}
          <div className="flex justify-center items-start gap-8 lg:gap-12 relative h-[350px]">
            {/* Để lướt, chúng ta sẽ render 3 phần tử: trước, hiện tại, sau */}

            {/* === Left Testimonial (Faded) === */}
            <div
              className={`
              absolute transition-all duration-1000 ease-in-out
              flex flex-col items-center space-y-5 pt-12 opacity-60
              w-full max-w-xs
              left-1/3 lg:left-1/4 transform -translate-x-full -ml-40 md:-ml-0
              md:flex
              `}
            >
              <p className="text-gray-300 text-base italic text-center h-24 flex items-center justify-center">
                {getTestimonialDisplay(-1).quote}
              </p>
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={getTestimonialDisplay(-1).avatar}
                  alt={getTestimonialDisplay(-1).name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold">
                  {getTestimonialDisplay(-1).name}
                </p>
                {getTestimonialDisplay(-1).title && (
                  <p className="text-gray-400 text-sm">
                    {getTestimonialDisplay(-1).title}
                  </p>
                )}
              </div>
            </div>

            {/* === Center Testimonial (Prominent) === */}
            <div
              className={`
              absolute transition-all duration-1000 ease-in-out
              flex flex-col items-center space-y-6
              w-full md:w-1/2 max-w-md
              left-1/2 transform -translate-x-1/2
              `}
            >
              {/* Speech Bubble */}
              <div className="bg-secondary p-6 rounded-lg shadow-lg relative z-10">
                <p className="text-white font-medium text-center text-lg lg:text-xl italic">
                  {getTestimonialDisplay(0).quote}
                </p>
                {/* Bubble Pointer */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-10 bg-secondary rotate-45"></div>
              </div>
              {/* Avatar */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={getTestimonialDisplay(0).avatar}
                  alt={getTestimonialDisplay(0).name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover w-full h-full border-2 border-secondary"
                />
              </div>
              {/* Name */}
              <div className="text-center">
                <p className="text-white font-semibold text-lg">
                  {getTestimonialDisplay(0).name}
                </p>
                {getTestimonialDisplay(0).title && (
                  <p className="text-gray-400 text-sm">
                    {getTestimonialDisplay(0).title}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`
              absolute transition-all duration-1000 ease-in-out
              flex flex-col items-center space-y-5 pt-12 opacity-60
              w-full max-w-xs
              right-0 transform translate-x-0 ml-40 md:ml-0
              md:flex
              `}
            >
              <p className="text-gray-300 text-base italic text-center h-24 flex items-center justify-center">
                {getTestimonialDisplay(1).quote}
              </p>
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={getTestimonialDisplay(1).avatar}
                  alt={getTestimonialDisplay(1).name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold">
                  {getTestimonialDisplay(1).name}
                </p>
                {getTestimonialDisplay(1).title && (
                  <p className="text-gray-400 text-sm">
                    {getTestimonialDisplay(1).title}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center items-center gap-3 pt-12">
            {testimonialsData.map((_, index) => (
              <div
                key={index}
                className={getDotClass(index)}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageClient;

// "use client";

// import React from 'react'
// import DetailInfo from './DetailInfo'
// import CountDown from './CountDown'
// import { IUser } from '@models/user/entity'
// import { IGetSystemConfigWithAmountUserResponse } from '@models/system/response'
// import DailyCheckin from '@components/Molecules/DailyCheckin';

// interface HomePageClientProps {
//   user: IUser
//   activeWithAmountUser: IGetSystemConfigWithAmountUserResponse
//   accessToken: string
// }

// const HomePageClient = ({ user, activeWithAmountUser, accessToken }: HomePageClientProps) => {
//   return (
//     <div className='mt-7 min-h-screen'>
//       {!user?.gender && !user?.birthDate ? <DetailInfo /> :
//         <CountDown activeWithAmountUser={activeWithAmountUser} accessToken={accessToken} />
//       }
// <DailyCheckin />
//     </div>
//   )
// }

// export default HomePageClient
