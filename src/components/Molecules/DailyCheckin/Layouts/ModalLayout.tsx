import React, { memo, useMemo } from "react";
import styles from "../index.module.scss";
import RewardDisplay from "../Components/RewardDisplay";
import WeeklyGrid from "../Components/WeeklyGrid";
import BonusInfo from "../Components/BonusInfo";
import ButtonImage from "@components/Atoms/ButtonImage";
import Image from "next/image";
import { IAttendanceItem } from "@models/attendance/response";

interface AttendanceData {
  attendanceList: IAttendanceItem[];
  isLoading: boolean;
  isCheckingIn: boolean;
  checkIn: () => Promise<any>;
  refetch: () => Promise<void>;
  isTodayCheckedIn: () => boolean;
  getCheckedDates: () => Set<string>;
}

interface ModalLayoutProps {
  onClose?: () => void;
  onCheckinSuccess?: () => void;
  attendanceData: AttendanceData;
}

const ModalLayout: React.FC<ModalLayoutProps> = memo(({ onClose, onCheckinSuccess, attendanceData }) => {
  // Use attendance data from props instead of hook
  const {
    attendanceList,
    isLoading,
    isCheckingIn,
    checkIn,
    refetch,
    isTodayCheckedIn,
    getCheckedDates,
  } = attendanceData;

  // Generate weekly progress from attendance data
  const weeklyProgress = useMemo(() => {
    const today = new Date();
    const checkedDates = getCheckedDates();
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    // Get the start of the week (Sunday) - Tuần bắt đầu từ Chủ Nhật
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay(); // 0 = CN, 1 = T2, ..., 6 = T7
    const daysToSubtract = dayOfWeek; // CN = 0 -> lùi 0 ngày, T2 = 1 -> lùi 1 ngày
    startOfWeek.setDate(today.getDate() - daysToSubtract);

    return days.map((dayName, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      
      // Sử dụng local date string để tránh lỗi múi giờ
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const isChecked = checkedDates.has(dateString);
      
      // So sánh với ngày hôm nay (local time)
      const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const isToday = dateString === todayString;

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
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const todayAttendance = attendanceList.find((item) => {
      let itemDateString: string;
      
      if (item.date.includes("T")) {
        const itemDate = new Date(item.date);
        itemDateString = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      } else {
        const itemDate = new Date(item.date);
        itemDateString = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      }
      
      return itemDateString === todayString;
    });
    
    return todayAttendance ? todayAttendance.coin : 100; // Default 100 coins
  }, [attendanceList]);

  // Check if today is checked in
  const todayChecked = useMemo(() => {
    const today = new Date();
    // Sử dụng local date để tránh lỗi múi giờ
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    return attendanceList.some((item) => {
      let itemDateString: string;

      if (item.date.includes("T")) {
        // ISO string format: "2025-10-21T00:00:00.000Z"
        const itemDate = new Date(item.date);
        itemDateString = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      } else {
        // Direct date string format
        const itemDate = new Date(item.date);
        itemDateString = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}-${String(itemDate.getDate()).padStart(2, '0')}`;
      }

      return itemDateString === todayString && item.status === "PRESENT";
    });
  }, [attendanceList]);

  // Handle check-in
  const handleCheckIn = async () => {
    try {
      await checkIn();
      // Gọi callback khi điểm danh thành công
      if (onCheckinSuccess) {
        onCheckinSuccess();
      }
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
