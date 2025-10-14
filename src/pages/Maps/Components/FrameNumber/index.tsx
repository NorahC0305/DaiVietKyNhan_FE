import React from "react";
import Image from "next/image";

interface FrameNumberProps {
  text: string;
  className?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  width?: number;
  height?: number;
}

const FrameNumber: React.FC<FrameNumberProps> = ({
  text,
  className = "",
  textClassName = "",
  textStyle,
  width = 60,
  height = 60,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Background frame image */}
      <div className="relative">
        <Image
          src="/khung mạng_xu_điểm_ngan.svg"
          alt="Number frame"
          width={width}
          height={height}
          className="object-contain"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        />

        {/* Text overlay positioned in the center */}
        <div
          className={`
            absolute inset-0 
            flex items-center justify-center
            px-2 py-1
            ${textClassName}
          `}
          style={{
            left: "10%",
            right: "10%",
            top: "15%",
            bottom: "15%",
          }}
        >
          <span
            className={`
              text-center font-bold
              leading-none
              max-w-full
            `}
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              lineHeight: "1",
              ...textStyle,
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FrameNumber;
