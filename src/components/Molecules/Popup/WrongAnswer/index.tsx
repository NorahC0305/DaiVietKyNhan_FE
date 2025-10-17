"use client";

import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";

type WrongAnswerProps = {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  onUseCoins?: () => void;
  coinCost?: number; // default 500
  penaltyPoints?: number; // default 20
};

export default function WrongAnswer({
  isOpen,
  onClose,
  onRetry,
  onUseCoins,
  coinCost = 500,
  penaltyPoints = 20,
}: WrongAnswerProps) {
  const handleRetry = () => {
    onRetry?.();
    onClose();
  };

  const handleUseCoins = () => {
    onUseCoins?.();
    onClose();
  };

  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Đây chưa phải là danh tính của vị Kỳ Nhân này. Bạn bị trừ {""}
          {penaltyPoints} điểm. Bạn có muốn sử dụng {coinCost} xu để vượt qua
          thử thách này không?
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
        {/* Use coins */}
        <button
          onClick={handleUseCoins}
          className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center"
        >
          <ButtonImage width={180} height={48}>
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-secondary text-xl sm:text-x2l font-semibold">
                -{coinCost}
              </span>
              <img src="/DVKN%20coin.svg" alt="coin" width={48} height={48} />
            </span>
          </ButtonImage>
        </button>

        {/* Retry */}
        <button
          onClick={handleRetry}
          className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center"
        >
          <ButtonImage width={180} height={48}>
            Trả lời lại
          </ButtonImage>
        </button>
      </div>
    </ModalBackdrop>
  );
}
