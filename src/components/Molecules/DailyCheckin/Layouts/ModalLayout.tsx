import React, { memo, useMemo } from "react";
import { X } from "lucide-react";
import styles from "../index.module.scss";
import RewardDisplay from "../Components/RewardDisplay";
import ProgressBar from "../Components/ProgressBar";
import WeeklyGrid from "../Components/WeeklyGrid";
import CheckinButton from "../Components/CheckinButton";
import BonusInfo from "../Components/BonusInfo";
import { useAttendance } from "@hooks/useAttendance";
import ButtonImage from "@components/Atoms/ButtonImage";
import Image from "next/image";

interface ModalLayoutProps {
  onClose?: () => void;
}

const ModalLayout: React.FC<ModalLayoutProps> = memo(({ onClose }) => {
  // Use attendance hook for API integration
  const {
    attendanceList,
    isLoading,
    isCheckingIn,
    checkIn,
    refetch,
    isTodayCheckedIn,
    getCheckedDates,
  } = useAttendance();

  // Generate weekly progress from attendance data
  const weeklyProgress = useMemo(() => {
    const today = new Date();
    const checkedDates = getCheckedDates();
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    // Get the start of the week (Monday)
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, Monday = 1
    startOfWeek.setDate(today.getDate() - daysToSubtract);

    return days.map((dayName, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      const dateString = date.toISOString().split("T")[0];
      const isChecked = checkedDates.has(dateString);
      const isToday =
        date.toISOString().split("T")[0] === today.toISOString().split("T")[0];

      return {
        day: dateString,
        label: dayName,
        checked: isChecked,
        dayName,
        isSpecial: isToday,
      };
    });
  }, [attendanceList, getCheckedDates]);

  // Calculate current progress (checked days this week)
  const currentProgress = useMemo(() => {
    return weeklyProgress.filter((day) => day.checked).length;
  }, [weeklyProgress]);

  // Get current reward (default reward or from today's attendance)
  const currentReward = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayAttendance = attendanceList.find(
      (item) => new Date(item.date).toISOString().split("T")[0] === today
    );
    return todayAttendance ? todayAttendance.coin : 100; // Default 100 coins
  }, [attendanceList]);

  // Check if today is checked in
  const todayChecked = useMemo(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    return attendanceList.some((item) => {
      let itemDateString: string;

      if (item.date.includes("T")) {
        // ISO string format: "2025-10-21T00:00:00.000Z"
        itemDateString = new Date(item.date).toISOString().split("T")[0];
      } else {
        // Direct date string format
        itemDateString = new Date(item.date).toISOString().split("T")[0];
      }

      return itemDateString === todayString && item.status === "PRESENT";
    });
  }, [attendanceList]);

  // Handle check-in
  const handleCheckIn = async () => {
    try {
      await checkIn();
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  const getButtonText = (): string => {
    if (todayChecked) return "Đã điểm danh";
    if (isCheckingIn) return "Đang điểm danh...";
    return "Điểm danh";
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Mobile Layout (default) - Tối ưu gọn gàng */}
      <div className="block md:hidden">
        {/* Mobile Background - Compact */}
        <div className=" rounded-2xl overflow-hidden relative">
          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-0 z-50 w-8 h-8 bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Mobile Content - Compact */}
          <div className="p-4">
            {/* Progress and Reward Display - Mobile - Compact */}
            <div className="bg-gradient-to-br from-yellow-100 to-amber-50 rounded-xl p-3 mb-4 shadow-lg border border-amber-200">
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
                  <RewardDisplay reward={currentReward} />
                </div>
              </div>

              <ProgressBar current={currentProgress} total={7} />
              <div className="text-xs text-gray-600 text-center mt-2">
                {currentProgress < 7
                  ? `Còn ${7 - currentProgress} ngày để nhận thưởng tuần`
                  : "Đã hoàn thành tuần này!"}
              </div>
            </div>

            {/* Weekly Grid - Mobile - Compact */}
            <div className="bg-white rounded-xl p-3 mb-4 shadow-lg">
              <h3 className="text-base font-bold text-gray-800 mb-3 text-center">
                Tiến độ tuần này
              </h3>
              <WeeklyGrid weeklyProgress={weeklyProgress} variant="mobile" />
            </div>

            {/* Check-in Button - Mobile - Compact */}
            <div className="bg-white rounded-xl p-3 shadow-lg">
              <CheckinButton
                checked={todayChecked}
                onCheckin={handleCheckIn}
                className={styles["mobileButton"]}
                variant="mobile"
                isLoading={isCheckingIn}
              />
              <BonusInfo variant="mobile" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Sử dụng DesktopLayout có sẵn với scroll background */}
      <div className="hidden md:flex justify-center items-center h-full max-h-[85vh] p-2 sm:p-4 md:p-6 lg:p-8">
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
                onClick={handleCheckIn}
                disabled={todayChecked || isCheckingIn}
                classNameText="text-sm font-extrabold hover text-[#A40000]"
                className={`hover:scale-105 transition-all duration-300 ${
                  todayChecked || isCheckingIn
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {getButtonText()}
              </ButtonImage>
              <BonusInfo variant="desktop" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ModalLayout.displayName = "ModalLayout";

export default ModalLayout;
