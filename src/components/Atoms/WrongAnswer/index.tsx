"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type WrongAnswerProps = {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  onUseCoins?: () => void;
  coinCost?: number; // default 500
  penaltyPoints?: number; // default 20
};

export default function WrongAnswer({
  isOpen,
  onClose,
  onRetry,
  onUseCoins,
  coinCost = 500,
  penaltyPoints = 20,
}: WrongAnswerProps) {
  const handleRetry = () => {
    onRetry?.();
    onClose();
  };

  const handleUseCoins = () => {
    onUseCoins?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative mx-3 w-full max-w-3xl"
          >
            {/* Card */}
            <div className="relative bg-primary-light border-4 border-secondary rounded-2xl p-4 sm:p-6 md:p-8">
              {/* Content */}
              <div className="text-center">
                <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
                  Đây chưa phải là danh tính của vị Kỵ Nhân này. Bạn bị trừ
                  {penaltyPoints} điểm. Bạn có muốn sử dụng {coinCost} xu để
                  vượt qua thử thách này không?
                </p>
                <button
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 cursor-pointer p-1 sm:p-2"
                  onClick={onClose}
                  aria-label="Đóng"
                >
                  <span className="block relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    <Image
                      src="/X.svg"
                      alt="Đóng"
                      fill
                      sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                </button>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
                {/* Use coins */}
                <button
                  onClick={handleUseCoins}
                  className="relative cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <span className="text-secondary text-lg sm:text-xl font-semibold">
                    -{coinCost}
                  </span>
                  <Image
                    src="/DVKN coin.svg"
                    alt="coin"
                    width={28}
                    height={28}
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />
                </button>

                {/* Retry */}
                <button
                  onClick={handleRetry}
                  className="relative overflow-hidden cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl text-[#6B4B1E] font-semibold text-lg"
                >
                  <Image
                    src="/Button.svg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 180px, 220px"
                    className="object-cover pointer-events-none"
                    priority
                  />
                  <span className="relative z-10">Trả lời lại</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
