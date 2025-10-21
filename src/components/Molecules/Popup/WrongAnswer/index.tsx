"use client";

import { createPortal } from "react-dom";
import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import { toast } from "react-toastify";
import { useState } from "react";

type WrongAnswerProps = {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  onUseCoins: (questionId: number) => Promise<void>;
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
      await onUseCoins(questionId);
    } catch (error) {
      console.error("Error skipping question with coins:", error);
      toast.error("Có lỗi xảy ra khi sử dụng xu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use React Portal to render modal at root level
  if (typeof window === "undefined") return null;

  return createPortal(
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

        <ButtonImage
          width={180}
          height={48}
          onClick={handleUseCoins}
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="hover:scale-105 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-secondary text-xl sm:text-x2l font-semibold">
              -{coinCost}
            </span>
            <img src="/DVKN%20coin.svg" alt="coin" width={48} height={48} />
          </span>
        </ButtonImage>

        {/* Retry */}

        <ButtonImage
          width={180}
          height={48}
          onClick={handleRetry}
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="hover:scale-105 transition-all duration-300"
        >
          Trả lời lại
        </ButtonImage>
      </div>
    </ModalBackdrop>,
    document.body
  );
}
