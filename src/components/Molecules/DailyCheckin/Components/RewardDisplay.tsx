import React, { memo } from "react";
import Image from "next/image";

const RewardDisplay: React.FC<ICOMPONENTS.RewardDisplayProps> = memo(
  ({ reward, className = "" }) => (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className="relative mx-auto w-[280px] h-[98px] sm:w-[300px] sm:h-[105px] md:w-[340px] md:h-[119px]">
        <Image
          src="/FrameCoin.svg"
          alt="Reward frame"
          fill
          priority
          className="object-contain select-none pointer-events-none"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 340px"
        />
        <div className="absolute inset-0 flex items-center justify-center px-10 sm:px-12 md:px-14">
          <span className="text-amber-700 font-extrabold text-lg sm:text-xl md:text-2xl transform translate-x-5 -translate-y-1.5">
            {reward.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
);

RewardDisplay.displayName = "RewardDisplay";

export default RewardDisplay;
