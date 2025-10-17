"use client";

import { Input } from "@components/Atoms/ui/input";
import ModalBackdrop from "../../../Atoms/ModalBackdrop";
import InputAnswer from "../InputAnswer";
import { useState } from "react";

export default function InputGiftCode({
  isOpen,
  onClose,
}: ICOMPONENTS.CommonModalProps) {
  const [giftCode, setGiftCode] = useState("");
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      {/* Content */}
      <div className="text-center">
        <h3 className="text-secondary text-2xl sm:text-3xl md:text-4xl font-extrabold">
          NHIỆM VỤ
        </h3>

        <p className="mt-3 text-secondary text-base sm:text-lg md:text-xl leading-relaxed font-extrabold">
          Hãy nhập mật mã để nhận ngay 500 xu.
        </p>

        <div className="mt-3 w-full flex justify-center">
          <InputAnswer
            placeholder="Nhập code..."
            value={giftCode}
            onChange={(value) => {
              setGiftCode(value);
            }}
          />
        </div>
      </div>
    </ModalBackdrop>
  );
}
