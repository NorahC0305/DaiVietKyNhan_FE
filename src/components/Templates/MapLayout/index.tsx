"use client";

import { GameFrame } from "@components/Molecules/GameFrame";
import React from "react";

interface MapsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MapsLayoutClient: React.FC<MapsLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <GameFrame className="">
      <div
        className={`absolute w-full top-0 left-0 overflow-hidden -z-1 ${className}`}
      >
        {/* Content */}
        <div className="relative min-h-screen">{children}</div>
      </div>
    </GameFrame>
  );
};

export default MapsLayoutClient;
