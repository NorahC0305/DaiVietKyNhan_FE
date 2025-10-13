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
          src="/background web 1.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 right-4 z-30 hover:scale-110 transition-transform duration-200"
      >
        <Image
          src="/Trở lại trang trước.svg"
          alt="Trở lại trang trước"
          width={40}
          height={40}
          className="object-contain cursor-pointer"
        />
      </button>

      {/* Content */}
      <div className="relative z-20 min-h-screen">{children}</div>
    </div>
  );
};

export default MapsLayoutClient;
