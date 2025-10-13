import React from "react";
import Image from "next/image";

interface FrameTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  width?: number;
  height?: number;
}

const FrameText: React.FC<FrameTextProps> = ({
  text,
  className = "",
  textClassName = "",
  textStyle,
  width = 400,
  height = 80,
}) => {
  // Calculate responsive font size based on frame dimensions
  const getFontSize = () => {
    const baseWidth = 400;
    const baseHeight = 80;
    const widthRatio = width / baseWidth;
    const heightRatio = height / baseHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    if (ratio < 0.7) return "text-xs";
    if (ratio < 1.2) return "text-sm";
    if (ratio < 1.5) return "text-base";
    if (ratio < 2) return "text-lg";
    return "text-xl";
  };
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Background frame image */}
      <div className="relative">
        <Image
          src="/khung mạng_xu_điểm.svg"
          alt="Decorative frame"
          width={width}
          height={height}
          className="object-contain"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            minWidth: "200px",
            minHeight: "60px",
            maxWidth: "800px",
          }}
        />

        {/* Text overlay positioned in the red-bounded area */}
        <div
          className={`
            absolute inset-0 
            flex items-center justify-center
            px-6 py-2
            ${textClassName}
          `}
          style={{
            // These percentages approximate the red-bounded area from the frame
            left: "10%",
            right: "10%",
            top: "18%",
            bottom: "18%",
          }}
        >
          <span
            className={`
              text-center font-bold text-green-800
              ${getFontSize()}
              leading-tight
              break-words
              hyphens-auto
              max-w-full
            `}
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              lineHeight: "1.2",
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

export default FrameText;
