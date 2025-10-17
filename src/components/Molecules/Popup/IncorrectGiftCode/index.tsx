"use client";

import Image from "next/image";
import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import ReturnImage from "../../../../../public/Return 1.svg";
type IncorrectGiftCodeProps = {
  isOpen: boolean;
  onClose: () => void;
  coinsReward?: number;
};

export default function IncorrectGiftCode({
  isOpen,
  onClose,
  coinsReward = 500,
}: IncorrectGiftCodeProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <h3 className="text-secondary text-2xl sm:text-3xl md:text-4xl font-extrabold">
          NHIỆM VỤ
        </h3>
        <p className="mt-3 text-secondary text-base sm:text-xl md:text-2xl leading-relaxed font-extrabold">
          Hãy nhập mật mã để nhận ngay {coinsReward} xu.
        </p>
        <p className="mt-3 text-error text-base sm:text-xl md:text-2xl leading-relaxed font-extrabold">
          SAI MẬT MÃ!
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
        <Image
          src={ReturnImage}
          alt="Back"
          width={60}
          height={48}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
    </ModalBackdrop>
  );
}
