"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@routes';
import { IUser } from '@models/user/entity';
import { IGetSystemConfigWithAmountUserResponse } from '@models/system/response';

import CountDown from './CountDown';
import DetailInfo from './DetailInfo';
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
  return (
    <div className='mt-7 min-h-screen'>
      {!user?.gender && !user?.birthDate ? <DetailInfo /> :
        <CountDown activeWithAmountUser={activeWithAmountUser} accessToken={accessToken} />
      }
    </div>
  )
}

export default HomePageClient;