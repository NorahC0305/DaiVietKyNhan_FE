"use client";

import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import userAnswerLogService from "@services/user-answer-log";
import { toast } from "react-toastify";
import { useState } from "react";

type WrongAnswerProps = {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  onUseCoins?: (questionId: number) => Promise<void>;
  questionId?: number;
  coinCost?: number; // default 500
  penaltyPoints?: number; // default 20
};

export default function WrongAnswer({
  isOpen,
  onClose,
  onRetry,
  onUseCoins,
  questionId,
  coinCost = 500,
  penaltyPoints = 20,
}: WrongAnswerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRetry = () => {
    onRetry?.();
    onClose();
  };

  const handleUseCoins = async () => {
    if (!questionId) {
      toast.error("Không tìm thấy ID câu hỏi");
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the skip service directly here if no custom handler provided
      if (!onUseCoins) {
        await userAnswerLogService.skipQuestionByCoins({ questionId });
        toast.success(`Đã sử dụng ${coinCost} xu để vượt qua câu hỏi`);
        onClose();
      } else {
        // Use custom handler if provided
        await onUseCoins(questionId);
      }
    } catch (error) {
      console.error("Error skipping question with coins:", error);
      toast.error("Có lỗi xảy ra khi sử dụng xu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-8 sm:mt-10 md:mt-12 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
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
          disabled={isSubmitting}
          className={`relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
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
