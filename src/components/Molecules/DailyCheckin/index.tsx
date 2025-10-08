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
    <div
      className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-900 to-amber-950 p-4 md:p-8 ${className}`}
    >
      {/* Scroll Background with Image */}
      <div
        className="relative w-full max-w-[1100px] md:w-[1100px]"
        style={{
          backgroundImage: "url('/scroll-vertical.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main Content Area */}
        <div
          className={`relative z-10 p-12 md:p-20 w-full max-w-[900px] ${styles["scroll-texture"]}`}
        >
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-8 relative z-20">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-red-800 mb-2 drop-shadow-md font-serif">
              Sổ Điểm Danh
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-800 mb-2 drop-shadow-sm font-serif">
              Đại Việt Kỳ Nhân
            </h2>
            <p className="text-gray-600 text-xs md:text-sm lg:text-base italic font-serif">
              Ghi nhận công trạng mỗi ngày, ban thưởng xu quý
            </p>
          </div>

          {/* Progress and Reward Display */}
          <div className="flex flex-col md:flex-row items-center bg-gradient-to-b from-yellow-100 to-amber-50 border border-amber-800 rounded-lg p-3 md:p-4 mb-6 md:mb-8 relative z-20">
            <div className="flex-1 text-center mb-2 md:mb-0">
              <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                {currentProgress}/7
              </div>
              <div className="text-gray-600 text-xs">Công nhật tuần này</div>
            </div>
            <div className="w-full md:w-px h-px md:h-12 bg-gray-500 my-2 md:my-0 md:mx-3"></div>
            <div className="flex-1 flex justify-center">
              <div
                className={`relative px-2 md:px-3 py-1 ${styles["reward-frame"]}`}
                style={{
                  backgroundImage: "url('/whote 91.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  minHeight: "50px",
                  minWidth: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-lg md:text-xl font-bold text-gray-800 text-center relative z-10">
                  {getCurrentReward()}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Attendance Tracker */}
          <div className="mb-6 md:mb-8 relative z-20">
            <div className="text-center text-gray-600 mb-2 md:mb-3 text-xs md:text-sm">
              Tiến độ tuần này
            </div>
            <div className="flex gap-2 md:gap-3 justify-center">
              {weeklyProgress.map((day, index) => (
                <div
                  key={day.day}
                  className={`w-[70px] md:w-[80px] bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-800 rounded-lg p-3 md:p-4 text-center min-h-[80px] md:min-h-[100px] flex flex-col justify-between shadow-sm ${
                    day.checked
                      ? "bg-gradient-to-b from-amber-200 to-amber-300"
                      : ""
                  } ${
                    day.isSpecial
                      ? "bg-gradient-to-b from-yellow-100 to-amber-50"
                      : ""
                  }`}
                >
                  <div className="text-sm font-bold text-gray-600 mb-1">
                    {day.day}
                  </div>
                  <div className="flex justify-center items-center my-1">
                    {day.checked ? (
                      <div className="w-6 h-6 md:w-7 md:h-7 bg-red-800 rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 md:w-5 md:h-5 border border-gray-500 rounded-full bg-gray-100"></div>
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
              className="bg-red-800 text-white border-none rounded-lg px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-bold cursor-pointer transition-all duration-300 shadow-lg hover:bg-red-900 hover:-translate-y-0.5 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md mb-2 md:mb-3 w-full md:w-auto"
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
              Điểm danh 7 ngày liên tiếp nhận thưởng 200 za vào ngày Chủ Nhật
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckin;
