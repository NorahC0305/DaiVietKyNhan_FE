"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ButtonImage from "@components/Atoms/ButtonImage";

export interface KyNhan {
  id: number;
  src: string;
  alt: string;
  name: string;
}

export interface KyNhanResultProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // Tiêu đề như "Bạn đã tìm ra danh tính của 2 vị Kỳ Nhân này..."
  content: string; // Nội dung text mô tả về kỳ nhân
  points?: number; // Số điểm được cộng
  kyNhan: KyNhan[]; // Mảng 1 hoặc 2 ảnh kỳ nhân
  onContinue?: () => void; // Callback khi bấm "Tiếp tục" ở modal đầu
  onGoToLibrary?: () => void; // Callback khi bấm "Đến Thư Viện"
  onFinalContinue?: () => void; // Callback khi bấm "Tiếp tục" ở modal thứ 2
}

export default function KyNhanResult({
  isOpen,
  onClose,
  title,
  content,
  points,
  kyNhan,
  onContinue,
  onGoToLibrary,
  onFinalContinue,
}: KyNhanResultProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      onContinue?.();
    } else {
      onFinalContinue?.();
      handleClose();
    }
  };

  const handleGoToLibrary = () => {
    onGoToLibrary?.();
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative mx-2 sm:mx-3 w-full max-w-4xl sm:max-w-5xl"
          >
            <div className="relative bg-primary-light border-2 border-[#835D26] rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden min-h-[500px]">
              <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 lg:gap-8 h-full">
                {/* Left side - Content */}
                <div className="flex-1 overflow-hidden min-w-0 flex flex-col justify-between h-full">
                  {/* Title */}
                  <motion.div
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex items-end justify-center pb-12"
                  >
                    <h2
                      className={`font-bold text-secondary leading-relaxed text-center px-4 ${
                        currentStep === 1
                          ? "text-lg md:text-xl"
                          : "text-xl md:text-2xl lg:text-3xl"
                      }`}
                    >
                      {currentStep === 1
                        ? title
                        : kyNhan.length === 1
                        ? "BẠN ĐÃ THÀNH CÔNG THU THẬP ĐƯỢC KỲ ẤN CỦA KỲ NHÂN NÀY."
                        : "BẠN ĐÃ THÀNH CÔNG THU THẬP ĐƯỢC KỲ ẤN CỦA 2 KỲ NHÂN NÀY."}
                    </h2>
                  </motion.div>

                  {/* Content */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="max-h-32 md:max-h-80 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <p className="text-[#835D26] text-sm md:text-base leading-relaxed break-words overflow-hidden w-full">
                          {content}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4 flex justify-center items-center mt-auto py-4"
                  >
                    {currentStep === 1 ? (
                      <ButtonImage onClick={handleContinue}>
                        Tiếp tục
                      </ButtonImage>
                    ) : (
                      <div className="space-y-3 flex justify-center items-center gap-4 flex-col sm:flex-col">
                        <ButtonImage
                          onClick={handleGoToLibrary}
                          classNameText="text-xl"
                          className="hover:scale-105 transition-all duration-300"
                          width={220}
                          height={60}
                        >
                          Đến Thư Viện
                        </ButtonImage>
                        <ButtonImage
                          onClick={handleContinue}
                          classNameText="text-xl"
                          className="hover:scale-105 transition-all duration-300"
                          width={220}
                          height={60}
                        >
                          Tiếp tục
                        </ButtonImage>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right side - Character images */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center items-center"
                >
                  <div className="flex gap-4 justify-center items-center">
                    {kyNhan.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="relative"
                      >
                        {/* Image container */}
                        <div className="relative w-full h-64 md:w-48 md:h-96 bg-[#F7E6BB] rounded-lg border border-[#835D26] overflow-hidden">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 144px, 192px"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
