"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import styles from "./index.module.scss";

interface DailyCheckinProps {
  className?: string;
}

interface DayStatus {
  day: string;
  label: string;
  checked: boolean;
  dayName: string;
  isSpecial?: boolean;
}

const DailyCheckin: React.FC<DailyCheckinProps> = ({ className = "" }) => {
  const [currentProgress, setCurrentProgress] = useState(1);
  const [weeklyProgress, setWeeklyProgress] = useState<DayStatus[]>([
    { day: "T2", label: "Thứ 2", checked: true, dayName: "Nhật nhất" },
    { day: "T3", label: "Thứ 3", checked: false, dayName: "Nhật nhị" },
    { day: "T4", label: "Thứ 4", checked: false, dayName: "Nhật tam" },
    { day: "T5", label: "Thứ 5", checked: false, dayName: "Nhật tứ" },
    { day: "T6", label: "Thứ 6", checked: false, dayName: "Nhật ngũ" },
    { day: "T7", label: "Thứ 7", checked: false, dayName: "Nhật lục" },
    {
      day: "CN",
      label: "Chủ Nhật",
      checked: false,
      dayName: "Nhật thất",
      isSpecial: true,
    },
  ]);

  const handleCheckin = () => {
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1; // Convert Sunday (0) to index 6

    if (!weeklyProgress[dayIndex].checked) {
      const newProgress = [...weeklyProgress];
      newProgress[dayIndex].checked = true;
      setWeeklyProgress(newProgress);
      setCurrentProgress((prev) => prev + 1);
    }
  };

  const getCurrentReward = () => {
    const checkedCount = weeklyProgress.filter((day) => day.checked).length;
    return checkedCount * 100;
  };

  return (
    <div className={`${className}`}>
      {/* Mobile Layout - Only show on mobile */}
      <div className="block md:hidden">
        <div className="min-h-screen bg-gradient-to-br from-amber-900 to-amber-950">
          <div className="flex flex-col min-h-screen">
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-4 shadow-lg">
              <div className="text-center">
                <h1 className="text-xl font-bold mb-1 font-serif">
                  Sổ Điểm Danh
                </h1>
                <h2 className="text-lg font-bold mb-1 font-serif">
                  Đại Việt Kỳ Nhân
                </h2>
                <p className="text-red-100 text-sm italic">
                  Ghi nhận công trạng mỗi ngày, ban thưởng xu quý
                </p>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 p-4 pb-20">
              {/* Mobile Progress Card */}
              <div
                className={`bg-gradient-to-br from-yellow-100 to-amber-50 rounded-xl p-4 mb-6 shadow-lg border border-amber-200 ${styles["mobileCard"]}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {currentProgress}/7
                    </div>
                    <div className="text-sm text-gray-600">
                      Công nhật tuần này
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">
                      Thưởng hôm nay
                    </div>
                    <div
                      className={`relative px-3 py-2 rounded-lg ${styles["reward-frame"]}`}
                      style={{
                        backgroundImage: "url('/whote 91.png')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        minHeight: "40px",
                        minWidth: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="text-lg font-bold text-gray-800 relative z-10">
                        {getCurrentReward()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-800 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(currentProgress / 7) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  {currentProgress < 7
                    ? `Còn ${7 - currentProgress} ngày để nhận thưởng tuần`
                    : "Đã hoàn thành tuần này!"}
                </div>
              </div>

              {/* Mobile Weekly Grid */}
              <div
                className={`bg-white rounded-xl p-4 mb-6 shadow-lg ${styles["mobileCard"]}`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  Tiến độ tuần này
                </h3>
                <div
                  className={`grid grid-cols-7 gap-1 ${styles["mobileGrid"]}`}
                >
                  {weeklyProgress.map((day, index) => (
                    <div
                      key={day.day}
                      className={`relative bg-gradient-to-br rounded-full p-0 text-center shadow-sm transition-all duration-300 ${
                        styles["mobileGridItem"]
                      } ${
                        day.checked
                          ? "from-green-100 to-green-200 border-2 border-green-400"
                          : "from-gray-50 to-gray-100 border border-gray-300"
                      } ${
                        day.isSpecial
                          ? "from-yellow-100 to-yellow-200 border-2 border-yellow-400"
                          : ""
                      }`}
                    >
                      <div className="text-xs font-bold mb-1">{day.day}</div>
                      <div className="flex justify-center mb-1">
                        {day.checked ? (
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                            <Check className="w-4 h-4 text-white stroke-[2]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 border border-gray-400 rounded-full bg-gray-200"></div>
                          </div>
                        )}
                      </div>
                      {day.isSpecial && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Check-in Button */}
              <div
                className={`bg-white rounded-xl p-4 shadow-lg ${styles["mobileCard"]}`}
              >
                <button
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                    styles["mobileButton"]
                  } ${
                    weeklyProgress[
                      new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
                    ].checked
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 active:scale-95"
                  }`}
                  onClick={handleCheckin}
                  disabled={
                    weeklyProgress[
                      new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
                    ].checked
                  }
                >
                  {weeklyProgress[
                    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
                  ].checked
                    ? "Đã điểm danh hôm nay"
                    : "Điểm danh hôm nay"}
                </button>

                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-red-600">
                      🎁 Bonus:
                    </span>{" "}
                    Điểm danh 7 ngày liên tiếp nhận thưởng 200 xu vào ngày Chủ
                    Nhật
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Bottom Hint */}
            <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-3 text-center">
              <div className="text-sm opacity-90">
                💡 Tip: Điểm danh mỗi ngày để nhận thưởng liên tục
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original scroll background design */}
      <div className="hidden md:flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-900 to-amber-950 p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Scroll Background with Image */}
        <div
          className="relative w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]"
          style={{
            backgroundImage: "url('/scroll-vertical.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Main Content Area */}
          <div
            className={`relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 w-full max-w-[280px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[900px] ${styles["scroll-texture"]}`}
          >
            {/* Header Section */}
            <div className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 relative z-20">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-red-800 mb-1 sm:mb-2 drop-shadow-md font-serif">
                Sổ Điểm Danh
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-amber-500 mb-1 sm:mb-2 drop-shadow-sm font-serif">
                Đại Việt Kỳ Nhân
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg italic font-serif">
                Ghi nhận công trạng mỗi ngày, ban thưởng xu quý
              </p>
            </div>

            {/* Progress and Reward Display */}
            <div className="flex flex-col sm:flex-row items-center bg-gradient-to-b from-yellow-100 to-amber-50 border border-amber-800 rounded-lg p-1.5 sm:p-2 md:p-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6 relative z-20 max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] mx-auto">
              <div className="flex-1 text-center mb-1.5 sm:mb-0">
                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1">
                  {currentProgress}/7
                </div>
                <div className="text-gray-600 text-xs">Công nhật tuần này</div>
              </div>
              <div className="w-full sm:w-px h-px sm:h-6 md:h-8 bg-gray-500 my-1.5 sm:my-0 sm:mx-1.5 md:mx-2"></div>
              <div className="flex-1 flex justify-center">
                <div
                  className={`relative px-1 sm:px-1.5 md:px-2 py-1 ${styles["reward-frame"]}`}
                  style={{
                    backgroundImage: "url('/whote 91.png')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    minHeight: "32px",
                    minWidth: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="text-xs sm:text-sm md:text-base font-bold text-gray-800 text-center relative z-10">
                    {getCurrentReward()}
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Attendance Tracker */}
            <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 relative z-20">
              <div className="text-center text-gray-600 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                Tiến độ tuần này
              </div>
              <div className="flex gap-0.5 sm:gap-1 md:gap-2 justify-center flex-wrap">
                {weeklyProgress.map((day, index) => (
                  <div
                    key={day.day}
                    className={`w-[42px] sm:w-[50px] md:w-[58px] lg:w-[66px] bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-800 rounded-lg p-1.5 sm:p-2 md:p-2.5 text-center min-h-[50px] sm:min-h-[58px] md:min-h-[66px] lg:min-h-[74px] flex flex-col justify-between shadow-sm ${
                      day.checked
                        ? "bg-gradient-to-b from-amber-200 to-amber-300"
                        : ""
                    } ${
                      day.isSpecial
                        ? "bg-gradient-to-b from-yellow-100 to-amber-50"
                        : ""
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold text-gray-600 mb-0.5">
                      {day.day}
                    </div>
                    <div className="flex justify-center items-center my-0.5">
                      {day.checked ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-800 rounded-full flex items-center justify-center shadow-md">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border border-gray-500 rounded-full bg-gray-100"></div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 leading-tight text-center">
                      {day.dayName}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-in Button */}
            <div className="text-center relative z-20">
              <button
                className="bg-red-800 text-white border-none rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-bold cursor-pointer transition-all duration-300 shadow-lg hover:bg-red-900 hover:-translate-y-0.5 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md mb-2 sm:mb-2 md:mb-3 w-full sm:w-auto"
                onClick={handleCheckin}
                disabled={
                  weeklyProgress[
                    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
                  ].checked
                }
              >
                Điểm danh hôm nay
              </button>
              <div className="text-gray-600 text-xs leading-relaxed px-1 italic font-serif">
                Điểm danh 7 ngày liên tiếp nhận thưởng 200 xu vào ngày Chủ Nhật
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckin;
