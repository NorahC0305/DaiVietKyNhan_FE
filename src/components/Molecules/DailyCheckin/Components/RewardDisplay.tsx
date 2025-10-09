import React, { memo } from "react";

const RewardDisplay: React.FC<ICOMPONENTS.RewardDisplayProps> = memo(
  ({ reward, className = "" }) => (
    <div
      className={`relative px-3 py-2 rounded-lg ${className}`}
      style={{
        backgroundImage: "url('/whote 91.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "40px",
        minWidth: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label={`Reward: ${reward} points`}
    >
      <div className="text-xl font-bold text-yellow-400 relative z-10">
        {reward}
      </div>
    </div>
  )
);

RewardDisplay.displayName = "RewardDisplay";

export default RewardDisplay;
