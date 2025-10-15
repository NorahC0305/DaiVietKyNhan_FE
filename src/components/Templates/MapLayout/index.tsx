"use client";

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
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-teal-900 ${className}`}
    >
      {/* Content */}
      <div className="relative min-h-screen">{children}</div>
    </div>
  );
};

export default MapsLayoutClient;
