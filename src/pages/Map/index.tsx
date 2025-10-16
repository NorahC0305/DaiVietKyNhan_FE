"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MapRegion from "./Components/MapRegion";
import MobileRegion from "./Components/MobileRegion";
import ForceLandscape from "@/components/Atoms/ForceLandscape";

// --- Dữ liệu gốc của các regions, bao gồm `position` ---
const baseRegions: ICOMPONENTS.Region[] = [
  {
    id: "phu-tay-ho",
    name: "Phủ Tây Hồ",
    imageSrc: "/Phủ Tây Hồ 1.svg",
    position: { top: "-13%", right: "-2.5%" },
    size: { width: 1200, height: 660 },
    hitboxScale: 0.55,
    hitboxOffset: { x: 0.3, y: 0 },
    description: "...",
  },
  {
    id: "nui-tan-vien",
    name: "Núi Tản Viên",
    imageSrc: "/Núi Tản Viên 1.svg",
    position: { top: "-9%", left: "-9.5%" },
    size: { width: 1300, height: 760 },
    zIndex: 15,
    hitboxScale: 0.6,
    hitboxOffset: { x: -0.08, y: 0 },
    description: "...",
  },
  {
    id: "ky-linh-viet-hoa",
    name: "Kỳ Linh Việt Hỏa",
    imageSrc: "/Kỳ Linh Việt Hỏa 1.svg",
    position: { top: "26%", left: "33.7%" },
    size: { width: 766, height: 490 },
    zIndex: 20,
    hitboxScale: 0.4,
    hitboxOffset: { x: 0, y: 0 },
    description: "...",
  },
  {
    id: "dam-da-trach",
    name: "Đầm Dạ Trạch",
    imageSrc: "/Đầm Dạ Trạch 1.svg",
    position: { bottom: "-8%", left: "0.2%" },
    size: { width: 1100, height: 620 },
    hitboxScale: 0.8,
    hitboxOffset: { x: -0.1, y: 0.2 },
    description: "...",
  },
  {
    id: "lang-phu-dong",
    name: "Làng Phù Đổng",
    imageSrc: "/Làng Phù Đổng 1.svg",
    position: { bottom: "-8%", right: "-11.5%" },
    size: { width: 1300, height: 720 },
    hitboxScale: 0.6,
    hitboxOffset: { x: 0.1, y: 0.1 },
    description: "...",
  },
];

// Cấu hình riêng cho mobile regions
const mobileRegionsConfig = {
  "phu-tay-ho": {
    position: { top: "0%", right: "0%" },
    size: { width: 260, height: 100 },
  },
  "nui-tan-vien": {
    position: { top: "0%", left: "0%" },
    size: { width: 280, height: 150 },
  },
  "ky-linh-viet-hoa": {
    position: { top: "50%", left: "53%", transform: "translate(-50%, -50%)" },
    size: { width: 100, height: 100 },
  },
  "dam-da-trach": {
    position: { bottom: "0%", left: "0%" },
    size: { width: 320, height: 120 },
  },
  "lang-phu-dong": {
    position: { bottom: "0%", right: "0%" },
    size: { width: 280, height: 150 },
  },
};

const mainMapImage = "/Trang map Kỳ Giới.svg";

export default function MapPage() {
  const router = useRouter();

  const handleRegionClick = (regionId: string) => {
    router.push(`/map/${regionId}`);
  };

  return (
    <ForceLandscape>
      <div className="min-h-screen w-full relative bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        {/* DESKTOP LAYOUT (>= 1024px) */}
        <div className="hidden lg:block w-full h-screen relative overflow-hidden">
          {/* Lớp 1: Ảnh nền fullscreen */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={mainMapImage}
              alt="Bản đồ Kỳ Giới"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Lớp 2: Các regions với positioning tương đối */}
          <div className="relative w-full h-full">
            {baseRegions.map((region, index) => (
              <MapRegion
                key={region.id}
                {...region}
                onClick={() => handleRegionClick(region.id)}
                zIndex={region.zIndex || 10 + index}
                isFullscreen={true}
              />
            ))}
          </div>
        </div>

        {/* MOBILE LAYOUT (< 1024px) */}
        <div className="block lg:hidden w-full h-screen relative">
          <div className="absolute inset-0 z-0">
            <Image
              src={mainMapImage}
              alt="Bản đồ Kỳ Giới Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 w-full h-full">
            {baseRegions.map((region) => {
              const mobileConfig =
                mobileRegionsConfig[
                  region.id as keyof typeof mobileRegionsConfig
                ];
              return (
                <MobileRegion
                  key={`mobile-${region.id}`}
                  id={region.id}
                  name={region.name}
                  position={region.position}
                  size={region.size}
                  mobilePosition={mobileConfig?.position}
                  mobileSize={mobileConfig?.size}
                  onClick={() => handleRegionClick(region.id)}
                  zIndex={region.zIndex || 10}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ForceLandscape>
  );
}
