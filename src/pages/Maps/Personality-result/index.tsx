"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FrameText from "../Components/FrameText";

const PersonalityResultPage = () => {
  const router = useRouter();
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(
    null
  );

  const personalityOptions = [
    {
      id: "vui-tuoi",
      title: "VUI TƯ, SẢNG KHOÁI",
      color: "#2A648E",
      description:
        "Bạn là người vui vẻ, tràn đầy năng lượng và luôn nhìn cuộc sống bằng lăng kính lạc quan. Bạn hướng ngoại, cởi mở và dễ dàng hòa nhập với mọi người xung quanh. Ở bất cứ đâu, bạn cũng có thể trở thành tâm điểm mang lại niềm vui, bởi năng lượng sảng khoái và sự nhiệt tình của bạn có sức lan tỏa mạnh mẽ. Sự sáng tạo và trí tưởng tượng phong phú giúp bạn luôn mang lại cảm hứng và niềm vui cho người khác.\n\nBạn sống rất tự phát, đôi khi có phần bốc đồng. Bạn thường tập trung vào hiện tại và tận hưởng từng khoảnh khắc hơn là lo lắng quá nhiều cho tương lai. Điều này giúp bạn linh hoạt, dễ thích nghi và say mê với những gì đang diễn ra. Tuy nhiên, vì quá say mê với những gì đang diễn ra, bạn đôi khi khó đầu tư và tập trung hoàn thiện các kế hoạch.",
    },
    {
      id: "diem-tinh",
      title: "ĐIỀM TĨNH, LÝ TRÍ",
      color: "#BBC88F",
      description:
        "Bạn là người điềm tĩnh, có khả năng suy nghĩ logic và phân tích sâu sắc. Bạn thường cân nhắc kỹ lưỡng trước khi đưa ra quyết định và luôn tìm kiếm sự chính xác trong mọi việc. Sự kiên nhẫn và khả năng tập trung cao giúp bạn giải quyết những vấn đề phức tạp một cách hiệu quả.",
    },
    {
      id: "manh-me",
      title: "MẠNH MẼ, QUYẾT ĐOÁN",
      color: "#EFB9A0",
      description:
        "Bạn là người mạnh mẽ, quyết đoán và có khả năng lãnh đạo tự nhiên. Bạn không ngại đối mặt với thử thách và luôn sẵn sàng đưa ra những quyết định khó khăn. Sự tự tin và ý chí mạnh mẽ giúp bạn vượt qua mọi khó khăn trong cuộc sống.",
    },
    {
      id: "uu-tu",
      title: "ƯU TƯ, SÂU SẮC",
      color: "#C9AFC3",
      description:
        "Bạn là người có tâm hồn sâu sắc, thường suy nghĩ về ý nghĩa cuộc sống và những vấn đề lớn lao. Bạn có khả năng cảm nhận và thấu hiểu cảm xúc của người khác một cách tinh tế. Sự nhạy cảm và trí tuệ cảm xúc cao giúp bạn kết nối sâu sắc với mọi người xung quanh.",
    },
  ];

  const selectedOption = personalityOptions.find(
    (option) => option.id === selectedPersonality
  );

  const handleOptionSelect = (optionId: string) => {
    setSelectedPersonality(optionId);
  };

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    // Handle next action
    console.log("Next button clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Main Content Frame */}
      <div className="relative bg-amber-100/80 border-3 border-blue-800 rounded-2xl p-6 max-w-4xl w-full shadow-2xl">
        <div className="flex gap-6">
          {/* Left Side - Personality Options */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-4">
            {/* Title */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-extrabold text-blue-800 uppercase">
                KHÍ CHẤT CỦA BẠN CÓ THIÊN HƯỚNG:
              </h1>
            </div>
            {personalityOptions.map((option) => {
              const isSelected = selectedPersonality === option.id;
              const hasSelection = selectedPersonality !== null;
              const shouldDim = hasSelection && !isSelected;

              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`transition-all duration-300 cursor-pointer ${
                    shouldDim ? "opacity-40" : "opacity-100"
                  } hover:opacity-80`}
                >
                  <FrameText
                    text={option.title}
                    className={`font-semibold text-sm transition-all duration-300 ${
                      isSelected ? "scale-105" : "scale-100"
                    }`}
                    textClassName={`transition-all duration-300 ${
                      isSelected
                        ? "font-extrabold"
                        : shouldDim
                        ? "text-gray-500"
                        : ""
                    }`}
                    textStyle={{
                      color: isSelected
                        ? option.color
                        : shouldDim
                        ? "#6B7280"
                        : option.color,
                    }}
                    width={350}
                    height={80}
                  />
                </div>
              );
            })}
            {/* Footer */}
            <div className="mt-6 text-left self-start">
              <span className="text-xs text-gray-600">
                Đại Việt Ký Nhân - Hướng dẫn
              </span>
            </div>
          </div>

          {/* Right Side - Description */}
          <div className="flex-1 flex justify-center items-center">
            {selectedOption && (
              <div className="bg-gray-300/20 rounded-lg p-8 border border-gray-300">
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedOption.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="cursor-pointer absolute right-110 top-1/2 transform -translate-y-1/2 z-10 rounded-full flex items-center justify-center hover:bg-amber-200/80"
      >
        <Image
          src="/Next.svg"
          alt="Next"
          width={50}
          height={50}
          className="text-gray-700"
        />
      </button>
    </div>
  );
};

export default PersonalityResultPage;
