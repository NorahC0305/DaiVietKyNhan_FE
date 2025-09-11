'use client'

import React from "react";
import LucideIcon from "@/components/Atoms/LucideIcon";

const ContactInfo = () => {
  return (
    <div className="rounded-xl bg-gray-200/25 p-5 sm:p-16 border border-white/10 text-white">
      <h2 className="text-2xl sm:text-3xl font-semibold">Thông tin liên hệ</h2>
      <div className="mt-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 h-12 w-12 flex items-center justify-center rounded-full bg-gray-200/25 border border-white/10">
            <LucideIcon name="Mail" iconSize={24} iconColor="currentColor" />
          </div>
          <div>
            <div className="text-base font-semibold">Email</div>
            <div className="text-base text-gray-200">
              photogoagency.contact@gmail.com
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-12 w-12 flex items-center justify-center rounded-full bg-gray-200/25 border border-white/10">
            <LucideIcon name="Phone" iconSize={24} iconColor="currentColor" />
          </div>
          <div>
            <div className="text-base font-semibold">Điện thoại</div>
            <div className="text-base text-gray-200">+1 (555) 123-4567</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-12 w-12 flex items-center justify-center rounded-full bg-gray-200/25 border border-white/10">
            <LucideIcon name="MapPin" iconSize={24} iconColor="currentColor" />
          </div>
          <div>
            <div className="text-base font-semibold">Địa chỉ văn phòng</div>
            <div className="text-base text-gray-200">123 Photography Lane</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
