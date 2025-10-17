"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

type ModalBackdropProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string; // container width classes
  cardClassName?: string; // inner card classes
  showCloseButton?: boolean;
};

export default function ModalBackdrop({
  isOpen,
  onClose,
  children,
  className = "relative mx-3 w-full max-w-3xl",
  cardClassName = "relative w-[700px] bg-primary-light border-4 border-secondary rounded-2xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10",
  showCloseButton = true,
}: ModalBackdropProps) {
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
            className={className}
          >
            <div className={cardClassName}>
              {showCloseButton && (
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
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
