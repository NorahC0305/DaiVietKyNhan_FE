"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LaunchProgressBarProps {
  releaseDate: Date;
  startDate: Date;
}

const LaunchProgressBar: React.FC<LaunchProgressBarProps> = ({
  releaseDate,
  startDate,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = releaseDate.getTime() - startDate.getTime();
    if (totalDuration <= 0) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startDate.getTime();
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseDate, startDate]);

  return (
    <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-green-400 to-teal-500 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default LaunchProgressBar;
