"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { GameFrame } from "@components/Molecules/GameFrame";

export default function QuestionModal({
  question,
  isOpen,
  onClose,
  onSubmit,
}: ICOMPONENTS.QuestionModalProps) {
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = () => {
    if (question) {
      onSubmit(answerText.trim());
    }
  };

  const handleClose = () => {
    setAnswerText("");
    onClose();
  };

  if (!question) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Trung bình";
      case "hard":
        return "Khó";
      default:
        return difficulty;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal with parchment background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl sm:max-w-5xl mx-2 sm:mx-4"
          >
            {/* Parchment frame container */}
            <div className="relative w-full overflow-hidden">
              {/* Maintain 16:9 aspect ratio and render frame image */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/frame1.png"
                  alt="Khung giấy"
                  fill
                  priority
                  sizes="(max-width: 768px) 95vw, (max-width: 1280px) 100vw, 1280px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Content overlay INSIDE a safe area (debug border visible) */}
              <div
                className="absolute flex flex-col items-center justify-between py-2 sm:py-4"
                style={{
                  top: "12%",
                  right: "8%",
                  bottom: "15%",
                  left: "8%",
                }}
              >
                {/* Debug border for the safe content region */}
                <div className="absolute inset-0 border-2 border-rose-500/70 pointer-events-none rounded-sm" />

                <div className="w-full max-w-3xl mx-auto text-center space-y-2 sm:space-y-4 overflow-y-auto px-2 sm:px-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#835D26] font-bd-street-sign leading-tight">
                    CÂU HỎI
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mx-auto max-w-full sm:max-w-2xl md:max-w-3xl px-1">
                    {question.content}
                  </p>
                </div>

                {/* Answer area using InputAnswer.png */}
                <div className="w-full flex flex-col items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
                  <div className="relative w-[min(320px,70%)] sm:w-[min(420px,50%)] md:w-[min(420px,45%)]">
                    {/* Height approximates the visual input area on the image */}
                    <div className="relative aspect-[26/9] w-full">
                      <Image
                        src="/InputAnswer.png"
                        alt="Khung nhập đáp án"
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, 640px"
                        style={{ objectFit: "contain" }}
                      />
                      <input
                        className="absolute inset-[18%] w-[64%] h-[50%] bg-transparent text-gray-800 outline-none text-base sm:text-lg md:text-xl lg:text-2xl placeholder:text-gray-500"
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Nhập đáp án..."
                      />
                      {/* Debug border for input region */}
                      {/* <div className="absolute inset-[22%] w-[56%] h-[40%] border-2 border-blue-500/70 pointer-events-none rounded-sm" /> */}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={!answerText.trim()}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 cursor-pointer bg-[#835D26] text-white rounded-lg font-medium hover:bg-[#835D26]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
