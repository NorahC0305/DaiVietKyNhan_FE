import React, { memo } from "react";
import styles from "../index.module.scss";
import RewardDisplay from "../Components/RewardDisplay";
import ProgressBar from "../Components/ProgressBar";
import WeeklyGrid from "../Components/WeeklyGrid";
import CheckinButton from "../Components/CheckinButton";
import BonusInfo from "../Components/BonusInfo";

const MobileLayout: React.FC<ICOMPONENTS.LayoutProps> = memo(
  ({
    weeklyProgress,
    currentProgress,
    currentReward,
    todayChecked,
    onCheckin,
  }) => (
    <div className="block md:hidden">
      <div className="min-h-screen bg-gradient-to-br from-amber-900 to-amber-950">
        <div className="flex flex-col min-h-screen">
          {/* Mobile Header */}
          <header className="bg-gradient-to-r from-red-900 to-red-800 text-white p-4 shadow-lg">
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
          </header>

          {/* Mobile Content */}
          <main className="flex-1 p-4 pb-20">
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

            {/* Mobile Weekly Grid */}
            <div
              className={`bg-white rounded-xl p-4 mb-6 shadow-lg ${styles["mobileCard"]}`}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Tiến độ tuần này
              </h3>
              <WeeklyGrid weeklyProgress={weeklyProgress} />
            </div>

            {/* Mobile Check-in Button */}
            <div
              className={`bg-white rounded-xl p-4 shadow-lg ${styles["mobileCard"]}`}
            >
              <CheckinButton
                checked={todayChecked}
                onCheckin={onCheckin}
                className={styles["mobileButton"]}
              />
              <BonusInfo />
            </div>
          </main>

          {/* Mobile Bottom Hint */}
          <footer className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-3 text-center">
            <div className="text-sm opacity-90">
              💡 Tip: Điểm danh mỗi ngày để nhận thưởng liên tục
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
);

MobileLayout.displayName = "MobileLayout";

export default MobileLayout;
