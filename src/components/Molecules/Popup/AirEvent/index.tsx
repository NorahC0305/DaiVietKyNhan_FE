"use client";

import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import { getCurrentVietnamTime } from "@/utils/ReleaseDateUtils";

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
  // Check if current date is after October 27th, 2024
  const isParticipationEnabled = () => {
    const currentDate = getCurrentVietnamTime();
    const targetDate = new Date(2025, 9, 27); // October 27, 2024 (month is 0-indexed)
    return currentDate >= targetDate;
  };

  const handleParticipate = () => {
    if (!isParticipationEnabled()) {
      return; // Don't do anything if participation is not enabled yet
    }
    // Add your participation logic here
    console.log("Participating in the event...");
  };
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
        <button 
          onClick={handleParticipate}
          disabled={!isParticipationEnabled()}
          className={`relative overflow-hidden transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center ${
            isParticipationEnabled() 
              ? 'hover:scale-105 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ButtonImage width={180} height={48}>
            Tham gia ngay
          </ButtonImage>
        </button>

        {/* Cancel */}
        <button 
          onClick={onClose}
          className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center"
        >
          <ButtonImage width={180} height={48}>
            Huỷ
          </ButtonImage>
        </button>
      </div>
    </ModalBackdrop>
  );
}
