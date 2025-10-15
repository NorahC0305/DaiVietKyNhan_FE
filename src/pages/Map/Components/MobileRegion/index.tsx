"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MobileRegionProps {
  id: string;
  name: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  size?: {
    width: number;
    height: number;
  };
  onClick?: () => void;
  zIndex?: number;
  // Vị trí cố định dựa trên phần trăm của viewport
  fixedPosition?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  // Props riêng cho mobile landscape
  mobilePosition?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  mobileSize?: {
    width: number;
    height: number;
  };
  // Prop để bật/tắt debug mode
  debug?: boolean;
}

export default function MobileRegion({
  id,
  name,
  position,
  size = { width: 200, height: 200 },
  onClick,
  zIndex = 10,
  fixedPosition,
  mobilePosition,
  mobileSize,
  debug = false,
}: MobileRegionProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Ưu tiên mobilePosition > fixedPosition > position
  const finalPosition = mobilePosition || fixedPosition || position;
  const finalSize = mobileSize || size;

  return (
    <div
      className="absolute"
      style={{
        ...finalPosition,
        zIndex,
        width: finalSize.width,
        height: finalSize.height,
      }}
    >
      {/* Vùng tương tác cho mobile - hoàn toàn ẩn nhưng có thể bấm */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundColor: "transparent !important",
          border: "none !important",
          outline: "none !important",
          boxShadow: "none !important",
          background: "transparent !important",
          backgroundImage: "none !important",
          backgroundSize: "auto !important",
          backgroundPosition: "initial !important",
          backgroundRepeat: "initial !important",
        }}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onClick={onClick}
      />

      {/* Debug mode - chỉ hiện khi debug = true */}
      {debug && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full border-2 border-red-500 border-dashed bg-red-500 bg-opacity-20 flex items-center justify-center">
            <span className="text-red-500 text-xs font-bold bg-white px-2 py-1 rounded">
              {name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
