"use client";

import ButtonImage from "@components/Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import { useRouter } from "next/navigation";
import { ROUTES } from "@routes";

export default function FutureEvent({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  const router = useRouter();
  const handleGoToKyGioi = () => {
    router.push(ROUTES.PUBLIC.MAP);
    onClose();
  };
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose} showCloseButton={true}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Chưa kỳ nhân nào được mở. Hãy vào Kỳ Giới để mở khóa nhé!
        </p>
      </div>
      <div className="flex justify-center mt-4 sm:mt-6">
        <ButtonImage
          width={190}
          height={48}
          classNameText="text-base"
          onClick={handleGoToKyGioi}
        >
          Vào <span className="font-extrabold">KỲ GIỚI</span>
        </ButtonImage>
      </div>
    </ModalBackdrop>
  );
}
