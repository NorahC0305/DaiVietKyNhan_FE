"use client";

import ModalBackdrop from "../../../Atoms/ModalBackdrop";

export default function FutureEvent({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Nhiệm vụ này hiện chưa được khai mở. Bạn hãy chờ xem thông báo mới
          nhất từ Fanpage Đại Việt Kỳ Nhân nhé.
        </p>
      </div>
    </ModalBackdrop>
  );
}
