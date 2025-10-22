"use client";

import { createPortal } from "react-dom";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import ButtonImage from "../../../Atoms/ButtonImage";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function IncompleteRegion({
  isOpen,
  onClose,
  message,
}: ICOMPONENTS.CommonModalProps) {

  const router = useRouter();

  const handleGoBack = useCallback(() => {
    // router.back();
    onClose();
  }, [router, onClose]);
  // Use React Portal to render modal at root level
  if (typeof window === "undefined") return null;

  return createPortal(
    <ModalBackdrop isOpen={isOpen} onClose={() => { }} showCloseButton={false}>
      {/* Content */}
      <div className="text-center px-2 sm:px-0">
        <h3 className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
          LƯU Ý
        </h3>

        <p className="mt-3 sm:mt-4 text-secondary text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-extrabold">
          {message || "Kỳ Chủ phải hoàn thành vùng đất hiện tại mới có thể tiếp tục được hành trình sang vùng đất kế tiếp."}
        </p>
      </div>

      <div className="flex justify-center items-cente mt-5">
        <ButtonImage onClick={handleGoBack} classNameText="w-full">Quay lại</ButtonImage>
      </div>
    </ModalBackdrop>,
    document.body
  );
}
