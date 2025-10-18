"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@routes'
import { IUser } from '@models/user/entity'
import { IGetSystemConfigWithAmountUserResponse } from '@models/system/response'

interface HomePageClientProps {
  user: IUser
  activeWithAmountUser: IGetSystemConfigWithAmountUserResponse
  accessToken: string
}

const HomePageClient = ({ user, activeWithAmountUser, accessToken }: HomePageClientProps) => {
  return (
    <div className='min-h-screen bg-black'>
      {/* Banner 1 - Main Hero Section */}
      <section className="relative  w-full sm:h-[600px] lg:h-[1000px] flex items-center justify-center overflow-hidden">
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
      <section className="relative w-full h-[1100px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760803844/KhiChatCuaBanLa_wmxfip.svg"
            alt="Khí Chất Của Bạn Là"
            width={1730}
            height={3000}
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
              <div className="w-full flex items-center justify-center mt-0 lg:mt-4">
                <button className="text-primary cursor-pointer font-bold text-sm lg:text-lg hover:underline">
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 font-dfvn-graphit">
              NHỮNG NHẬN XÉT VỀ ĐẠI VIỆT KỸ NHÂN
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">PH</span>
              </div>
              <p className="text-white font-semibold">TS. Phan Thanh Hải</p>
            </div>

            {/* Testimonial 2 */}
            <div className="text-center space-y-4">
              <div className="bg-yellow-400 p-6 rounded-lg shadow-lg relative">
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rotate-45"></div>
                <p className="text-gray-800 font-medium text-center">
                  "Tôi tin đây là một cuốn sách vô cùng nên có cho chính mình, người thân và gia đình!"
                </p>
              </div>
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">TL</span>
              </div>
              <p className="text-white font-semibold">KHMT Thanh Lâm</p>
            </div>

            {/* Testimonial 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">TN</span>
              </div>
              <p className="text-white font-semibold">ThS. Nguyễn Thị Nga</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePageClient