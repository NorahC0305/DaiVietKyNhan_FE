"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MapRegion from "./Components/MapRegion";
import MobileRegion from "./Components/MobileRegion";
import ForceLandscape from "@/components/Atoms/ForceLandscape";

const regions: ICOMPONENTS.Region[] = [
  {
    id: "phu-tay-ho",
    name: "Phủ Tây Hồ",
    imageSrc: "/Phủ Tây Hồ 1.svg",
    position: { top: "-3.5%", right: "-0%" },
    size: { width: 1100, height: 300 },
    hitboxScale: 0.8,
    hitboxOffset: { x: 0.1, y: 0.2 },
    description:
      "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "nui-tan-vien",
    name: "Núi Tản Viên",
    imageSrc: "/Núi Tản Viên 1.svg",
    position: { top: "-1%", left: "0%" },
    size: { width: 950, height: 300 },
    zIndex: 15,
    hitboxScale: 0.9,
    hitboxOffset: { x: -0.1, y: 0.4 },
    description:
      "Núi Tản Viên là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "ky-linh-viet-hoa",
    name: "Kỳ Linh Việt Hỏa",
    imageSrc: "/Kỳ Linh Việt Hỏa 1.svg",
    position: { top: "29%", left: "42%" },
    size: { width: 440, height: 300 },
    zIndex: 20,
    hitboxScale: 0.8,
    hitboxOffset: { x: 0, y: 0.1 },
    description:
      "Kỳ Linh Việt Hỏa là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "dam-da-trach",
    name: "Đầm Dạ Trạch",
    imageSrc: "/Đầm Dạ Trạch 1.svg",
    position: { bottom: "12%", left: "0.25%" },
    size: { width: 1100, height: 400 },
    hitboxScale: 0.8,
    hitboxOffset: { x: -0.1, y: 0.2 },
    description:
      "Đầm Dạ Trạch là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "lang-phu-dong",
    name: "Đầm Dạ Trạch",
    imageSrc: "/Làng Phù Đổng 1.svg",
    position: { bottom: "19.5%", right: "1.75%" },
    size: { width: 820, height: 400 },
    hitboxScale: 0.8,
    hitboxOffset: { x: 0.1, y: 0.4 },
    description:
      "Làng Phù Đổng là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
];

// Map background
const mainMapImage = "/Trang map Kỳ Giới.svg";

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

export default function MapPage() {
  const router = useRouter();
  const [scale, setScale] = useState(1);

  // Tính toán scale dựa trên viewport
  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Base dimensions (design base)
      const baseWidth = 1920;
      const baseHeight = 1080;

      // Calculate scale based on viewport - cover mode để fill toàn màn
      const scaleX = viewportWidth / baseWidth;
      const scaleY = viewportHeight / baseHeight;
      const newScale = Math.max(scaleX, scaleY); // Cover mode: fill toàn màn

      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  const handleRegionClick = (regionId: string) => {
    // Navigate to region detail page
    router.push(`/map/${regionId}`);
  };

  return (
    <ForceLandscape>
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Background Layer 1: Fixed full screen - luôn fill màn hình */}
        <div className="fixed inset-0 z-0">
          <Image
            src={mainMapImage}
            alt="Bản đồ Kỳ Giới Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Container cho scaled map và regions */}
        <div className="relative w-full h-screen flex items-center justify-center z-10">
          <div
            className="relative"
            style={{
              width: 1920,
              height: 1080,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            {/* Background Layer 2: Scaled - để regions align chính xác */}
            <div className="absolute inset-0 pointer-events-none opacity-0">
              <Image
                src={mainMapImage}
                alt="Reference"
                width={1920}
                height={1080}
                className="w-full h-full"
              />
            </div>

            {/* 5 vùng đất tương tác - chỉ hiện trên desktop */}
            <div className="hidden md:block">
              {regions.map((region, index) => (
                <MapRegion
                  key={region.id}
                  id={region.id}
                  name={region.name}
                  imageSrc={region.imageSrc}
                  position={region.position}
                  size={region.size}
                  hitboxScale={region.hitboxScale}
                  hitboxOffset={region.hitboxOffset}
                  onClick={() => handleRegionClick(region.id)}
                  zIndex={region.zIndex || 10 + index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile regions - vị trí cố định không bị ảnh hưởng bởi scale */}
        <div className="absolute inset-0 z-20 block md:hidden">
          {regions.map((region, index) => {
            // Tính toán vị trí cố định dựa trên phần trăm của viewport
            const getFixedPosition = (originalPosition: any) => {
              const fixedPos: any = {};

              if (originalPosition.top) {
                const topPercent = parseFloat(
                  originalPosition.top.replace("%", "")
                );
                fixedPos.top = `${topPercent}%`;
              }

              if (originalPosition.bottom) {
                const bottomPercent = parseFloat(
                  originalPosition.bottom.replace("%", "")
                );
                fixedPos.bottom = `${bottomPercent}%`;
              }

              if (originalPosition.left) {
                const leftPercent = parseFloat(
                  originalPosition.left.replace("%", "")
                );
                fixedPos.left = `${leftPercent}%`;
              }

              if (originalPosition.right) {
                const rightPercent = parseFloat(
                  originalPosition.right.replace("%", "")
                );
                fixedPos.right = `${rightPercent}%`;
              }

              return fixedPos;
            };

            // Lấy cấu hình mobile riêng cho từng vùng
            const mobileConfig =
              mobileRegionsConfig[
                region.id as keyof typeof mobileRegionsConfig
              ];

            return (
              <MobileRegion
                key={`mobile-${region.id}`}
                id={region.id}
                // debug
                name={region.name}
                position={region.position}
                fixedPosition={getFixedPosition(region.position)}
                size={region.size}
                // Props riêng cho mobile landscape
                mobilePosition={mobileConfig?.position}
                mobileSize={mobileConfig?.size}
                onClick={() => handleRegionClick(region.id)}
                zIndex={region.zIndex || 10 + index}
              />
            );
          })}
        </div>
      </div>
    </ForceLandscape>
  );
}
