import React, { memo } from "react";
import { Check } from "lucide-react";
import styles from "../index.module.scss";

const DayCard: React.FC<ICOMPONENTS.DayCardProps> = memo(({ day, variant }) => {
  const baseClasses =
    variant === "mobile"
      ? `relative bg-gradient-to-br rounded-full p-0 text-center shadow-sm transition-all duration-300 ${styles["mobileGridItem"]}`
      : `w-[42px] sm:w-[50px] md:w-[58px] lg:w-[66px] bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-800 rounded-lg p-1.5 sm:p-2 md:p-2.5 text-center min-h-[50px] sm:min-h-[58px] md:min-h-[66px] lg:min-h-[74px] flex flex-col justify-between shadow-sm`;

  const statusClasses = day.checked
    ? variant === "mobile"
      ? "from-green-100 to-green-200 border-2 border-green-400"
      : "bg-gradient-to-b from-amber-200 to-amber-300"
    : variant === "mobile"
    ? "from-gray-50 to-gray-100 border border-gray-300"
    : "";

  const specialClasses = day.isSpecial
    ? variant === "mobile"
      ? "from-yellow-100 to-yellow-200 border-2 border-yellow-400"
      : "bg-gradient-to-b from-yellow-100 to-amber-50"
    : "";

  return (
    <div
      className={`${baseClasses} ${statusClasses} ${specialClasses}`}
      role="gridcell"
      aria-label={`${day.label}, ${
        day.checked ? "completed" : "not completed"
      }`}
    >
      <div className="text-xs font-bold mb-1">{day.day}</div>
      <div className="flex justify-center mb-1">
        {day.checked ? (
          <div
            className={`${
              variant === "mobile"
                ? "w-6 h-6"
                : "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            } bg-red-800 rounded-full flex items-center justify-center shadow-md`}
          >
            <Check
              className={`${
                variant === "mobile"
                  ? "w-4 h-4"
                  : "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
              } text-white stroke-[3]`}
            />
          </div>
        ) : (
          <div
            className={`${
              variant === "mobile"
                ? "w-6 h-6"
                : "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
            } border border-gray-400 rounded-full bg-white flex items-center justify-center`}
          >
            <div className="w-2 h-2 border border-gray-400 rounded-full bg-gray-200"></div>
          </div>
        )}
      </div>
      {variant === "mobile" && day.isSpecial && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
      )}
      {variant === "desktop" && (
        <div className="text-xs text-gray-600 leading-tight text-center">
          {day.dayName}
        </div>
      )}
    </div>
  );
});

DayCard.displayName = "DayCard";
export default DayCard;