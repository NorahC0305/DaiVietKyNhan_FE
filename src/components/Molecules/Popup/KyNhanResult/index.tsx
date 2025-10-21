"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
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

  // Use React Portal to render modal at root level
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl my-auto"
          >
            <div className="relative  overflow-y-auto custom-scrollbar-thin md:max-h-lg bg-primary-light border-2 border-[#835D26] rounded-xl p-6 overflow-hidden">
              <div className="flex justify-around items-center">
                {/* Left side - Content */}
                <div className="flex flex-col justify-between w-[50%]">
                  <motion.div
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex items-center justify-center py-8"
                  >
                    <h2
                      className={`font-bold text-secondary leading-relaxed text-center px-4 ${currentStep === 1
                        ? "text-lg"
                        : "text-xl"
                        }`}
                    >
                      {currentStep === 1
                        ? kyNhan.length === 1
                          ? "Bạn đã tìm ra danh tính của vị Kỳ Nhân này. Bạn được cộng 100 điểm."
                          : "Bạn đã tìm ra danh tính của 2 vị Kỳ Nhân này. Bạn được cộng 100 điểm."
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
                      className="space-y-4 mb-6"
                    >
                      <div className="max-h-80 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <p className="text-[#835D26] text-base leading-relaxed break-words">
                          {content}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-3 justify-center items-center pt-6"
                  >
                    {currentStep === 1 ? (
                      <ButtonImage onClick={handleContinue}>Tiếp tục</ButtonImage>
                    ) : (
                      <div className="flex flex-col gap-3 w-full justify-center items-center">
                        <ButtonImage
                          onClick={handleGoToLibrary}
                          classNameText="text-base w-full"
                          className="hover:scale-105 transition-all duration-300 w-auto"
                          width={160}
                          height={45}
                        >
                          Đến Thư Viện
                        </ButtonImage>
                        <ButtonImage
                          onClick={handleContinue}
                          classNameText="text-base"
                          className="hover:scale-105 transition-all duration-300 w-auto"
                          width={160}
                          height={45}
                        >
                          Tiếp tục
                        </ButtonImage>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right side - Images */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center items-center"
                >
                  <div className="flex gap-3 justify-center items-center flex-wrap">
                    {kyNhan.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="relative"
                      >
                        <div className="relative w-[250px] h-96 bg-[#F7E6BB] rounded-lg border border-[#835D26] overflow-hidden">
                          <Image
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt}
                            fill
                            sizes="160px"
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
    </AnimatePresence>,
    document.body
  )
}
