import React, { memo } from "react";
import styles from "../index.module.scss";
import RewardDisplay from "../Components/RewardDisplay";
import WeeklyGrid from "../Components/WeeklyGrid";
import CheckinButton from "../Components/CheckinButton";
import BonusInfo from "../Components/BonusInfo";

const DesktopLayout: React.FC<ICOMPONENTS.LayoutProps> = memo(
  ({
    weeklyProgress,
    currentProgress,
    currentReward,
    todayChecked,
    onCheckin,
  }) => (
    <div className="hidden md:flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-900 to-amber-950 p-2 sm:p-4 md:p-6 lg:p-8">
      <div
        className="relative w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]"
        style={{
          backgroundImage: "url('/scroll-vertical.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className={`relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 w-full max-w-[280px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[900px] ${styles["scroll-texture"]}`}
        >
          {/* Header Section */}
          <header className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 relative z-20">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-red-800 mb-1 sm:mb-2 drop-shadow-md font-serif">
              Sổ Điểm Danh
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-amber-500 mb-1 sm:mb-2 drop-shadow-sm font-serif">
              Đại Việt Kỳ Nhân
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg italic font-serif">
              Ghi nhận công trạng mỗi ngày, ban thưởng xu quý
            </p>
          </header>

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
              <RewardDisplay
                reward={currentReward}
                className={styles["reward-frame"]}
              />
            </div>
          </div>

          {/* Weekly Attendance Tracker */}
          <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 relative z-20">
            <div className="text-center text-gray-600 mb-1.5 sm:mb-2 text-xs sm:text-sm">
              Tiến độ tuần này
            </div>
            <WeeklyGrid weeklyProgress={weeklyProgress} variant="desktop" />
          </div>

          {/* Check-in Button */}
          <div className="text-center relative z-20">
            <CheckinButton
              checked={todayChecked}
              onCheckin={onCheckin}
              variant="desktop"
            />
            <BonusInfo variant="desktop" />
          </div>
        </div>
      </div>
    </div>
  )
);

DesktopLayout.displayName = "DesktopLayout";

export default DesktopLayout;
