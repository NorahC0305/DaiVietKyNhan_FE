"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import MobileLayout from "./Layouts/MobileLayout";
import DesktopLayout from "./Layouts/DesktopLayout";
import ModalLayout from "./Layouts/ModalLayout";
import ModalWrapper from "./Components/ModalWrapper";

// Constants moved outside component to prevent recreation
const WEEKLY_DAYS: Omit<ICOMPONENTS.DayStatus, "checked">[] = [
  { day: "T2", label: "Thứ 2", dayName: "Nhật nhất" },
  { day: "T3", label: "Thứ 3", dayName: "Nhật nhị" },
  { day: "T4", label: "Thứ 4", dayName: "Nhật tam" },
  { day: "T5", label: "Thứ 5", dayName: "Nhật tứ" },
  { day: "T6", label: "Thứ 6", dayName: "Nhật ngũ" },
  { day: "T7", label: "Thứ 7", dayName: "Nhật lục" },
  { day: "CN", label: "Chủ Nhật", dayName: "Nhật thất", isSpecial: true },
];

const REWARD_PER_DAY = 100;
const BONUS_REWARD = 200;

const DailyCheckin: React.FC<ICOMPONENTS.DailyCheckinProps> = memo(
  ({ className = "", isModal = false, isOpen = true, onClose }) => {
    // Initialize with today's day checked
    const todayIndex = useMemo(() => {
      const today = new Date().getDay();
      return today === 0 ? 6 : today - 1;
    }, []);

    const [weeklyProgress, setWeeklyProgress] = useState<
      ICOMPONENTS.DayStatus[]
    >(() =>
      WEEKLY_DAYS.map((day, index) => ({
        ...day,
        checked: index === todayIndex,
      }))
    );

    // Memoized values
    const currentProgress = useMemo(
      () => weeklyProgress.filter((day) => day.checked).length,
      [weeklyProgress]
    );

    const currentReward = useMemo(
      () => currentProgress * REWARD_PER_DAY,
      [currentProgress]
    );

    const todayChecked = useMemo(
      () => weeklyProgress[todayIndex].checked,
      [weeklyProgress, todayIndex]
    );

    const handleCheckin = useCallback(() => {
      if (!todayChecked) {
        setWeeklyProgress((prev) => {
          const newProgress = [...prev];
          newProgress[todayIndex].checked = true;
          return newProgress;
        });
      }
    }, [todayChecked, todayIndex]);

    // Common layout props
    const layoutProps = {
      weeklyProgress,
      currentProgress,
      currentReward,
      todayChecked,
      onCheckin: handleCheckin,
    };

    // If modal mode, wrap with ModalWrapper
    if (isModal) {
      return (
        <ModalWrapper
          isOpen={isOpen}
          onClose={onClose || (() => {})}
          className={className}
        >
          <ModalLayout {...layoutProps} onClose={onClose} />
        </ModalWrapper>
      );
    }

    // Original full-screen layout
    return (
      <div className={className}>
        <MobileLayout {...layoutProps} />
        <DesktopLayout {...layoutProps} />
      </div>
    );
  }
);

export default DailyCheckin;
