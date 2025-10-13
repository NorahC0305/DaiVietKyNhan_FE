import React from "react";
import Image from "next/image";

interface CharacterCardProps {
  characterImage: string;
  alt: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterImage,
  alt,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-300
        ${isSelected ? 'scale-105' : 'hover:scale-102'}
      `}
      onClick={onClick}
    >
      <div className="relative w-full h-auto">
        <Image
          src={characterImage}
          alt={alt}
          width={200}
          height={300}
          className="object-contain"
          priority
        />
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
