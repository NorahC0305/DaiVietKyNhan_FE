"use client";

import ModalBackdrop from "../../../Atoms/ModalBackdrop";

export default function IncompleteRegion({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <h3 className="text-secondary text-2xl sm:text-3xl md:text-4xl font-extrabold">
          LƯU Ý
        </h3>

        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Kỳ Chủ phải hoàn thành vùng đất hiện tại mới có thể tiếp tục được hành
          trình sang vùng đất kế tiếp.
        </p>
      </div>
    </ModalBackdrop>
  );
}
