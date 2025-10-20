"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import ButtonImage from "@components/Atoms/ButtonImage"

export interface KyNhan {
  id: number
  src: string
  alt: string
  name: string
}

export interface KyNhanResultProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  points?: number
  kyNhan: KyNhan[]
  onContinue?: () => void
  onGoToLibrary?: () => void
  onFinalContinue?: () => void
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
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
      onContinue?.()
    } else {
      onFinalContinue?.()
      handleClose()
    }
  }

  const handleGoToLibrary = () => {
    onGoToLibrary?.()
    handleClose()
  }

  const handleClose = () => {
    setCurrentStep(1)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
          >
            <div className="relative bg-primary-light border-2 border-[#835D26] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 h-full">
                {/* Left side - Content */}
                <div className="flex-1 overflow-hidden min-w-0 flex flex-col justify-between h-full">
                  <motion.div
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex items-end justify-center pb-6 sm:pb-8 md:pb-10 lg:pb-12"
                  >
                    <h2
                      className={`font-bold text-secondary leading-relaxed text-center px-2 sm:px-3 md:px-4 ${
                        currentStep === 1
                          ? "text-base sm:text-lg md:text-xl lg:text-2xl"
                          : "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                      }`}
                    >
                      {currentStep === 1
                        ? title
                        : kyNhan.length === 1
                          ? "BẠN ĐÃ THÀNH CÔNG THU THẬP ĐƯỢC KỲ ẤN CỦA KỲ NHÂN NÀY."
                          : "BẠN ĐÃ THÀNH CÔNG THU THẬP ĐƯỢC KỲ ẤN CỦA 2 KỲ NHÂN NÀY."}
                    </h2>
                  </motion.div>

                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="max-h-24 sm:max-h-32 md:max-h-48 lg:max-h-64 xl:max-h-80 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <p className="text-[#835D26] text-xs sm:text-sm md:text-base lg:text-base leading-relaxed break-words overflow-hidden w-full">
                          {content}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2 sm:space-y-3 flex justify-center items-center mt-auto py-3 sm:py-4"
                  >
                    {currentStep === 1 ? (
                      <ButtonImage onClick={handleContinue}>Tiếp tục</ButtonImage>
                    ) : (
                      <div className="space-y-2 sm:space-y-3 flex justify-center items-center gap-2 sm:gap-3 flex-col">
                        <ButtonImage
                          onClick={handleGoToLibrary}
                          classNameText="text-base sm:text-lg md:text-xl"
                          className="hover:scale-105 transition-all duration-300"
                          width={180}
                          height={50}
                        >
                          Đến Thư Viện
                        </ButtonImage>
                        <ButtonImage
                          onClick={handleContinue}
                          classNameText="text-base sm:text-lg md:text-xl"
                          className="hover:scale-105 transition-all duration-300"
                          width={180}
                          height={50}
                        >
                          Tiếp tục
                        </ButtonImage>
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center items-center w-full lg:w-auto"
                >
                  <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-4 justify-center items-center flex-wrap lg:flex-nowrap">
                    {kyNhan.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="relative"
                      >
                        <div className="relative w-32 h-40 sm:w-40 sm:h-56 md:w-44 md:h-64 lg:w-48 lg:h-72 xl:w-56 xl:h-80 2xl:w-64 2xl:h-96 bg-[#F7E6BB] rounded-lg border border-[#835D26] overflow-hidden">
                          <Image
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 176px, (max-width: 1280px) 192px, (max-width: 1536px) 224px, 256px"
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
  )
}
