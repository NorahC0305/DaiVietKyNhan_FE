import React, { memo } from "react";

const ProgressBar: React.FC<ICOMPONENTS.ProgressBarProps> = memo(
  ({ current, total, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-3 mb-2 ${className}`}>
      <div
        className="bg-gradient-to-r from-red-600 to-red-800 h-3 rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Progress: ${current} of ${total} days completed`}
      />
    </div>
  )
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
