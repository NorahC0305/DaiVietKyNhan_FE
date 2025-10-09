import React, { memo } from "react";

const BonusInfo: React.FC<ICOMPONENTS.BonusInfoProps> = memo(
  ({ variant = "mobile", bonusReward = 200 }) => {
    const containerClasses =
      variant === "mobile"
        ? "mt-4 text-center"
        : "text-gray-600 text-xs leading-relaxed px-1 italic font-serif";

    const textClasses =
      variant === "mobile" ? "text-sm text-gray-600 leading-relaxed" : "";

    return (
      <div className={containerClasses}>
        <div className={textClasses}>
          {variant === "mobile" && (
            <>
              <span className="font-semibold text-red-600">🎁 Bonus:</span>{" "}
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
