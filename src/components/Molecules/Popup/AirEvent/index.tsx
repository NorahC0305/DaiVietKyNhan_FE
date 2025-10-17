"use client";

import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";

type AirEventProps = {
  isOpen: boolean;
  onClose: () => void;
  coinsReward?: number;
};

export default function AirEvent({
  isOpen,
  onClose,
  coinsReward = 200,
}: AirEventProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <h3 className="text-secondary text-2xl sm:text-3xl md:text-4xl font-extrabold">
          NHIỆM VỤ
        </h3>
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Hãy viết một lá thư để bày tỏ đôi lời gửi tới vị Kỳ Nhân yêu thích.
          Bạn sẽ nhận được {coinsReward} xu khi bức thư được hệ thống xét duyệt.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
        {/* Use coins */}
        <button className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center">
          <ButtonImage width={180} height={48}>
            Tham gia ngay
          </ButtonImage>
        </button>

        {/* Retry */}
        <button className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center">
          <ButtonImage width={180} height={48}>
            Huỷ
          </ButtonImage>
        </button>
      </div>
    </ModalBackdrop>
  );
}
