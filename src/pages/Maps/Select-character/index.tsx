"use client";

import CharacterCard from "@pages/Maps/Select-character/Components/CharacterCard";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SelectCharacterPage = () => {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
  };

  const handleContinue = () => {
    router.push("/maps/personality-result");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Main Content Frame */}
      <div className="relative bg-amber-50/70 border-3 border-blue-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        {/* Question Text */}
        <div className="text-center mb-8 text-xl font-bold text-blue-800">
          Bạn muốn tham gia vào Kỳ Giới với phiên bản Kỳ Chủ nào?
        </div>

        {/* Character Selection */}
        <div className="flex justify-center gap-8 mb-6">
          <CharacterCard
            characterImage="/char nam 1.svg"
            alt="Nam Kỳ Chủ"
            isSelected={selectedCharacter === "male"}
            onClick={() => handleCharacterSelect("male")}
          />

          <CharacterCard
            characterImage="/char nữ 1.svg"
            alt="Nữ Kỳ Chủ"
            isSelected={selectedCharacter === "female"}
            onClick={() => handleCharacterSelect("female")}
          />
        </div>

        {/* Continue Button */}
        {selectedCharacter && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Tiếp tục
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCharacterPage;
