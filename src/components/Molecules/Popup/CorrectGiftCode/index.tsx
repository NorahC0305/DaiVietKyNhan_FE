"use client";

import Image from "next/image";
import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import ReturnImage from "../../../../../public/Return 1.svg";
type CorrectGiftCodeProps = {
  isOpen: boolean;
  onClose: () => void;
  coinsReward?: number;
};

export default function CorrectGiftCode({
  isOpen,
  onClose,
  coinsReward = 500,
}: CorrectGiftCodeProps) {
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
        <div className="flex flex-col items-center justify-center gap-1 mt-3 text-[#4E9E5C]">
          <p className="text-base sm:text-xl md:text-2xl leading-none font-extrabold">
            CHÍNH XÁC!
          </p>
          <p className="text-base sm:text-xl md:text-2xl leading-none font-extrabold">
            BẠN ĐƯỢC THƯỞNG {coinsReward} XU.
          </p>
        </div>
      </div>
    </ModalBackdrop>
  );
}
