import React, { memo } from "react";
import styles from "../index.module.scss";
import DayCard from "./DayCard";


const WeeklyGrid: React.FC<ICOMPONENTS.WeeklyGridProps> = memo(
  ({ weeklyProgress, variant = "mobile" }) => {
    const gridClasses =
      variant === "mobile"
        ? `grid grid-cols-7 gap-1 ${styles["mobileGrid"]}`
        : "flex gap-0.5 sm:gap-1 md:gap-2 justify-center flex-wrap";

    return (
      <div className={gridClasses} role="grid" aria-label="Weekly progress">
        {weeklyProgress.map((day) => (
          <DayCard key={day.day} day={day} variant={variant} />
        ))}
      </div>
    );
  }
);

WeeklyGrid.displayName = "WeeklyGrid";

export default WeeklyGrid;
