import React, { memo } from "react";
import { Check } from "lucide-react";

const DayCard: React.FC<ICOMPONENTS.DayCardProps> = memo(({ day, variant }) => {
  // Calculate current week dates based on day index
  const getCurrentWeekDate = (dayIndex: number) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const mondayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert to Monday = 0 format

    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayIndex + dayIndex);

    return {
      dayNumber: monday.getDate(),
      month: `Th${monday.getMonth() + 1}`,
    };
  };

  // Get day index from day string (T2 = 0, T3 = 1, etc.)
  const dayIndexMap: { [key: string]: number } = {
    T2: 0,
    T3: 1,
    T4: 2,
    T5: 3,
    T6: 4,
    T7: 5,
    CN: 6,
  };

  const dayIndex = dayIndexMap[day.day] ?? 0;
  const { dayNumber, month } = getCurrentWeekDate(dayIndex);

  const baseClasses =
    variant === "mobile"
      ? `relative bg-gradient-to-br rounded-full p-0 text-center transition-all duration-300 touch-action-manipulation`
      : `w-[42px] sm:w-[50px] md:w-[58px] lg:w-[66px] bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg p-1.5 sm:p-2 md:p-2.5 text-center flex flex-col justify-between`;

  const statusClasses = day.checked
    ? variant === "mobile"
      ? "from-green-100 to-green-200"
      : "bg-gradient-to-b from-amber-200 to-amber-300"
    : variant === "mobile"
    ? "from-gray-50 to-gray-100"
    : "";

  const specialClasses = day.isSpecial
    ? variant === "mobile"
      ? "from-yellow-100 to-yellow-200"
      : "bg-gradient-to-b from-yellow-100 to-amber-50"
    : "";

  const backdropStyle = {
    backgroundImage: "url('/backdrop-7-ngay.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const heightStyle =
    variant === "mobile"
      ? { height: "200px", minHeight: "200px" }
      : { height: "130px", minHeight: "130px" };

  return (
    <div
      className={`${baseClasses} ${statusClasses} ${specialClasses}`}
      style={{ ...backdropStyle, ...heightStyle }}
      role="gridcell"
      aria-label={`${day.label}, ${
        day.checked ? "completed" : "not completed"
      }`}
    >
      {/* Day name (T2) - top */}
      <div className="text-xs font-bold mb-1">{day.day}</div>

      {/* Day number (20) - middle */}
      <div className="text-lg font-bold mb-1">{dayNumber}</div>

      {/* Month (Th10) - below day number */}
      <div className="text-xs text-gray-600 mb-1">{month}</div>

      {/* Check button - bottom */}
      <div className="flex justify-center">
        {day.checked ? (
          <div
            className={`${
              variant === "mobile"
                ? "w-6 h-6"
                : "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            } bg-red-800 rounded-full flex items-center justify-center`}
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
            } rounded-full bg-white flex items-center justify-center`}
          >
            <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          </div>
        )}
      </div>

      {variant === "mobile" && day.isSpecial && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
      )}

      {/* {variant === "desktop" && (
        <div className="text-xs text-gray-600 leading-tight text-center">
          {day.dayName}
        </div>
      )} */}
    </div>
  );
});

DayCard.displayName = "DayCard";
export default DayCard;
