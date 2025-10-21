import React, { memo } from "react";
import styles from "../index.module.scss";
import RewardDisplay from "../Components/RewardDisplay";
import WeeklyGrid from "../Components/WeeklyGrid";
import CheckinButton from "../Components/CheckinButton";
import BonusInfo from "../Components/BonusInfo";
import Image from "next/image";
import ButtonImage from "@components/Atoms/ButtonImage";

const DesktopLayout: React.FC<ICOMPONENTS.LayoutProps> = memo(
  ({
    weeklyProgress,
    currentProgress,
    currentReward = 100,
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
          className={`relative z-10 border-4 rounded-3xl border-[#8B4513] p-2 sm:p-3 md:p-4 lg:p-6 xl:p-7 w-full max-w-[200px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[480px] xl:max-w-[580px] ${styles["scroll-texture"]}`}
        >
          {/* Header Section */}
          <header className="flex flex-col gap-2 justify-center items-center text-center relative z-20">
            <Image
              src="/big-logo.svg"
              alt="logo"
              width={50}
              height={70}
              className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
            />
            <p className="text-3xl font-extrabold text-[#A40000]">
              ĐIỂM DANH TÍCH XU
            </p>
          </header>

          {/* Progress and Reward Display */}

          <div className="flex-1 flex justify-center">
            <RewardDisplay
              reward={currentReward}
              className={styles["reward-frame"]}
            />
          </div>

          {/* Weekly Attendance Tracker */}
          <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-5 relative z-20">
            <div className="text-center text-gray-600 mb-1 sm:mb-1.5 text-lg font-extrabold sm:text-sm">
              Tiến độ tuần này
            </div>
            <WeeklyGrid weeklyProgress={weeklyProgress} variant="desktop" />
          </div>

          {/* Check-in Button */}
          <div className="text-center relative z-20">
            {/* <CheckinButton
              checked={todayChecked}
              onCheckin={onCheckin}
              variant="desktop"
            /> */}

            <ButtonImage
              width={180}
              height={48}
              onClick={onCheckin}
              disabled={todayChecked}
              classNameText="text-sm font-extrabold hover text-[#A40000]"
              className="hover:scale-105 transition-all duration-300"
            >
              {todayChecked ? "Đã điểm danh" : "Điểm danh"}
            </ButtonImage>
            <BonusInfo variant="desktop" />
          </div>
        </div>
      </div>
    </div>
  )
);

DesktopLayout.displayName = "DesktopLayout";

export default DesktopLayout;
