"use client";

import ModalBackdrop from "../../../Atoms/ModalBackdrop";

export default function RunOutOfLife({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Bạn đã hết mạng. Vui lòng chờ sang ngày mới để được phục hồi mạng hoặc
          mua thêm mạng.
        </p>
      </div>
    </ModalBackdrop>
  );
}
