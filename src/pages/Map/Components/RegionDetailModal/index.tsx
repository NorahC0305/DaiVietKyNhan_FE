"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";


export default function RegionDetailModal({
  isOpen,
  onClose,
  region,
}: ICOMPONENTS.RegionDetailModalProps) {
  // Keyboard support - ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!region) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-400">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-amber-600 to-yellow-600 p-6">
                <h2 className="text-3xl font-bold text-white text-center">
                  {region.name}
                </h2>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Image */}
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={region.imageSrc}
                        alt={region.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <p className="text-amber-900 text-lg leading-relaxed">
                      {region.description ||
                        `Khám phá vùng đất ${region.name} với những điều kỳ diệu đang chờ đợi bạn. Đây là nơi lưu giữ những câu chuyện huyền thoại và bí ẩn của vùng đất Kỳ Giới.`}
                    </p>

                    {/* Action Button */}
                    <motion.button
                      className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold rounded-full shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log(`Navigating to ${region.name}`);
                        // Thêm logic navigate ở đây
                      }}
                    >
                      Khám Phá Ngay
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

