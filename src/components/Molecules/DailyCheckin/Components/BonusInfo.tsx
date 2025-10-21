import React, { memo } from "react";

const BonusInfo: React.FC<ICOMPONENTS.BonusInfoProps> = memo(
  ({ variant = "mobile", bonusReward = 200 }) => {
    const containerClasses =
      variant === "mobile"
        ? "mt-4 text-center"
        : "text-[#8B4513] text-xs leading-relaxed px-1 italic";

    const textClasses =
      variant === "mobile" ? "text-sm text-[#8B4513] leading-relaxed" : "";

    return (
      <div className={containerClasses}>
        <div className={textClasses}>
          {variant === "mobile" && (
            <>
              <span className="font-extrabold text-[#A40000]">🎁 Bonus:</span>{" "}
            </>
          )}
          Điểm danh 7 ngày liên tiếp nhận thưởng {bonusReward} xu vào ngày Chủ
          Nhật
        </div>
      </div>
    );
  }
);

BonusInfo.displayName = "BonusInfo";

export default BonusInfo;
