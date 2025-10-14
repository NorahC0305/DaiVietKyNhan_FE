"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import MapRegion from "./Components/MapRegion";
import RegionDetailModal from "./Components/RegionDetailModal";

const regions: ICOMPONENTS.Region[] = [
  {
    id: "phu-tay-ho",
    name: "Phủ Tây Hồ",
    imageSrc: "/Phủ Tây Hồ 1.svg",
    position: { top: "-18%", right: "-24.5%" },
    size: { width: 1090, height: 300 },
    hitboxScale: 0.6,
    hitboxOffset: { x: 0.1, y: 0.2 },
    description:
      "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "phu-tay-ho",
    name: "Phủ Tây Hồ",
    imageSrc: "/Núi Tản Viên 1.svg",
    position: { top: "-14.5%", left: "-25%" },
    size: { width: 930, height: 300 },
    zIndex: 15,
    hitboxScale: 0.8,
    hitboxOffset: { x: -0.1, y: 0.4 },
    description:
      "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "phu-tay-ho",
    name: "Kỳ Linh Việt Hỏa",
    imageSrc: "/Kỳ Linh Việt Hỏa 1.svg",
    position: { top: "23.5%", left: "39%" },
    size: { width: 420, height: 300 },
    zIndex: 20,
    hitboxScale: 0.8,
    hitboxOffset: { x: 0, y: 0 },
    description:
      "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "phu-tay-ho",
    name: "Đầm Dạ Trạch",
    imageSrc: "/Đầm Dạ Trạch 1.svg",
    position: { bottom: "1%", left: "-24%" },
    size: { width: 1090, height: 400 },
    hitboxScale: 0.8,
    hitboxOffset: { x: -0.1, y: 0.2 },
    description:
      "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  {
    id: "phu-tay-ho",
    name: "Đầm Dạ Trạch",
    imageSrc: "/Làng Phù Đổng 1.svg",
    position: { bottom: "13%", right: "-29.5%" },
    size: { width: 1000, height: 400 },
    hitboxScale: 0.6,
    hitboxOffset: { x: 0.1, y: 0.2 },
    description:
      "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
];

// Map background
const mainMapImage = "/Trang map Kỳ Giới.svg";

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] =
    useState<ICOMPONENTS.Region | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegionClick = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRegion(null), 300);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Container cho map */}
      <div className="relative w-full h-screen flex items-center justify-center p-4">
        {/* Map background chính với animation fade in */}
        <motion.div
          className="relative w-full max-w-7xl h-full max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* 5 vùng đất tương tác với stagger animation */}
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <MapRegion
                id={region.id}
                name={region.name}
                imageSrc={region.imageSrc}
                position={region.position}
                size={region.size}
                hitboxScale={region.hitboxScale}
                hitboxOffset={region.hitboxOffset}
                onClick={() => handleRegionClick(region.id)}
                zIndex={
                  selectedRegion?.id === region.id
                    ? 30
                    : region.zIndex || 10 + index
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal chi tiết vùng đất */}
      <RegionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        region={selectedRegion}
      />
    </div>
  );
}
