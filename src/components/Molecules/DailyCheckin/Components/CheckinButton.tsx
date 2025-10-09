import React, { memo } from "react";

const CheckinButton: React.FC<ICOMPONENTS.CheckinButtonProps> = memo(
  ({ checked, onCheckin, className = "", variant = "mobile" }) => {
    const baseClasses =
      variant === "mobile"
        ? `w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${className}`
        : "bg-red-800 text-white border-none rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-bold cursor-pointer transition-all duration-300 shadow-lg hover:bg-red-900 hover:-translate-y-0.5 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md mb-2 sm:mb-2 md:mb-3 w-full sm:w-auto";

    const statusClasses = checked
      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
      : "bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 active:scale-95";

    return (
      <button
        className={`${baseClasses} ${statusClasses}`}
        onClick={onCheckin}
        disabled={checked}
        aria-label={checked ? "Already checked in today" : "Check in for today"}
      >
        {checked ? "Đã điểm danh hôm nay" : "Điểm danh hôm nay"}
      </button>
    );
  }
);

CheckinButton.displayName = "CheckinButton";

export default CheckinButton;
