"use client";

import { Loader2 } from "lucide-react";
import ButtonImage from "../../../Atoms/ButtonImage";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";

type BuyMoreLifeProps = {
  isOpen: boolean;
  onClose: () => void;
  coinCost: number;
  onBuy: () => void;
  isBuying?: boolean;
};

export default function BuyMoreLife({
  isOpen,
  onClose,
  coinCost,
  onBuy,
  isBuying = false,
}: BuyMoreLifeProps) {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      {/* Content */}
      <div className="text-center">
        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Bạn có muốn dùng {coinCost} xu để mua thêm 1 mạng?
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
        {/* Use coins */}

        <ButtonImage
          width={180}
          height={48}
          onClick={onBuy}
          isLoading={isBuying}
          className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center"
        >
          {isBuying ? <Loader2 className="animate-spin" /> : "Mua"}
        </ButtonImage>

        {/* Retry */}

        <ButtonImage
          width={180}
          height={48}
          onClick={onClose}
          isLoading={isBuying}
          className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 min-w-[180px] rounded-xl font-semibold text-lg flex items-center justify-center"
        >
          Huỷ
        </ButtonImage>
      </div>
    </ModalBackdrop>
  );
}
