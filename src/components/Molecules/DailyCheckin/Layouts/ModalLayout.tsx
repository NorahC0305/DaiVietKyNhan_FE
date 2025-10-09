import React, { memo } from "react";
import { X } from "lucide-react";
import styles from "../index.module.scss";
import RewardDisplay from "../Components/RewardDisplay";
import ProgressBar from "../Components/ProgressBar";
import WeeklyGrid from "../Components/WeeklyGrid";
import CheckinButton from "../Components/CheckinButton";
import BonusInfo from "../Components/BonusInfo";

const ModalLayout: React.FC<
  ICOMPONENTS.LayoutProps & { onClose?: () => void }
> = memo(
  ({
    weeklyProgress,
    currentProgress,
    currentReward,
    todayChecked,
    onCheckin,
    onClose,
  }) => (
    <div className="p-4 sm:p-6">
      {/* Mobile Layout (default) - Tối ưu gọn gàng */}
      <div className="block md:hidden">
        {/* Mobile Background - Compact */}
        <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-2xl overflow-hidden relative">
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
                onCheckin={onCheckin}
                className={styles["mobileButton"]}
                variant="mobile"
              />
              <BonusInfo variant="mobile" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Sử dụng DesktopLayout có sẵn với scroll background */}
      <div className="hidden md:block">
        <div className="relative w-full max-w-[800px] mx-auto">
          {/* Scroll Background với Image - Phóng to hơn nữa để phù hợp với nền lớn hơn */}
          <div
            className="relative w-full"
            style={{
              backgroundImage: "url('/scroll-vertical.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "700px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Nút đóng modal trên ảnh nền scroll */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute cursor-pointer top-16 right-24 w-8 h-8 bg-black bg-opacity-30 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-50 transition-all duration-200 z-50"
                aria-label="Close modal"
                style={{ pointerEvents: "auto" }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}
            {/* Main Content Area - Tăng kích thước để phù hợp với ảnh nền lớn hơn */}
            <div
              className={`relative z-10 p-8 sm:p-10 w-full max-w-[600px] ${styles["scroll-texture"]}`}
            >
              {/* Header Section - Tăng kích thước font để phù hợp với ảnh nền lớn hơn */}
              <div className="text-center mb-6 sm:mb-8 relative z-20">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-800 mb-2 sm:mb-3 drop-shadow-md font-serif">
                  Sổ Điểm Danh
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-500 mb-2 sm:mb-3 drop-shadow-sm font-serif">
                  Đại Việt Kỳ Nhân
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg italic font-serif">
                  Ghi nhận công trạng mỗi ngày, ban thưởng xu quý
                </p>
              </div>

              {/* Progress and Reward Display */}
              <div className="flex flex-col sm:flex-row items-center bg-gradient-to-b from-yellow-100 to-amber-50 border border-amber-800 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 relative z-20 max-w-[510px] mx-auto">
                <div className="flex-1 text-center mb-1.5 sm:mb-0 px-2 sm:px-3">
                  <div className="text-base sm:text-xl font-extrabold text-red-500 mb-1">
                    {currentProgress}/7
                  </div>
                  <div className="text-gray-600 text-xs">
                    Công nhật tuần này
                  </div>
                </div>
                <div className="w-full sm:w-px h-px sm:h-6 bg-gray-500 my-1.5 sm:my-0 sm:mx-1.5"></div>
                <div className="flex-1 flex justify-center px-2 sm:px-3">
                  <RewardDisplay
                    reward={currentReward}
                    className={styles["reward-frame"]}
                  />
                </div>
              </div>

              {/* Weekly Attendance Tracker */}
              <div className="mb-3 sm:mb-4 relative z-20">
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
      </div>
    </div>
  )
);

ModalLayout.displayName = "ModalLayout";

export default ModalLayout;
