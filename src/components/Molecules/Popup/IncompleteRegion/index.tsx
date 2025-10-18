"use client";

import ModalBackdrop from "../../../Atoms/ModalBackdrop";

export default function IncompleteRegion({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center px-2 sm:px-0">
        <h3 className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
          LƯU Ý
        </h3>

        <p className="mt-3 sm:mt-4 text-secondary text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-extrabold">
          Kỳ Chủ phải hoàn thành vùng đất hiện tại mới có thể tiếp tục được hành trình sang vùng đất kế tiếp.
        </p>
      </div>
    </ModalBackdrop>
  );
}
