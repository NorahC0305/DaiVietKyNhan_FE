"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@routes';
import { IUser } from '@models/user/entity';
import { IGetSystemConfigWithAmountUserResponse } from '@models/system/response';

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
    quote: "Đây là cuốn sách rất xứng đáng để có một trên gia sách của các gia đình Việt Nam?",
    avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760811389/PhanThanhHai_dtbb2b.svg",
    isMain: false,
  },
  {
    id: 2,
    name: "NSƯT Thành Lộc",
    title: "",
    quote: "Tôi tin đây là một cuốn sách ai cũng nên có cho chính mình, người thân và gia đình!",
    avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760811335/NSUTThanhLoc_o9xoa6.svg",
    isMain: true,
  },
  {
    id: 3,
    name: "Charlie Nguyễn",
    title: "Đạo diễn",
    quote: "Đây là 1 dự án hiếm hoi xứng đáng được lan truyền rộng rãi trong cộng đồng.",
    avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760811440/CharlieNguyen_oxuqka.svg",
    isMain: false,
  },
];


const HomePageClient = ({ user, activeWithAmountUser, accessToken }: HomePageClientProps) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Bắt đầu từ testimonial thứ 2 (index 1) làm chính

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

  return (
    <div className='min-h-screen bg-black'>
      {/* Banner 1 - Main Hero Section */}
      <section className="relative w-full sm:h-[600px] lg:h-[1100px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760803766/HomePageBanner_iyp4lc.svg"
            alt="HomePage Banner"
            width={1730}
            height={3000}
            // className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Banner 2 - Khí Chất Section */}
      <section className="relative w-full sm:h-[600px] lg:h-[1100px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760803844/KhiChatCuaBanLa_wmxfip.svg"
            alt="Khí Chất Của Bạn Là"
            width={1730}
            height={1000}
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
              <h3 className="
                text-center text-4xl
                mb-0 lg:mb-4 drop-shadow-sm
                text-primary bg-clip-text
                ">
                BXH Kỳ Chủ
              </h3>
              <div className="w-full flex justify-center items-center gap-3 md:gap-4">
                <div className='w-[80%] flex justify-around items-center'>
                  {/* Left Column - 1-5 */}
                  <div className="space-y-1 md:space-y-2">
                    {[
                      { id: 1, name: "VŨ TIẾN HÙNG", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 2, name: "HẠNH NHÂN", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 3, name: "HUYỀN ANH", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 4, name: "MAI ANH", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 5, name: "MƯA HUỲNH", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded">
                        <div className="text-lg md:text-xl font-bold text-primary opacity-70">
                          {item.id}.
                        </div>
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center flex-shrink-0">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={24}
                            height={24}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-primary text-xs md:text-sm truncate">{item.name}</div>
                          <div className="text-primary text-xs">{item.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column - 6-10 */}
                  <div className="space-y-1 md:space-y-2">
                    {[
                      { id: 6, name: "NGUYỄN VĂN A", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 7, name: "TRẦN THỊ B", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 8, name: "LÊ VĂN C", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 9, name: "PHẠM THỊ D", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 10, name: "HOÀNG VĂN E", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded">
                        <div className="text-lg md:text-xl font-bold text-primary opacity-70">
                          {item.id}.
                        </div>
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center flex-shrink-0">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={24}
                            height={24}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-primary text-xs md:text-sm truncate">{item.name}</div>
                          <div className="text-primary text-xs">{item.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    {[
                      { id: 1, name: "VŨ TIẾN HÙNG", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 2, name: "HẠNH NHÂN", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 3, name: "HUYỀN ANH", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 4, name: "MAI ANH", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" },
                      { id: 5, name: "MƯA HUỲNH", score: "3200", avatar: "https://res.cloudinary.com/dznt9yias/image/upload/v1760708105/kynhan/images/file_vx0mqn.png" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-1 md:space-x-2 p-1 md:p-2 rounded">
                        <div className="text-lg md:text-xl font-bold text-primary opacity-70">
                          {item.id}.
                        </div>
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded flex items-center justify-center flex-shrink-0">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={24}
                            height={24}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-primary text-xs md:text-sm truncate">{item.name}</div>
                          <div className="text-primary text-xs">{item.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>
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
            <div className='line' />
            <h3 className="text-3xl lg:text-4xl text-white font-bd-street-sign text-center">
              NHỮNG NHẬN XÉT VỀ ĐẠI VIỆT KỲ NHÂN
            </h3>
            <div className='line' />
          </div>

          {/* Testimonials Carousel Container */}
          <div className="flex justify-center items-start gap-8 lg:gap-12 relative h-[350px]">
            {/* Để lướt, chúng ta sẽ render 3 phần tử: trước, hiện tại, sau */}

            {/* === Left Testimonial (Faded) === */}
            <div className={`
              absolute transition-all duration-1000 ease-in-out
              flex flex-col items-center space-y-5 pt-12 opacity-60
              w-full max-w-xs
              left-1/3 lg:left-1/4 transform -translate-x-full -ml-40 md:-ml-0
              md:flex
              `}>
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
              <div className='text-center'>
                <p className="text-white font-semibold">{getTestimonialDisplay(-1).name}</p>
                {getTestimonialDisplay(-1).title && <p className="text-gray-400 text-sm">{getTestimonialDisplay(-1).title}</p>}
              </div>
            </div>

            {/* === Center Testimonial (Prominent) === */}
            <div className={`
              absolute transition-all duration-1000 ease-in-out
              flex flex-col items-center space-y-6
              w-full md:w-1/2 max-w-md
              left-1/2 transform -translate-x-1/2
              `}>
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
              <div className='text-center'>
                <p className="text-white font-semibold text-lg">{getTestimonialDisplay(0).name}</p>
                {getTestimonialDisplay(0).title && <p className="text-gray-400 text-sm">{getTestimonialDisplay(0).title}</p>}
              </div>
            </div>

            <div className={`
              absolute transition-all duration-1000 ease-in-out
              flex flex-col items-center space-y-5 pt-12 opacity-60
              w-full max-w-xs
              right-0 transform translate-x-0 ml-40 md:ml-0
              md:flex
              `}>
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
              <div className='text-center'>
                <p className="text-white font-semibold">{getTestimonialDisplay(1).name}</p>
                {getTestimonialDisplay(1).title && <p className="text-gray-400 text-sm">{getTestimonialDisplay(1).title}</p>}
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
  )
}

export default HomePageClient;