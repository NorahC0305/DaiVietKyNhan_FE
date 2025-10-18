"use client";

import Image from "next/image";
import { useId } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
};

export default function InputAnswer({
  value,
  onChange,
  placeholder = "Nhập đáp án...",
  className = "",
  inputClassName = "",
  disabled = false,
}: Props) {
  const id = useId();

  return (
    <div
      className={`relative w-[min(280px,60%)] sm:w-[min(360px,50%)] md:w-[min(400px,42%)] ${className}`}
    >
      <div className="relative aspect-[26/9] w-full">
        <Image
          src="https://res.cloudinary.com/dznt9yias/image/upload/v1760722651/InputAnswer_vqetjd.png"
          alt="Khung nhập đáp án"
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 640px"
          style={{ objectFit: "contain" }}
          priority
        />
        <input
          id={id}
          className={`absolute left-[18%] right-[18%] top-[42%] -translate-y-1/2 h-[38%] bg-transparent text-[#835D26] outline-none text-base sm:text-lg md:text-xl placeholder:text-[#835D26]/60 text-center ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${inputClassName}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
