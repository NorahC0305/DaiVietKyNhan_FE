"use client";

import ModalBackdrop from "../../../Atoms/ModalBackdrop";

export default function WaitingOthers({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Đang chờ thêm các Kỳ Chủ khác mở được toàn bộ phong ấn.
        </p>
      </div>
    </ModalBackdrop>
  );
}
