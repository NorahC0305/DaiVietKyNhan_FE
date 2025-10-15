"use client";

import { useEffect, useState } from "react";

interface VietnameseLoadingProps {
  text?: string;
  className?: string;
}
// nó tục quá nhưng mà tui chưa biết nên làm gì hmu hmu=))))
//cảm ơn vì daden

export default function VietnameseLoading({
  text = "Đang tải dữ liệu",
  className = "",
}: VietnameseLoadingProps) {
  const [dots, setDots] = useState("");
  const questions: string[] = [
    "Ai là vị vua đầu tiên thống nhất đất nước Việt Nam?",
    "Trận Bạch Đằng nổi tiếng diễn ra vào năm nào?",
    "Nhà Trần ba lần đánh bại quân xâm lược nào?",
    "Ai là người lãnh đạo khởi nghĩa Lam Sơn?",
    "Chiến thắng Điện Biên Phủ diễn ra năm nào?",
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fullText = questions[currentQuestionIndex];
    const baseSpeed = 60;
    const typingSpeed = isDeleting ? baseSpeed / 2 : baseSpeed;

    const handleTick = () => {
      setDisplayedText((prev) => {
        if (!isDeleting) {
          const next = fullText.substring(0, prev.length + 1);
          if (next === fullText) {
            setTimeout(() => setIsDeleting(true), 1200);
          }
          return next;
        } else {
          const next = fullText.substring(0, prev.length - 1);
          if (next.length === 0) {
            setIsDeleting(false);
            setCurrentQuestionIndex((idx) => (idx + 1) % questions.length);
          }
          return next;
        }
      });
    };

    const timer = setTimeout(handleTick, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentQuestionIndex, questions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-slate-900 ${className}`}
      style={{
        background: "linear-gradient(to bottom, #0b1022, #0f172a, #000000)",
      }}
    >
      <div className="relative mb-8">
        {/* Bronze drum with traditional patterns */}
        <div className="relative w-40 h-40">
          {/* Main drum body */}
          <div
            className="w-40 h-40 bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-800 rounded-full shadow-2xl border-4 border-yellow-600 relative overflow-hidden animate-spin"
            style={{ animationDuration: "4s" }}
          >
            {/* Concentric circles pattern */}
            <div className="absolute inset-4 border-2 border-yellow-400/60 rounded-full"></div>
            <div className="absolute inset-8 border-2 border-yellow-400/40 rounded-full"></div>
            <div className="absolute inset-12 border-2 border-yellow-400/30 rounded-full"></div>

            {/* Central star pattern */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-yellow-300 rounded-full relative">
                {/* Star rays */}
                <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-yellow-200 transform -translate-x-1/2 -translate-y-2"></div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-yellow-200 transform -translate-x-1/2 translate-y-2"></div>
                <div className="absolute left-0 top-1/2 h-0.5 w-4 bg-yellow-200 transform -translate-y-1/2 -translate-x-2"></div>
                <div className="absolute right-0 top-1/2 h-0.5 w-4 bg-yellow-200 transform -translate-y-1/2 translate-x-2"></div>
              </div>
            </div>

            {/* Traditional geometric patterns around the rim */}
            <div className="absolute top-2 left-1/2 w-2 h-1 bg-yellow-300 transform -translate-x-1/2"></div>
            <div className="absolute bottom-2 left-1/2 w-2 h-1 bg-yellow-300 transform -translate-x-1/2"></div>
            <div className="absolute left-2 top-1/2 h-2 w-1 bg-yellow-300 transform -translate-y-1/2"></div>
            <div className="absolute right-2 top-1/2 h-2 w-1 bg-yellow-300 transform -translate-y-1/2"></div>
          </div>

          {/* Drum stand/legs */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-lg"></div>
        </div>

        <div className="absolute -top-4 -left-4 w-8 h-8 text-red-600 animate-bounce delay-300">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 10.37 9.7 10.17 9.17 10.17S8.13 10.37 7.75 10.75L2.17 16.33L3.58 17.75L9.17 12.17C9.32 12.02 9.53 11.92 9.75 11.92S10.18 12.02 10.33 12.17L15.92 17.75L17.33 16.33L11.75 10.75C12.13 10.37 12.33 9.86 12.33 9.33S12.13 8.29 11.75 7.92L17.33 2.33L21 6V4H23V9H21Z" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-6 w-6 h-6 text-red-500 animate-pulse delay-700">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 10.37 9.7 10.17 9.17 10.17S8.13 10.37 7.75 10.75L2.17 16.33L3.58 17.75L9.17 12.17C9.32 12.02 9.53 11.92 9.75 11.92S10.18 12.02 10.33 12.17L15.92 17.75L17.33 16.33L11.75 10.75C12.13 10.37 12.33 9.86 12.33 9.33S12.13 8.29 11.75 7.92L17.33 2.33L21 6V4H23V9H21Z" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-2 font-sans tracking-wide drop-shadow-[0_2px_8px_rgba(221,172,64,0.35)]">
          Đại Việt Kỳ Nhân
        </h2>
        <p className="text-gray-200 text-base md:text-lg font-medium mb-4">
          {displayedText}
          <span className="inline-block w-0.5 h-5 md:h-6 bg-primary/90 ml-1 align-middle animate-pulse" />
        </p>
        <p className="text-gray-700 text-base">
          {text}
          {dots}
        </p>

        <div className="mt-8 mx-auto w-64 sm:w-80">
          <div className="w-full h-1.5 bg-slate-700/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-center">
            <p className="text-xs font-medium text-primary">{progress}%</p>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-20">
        <div className="w-12 h-8 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-full animate-pulse delay-1000"></div>
        <div className="w-8 h-6 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-full ml-2 -mt-2 animate-pulse delay-1200"></div>
      </div>

      <div className="absolute bottom-20 right-20">
        <div className="w-10 h-6 bg-gradient-to-l from-red-600/30 to-yellow-600/30 rounded-full animate-pulse delay-1500"></div>
        <div className="w-6 h-4 bg-gradient-to-l from-red-600/20 to-yellow-600/20 rounded-full mr-2 -mt-1 animate-pulse delay-1700"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Lotus petals */}
        <div className="absolute top-1/4 left-1/4 w-3 h-6 bg-pink-400/40 rounded-full transform rotate-45 animate-float delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-6 bg-pink-300/40 rounded-full transform -rotate-45 animate-float delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-6 bg-pink-500/40 rounded-full transform rotate-12 animate-float delay-3000"></div>

        {/* Traditional coins */}
        <div
          className="absolute top-1/3 right-1/3 w-4 h-4 border-2 border-yellow-600/50 rounded-full animate-spin delay-2500"
          style={{ animationDuration: "6s" }}
        >
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-600/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
