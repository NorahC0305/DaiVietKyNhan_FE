"use client";

import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import KhaiNhanMoAn from "../KhaiNhanMoAn";

export default function WaitingOthers({
  userLand,
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <KhaiNhanMoAn onClose={onClose} onClaim={onClose} isOpen={isOpen} userLand={userLand} />
    </ModalBackdrop>
  );
}
