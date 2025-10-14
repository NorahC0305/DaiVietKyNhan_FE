"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MapsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MapsLayoutClient: React.FC<MapsLayoutProps> = ({
  children,
  className = "",
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Trang map Kỳ Giới.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>


      {/* Content */}
      <div className="relative z-20 min-h-screen">{children}</div>
    </div>
  );
};

export default MapsLayoutClient;
