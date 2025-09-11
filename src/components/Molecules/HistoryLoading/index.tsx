"use client";
import React, { useState, useEffect, useMemo } from "react";

const VietnameseHistoryLoading = () => {
  const [currentText, setCurrentText] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingTexts = [
    "Đang tải lịch sử dân tộc",
    "Khám phá di sản văn hóa",
    "Truy cập cổ thư sử liệu",
    "Mở ra trang sử vàng son",
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        fontSize: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
      })),
    []
  );

  const lineWidths = useMemo(
    () => Array.from({ length: 5 }).map(() => Math.random() * 60 + 30),
    []
  );

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black flex items-center justify-center p-8 overflow-hidden font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-primary rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-primary rotate-12"></div>
      </div>

      {/* Main loading container */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Main title with Vietnamese historical style */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-wide drop-shadow-[0_2px_8px_rgba(221,172,64,0.35)] mb-3">
            LỊCH SỬ
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary/90 tracking-widest">
            VIỆT NAM
          </h2>
          <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>

        {/* Scroll/paper animation */}
        <div className="relative mb-8">
          <div className="w-80 h-40 mx-auto bg-gradient-to-b from-slate-100/10 to-slate-50/5 rounded-lg shadow-2xl border-4 border-primary relative overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-40"></div>

            {/* Animated writing lines */}
            <div className="absolute inset-4 space-y-3">
              {lineWidths.map((width, i) => (
                <div key={i} className="relative">
                  <div
                    className="h-1 bg-gradient-to-r from-primary to-transparent rounded animate-pulse will-change-transform will-change-opacity"
                    style={{
                      width: `${width}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-ping will-change-transform will-change-opacity"
                  style={{
                    left: `${(i * 87) % 100}%`,
                    top: `${(i * 53) % 100}%`,
                    animationDelay: `${(i * 0.23) % 2}s`,
                    animationDuration: `${2 + (i % 4) * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="mb-8">
          <p className="text-2xl md:text-3xl text-gray-200 font-medium tracking-wide">
            {loadingTexts[currentText]}
            <span className="inline-block w-12 text-left">
              {".".repeat(dotCount)}
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mb-6">
          <div className="w-full bg-slate-700/70 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs font-medium text-primary">
              {progress}%
            </span>
          </div>
        </div>

        {/* Spinning traditional symbol */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Traditional Vietnamese ornament */}
        <div className="mt-8">
          <div className="flex justify-center items-center space-x-4 text-primary">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-current"></div>
            <div className="w-3 h-3 bg-current rotate-45"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-current to-transparent"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-gray-300 text-lg tracking-wider opacity-75">
          Khám phá di sản văn hóa ngàn năm
        </p>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none text-primary">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute opacity-20 will-change-transform will-change-opacity"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              fontSize: `${p.fontSize}px`,
              animation: `floatY ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          >
            ✦
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.7;
          }
          50% {
            transform: translate3d(0, -10px, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VietnameseHistoryLoading;
