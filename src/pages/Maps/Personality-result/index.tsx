"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FrameText from "../Components/FrameText";

const PersonalityResultPage = () => {
  const router = useRouter();
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGuardianResult, setShowGuardianResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger initial slide-in animation
    const id = window.setTimeout(() => setMounted(true), 10);
    return () => window.clearTimeout(id);
  }, []);

  const personalityOptions = [
    {
      id: "vui-tuoi",
      title: "VUI TƯ, SẢNG KHOÁI",
      color: "#2B638F",
      description:
        "Bạn là người vui vẻ, tràn đầy năng lượng và luôn nhìn cuộc sống bằng lăng kính lạc quan. Bạn hướng ngoại, cởi mở và dễ dàng hòa nhập với mọi người xung quanh. Ở bất cứ đâu, bạn cũng có thể trở thành tâm điểm mang lại niềm vui, bởi năng lượng sảng khoái và sự nhiệt tình của bạn có sức lan tỏa mạnh mẽ. Sự sáng tạo và trí tưởng tượng phong phú giúp bạn luôn mang lại cảm hứng và niềm vui cho người khác.\n\nBạn sống rất tự phát, đôi khi có phần bốc đồng. Bạn thường tập trung vào hiện tại và tận hưởng từng khoảnh khắc hơn là lo lắng quá nhiều cho tương lai. Điều này giúp bạn linh hoạt, dễ thích nghi và say mê với những gì đang diễn ra. Tuy nhiên, vì quá say mê với những gì đang diễn ra, bạn đôi khi khó đầu tư và tập trung hoàn thiện các kế hoạch.",
    },
    {
      id: "diem-tinh",
      title: "ĐIỀM TĨNH, LÝ TRÍ",
      color: "#41821E",
      description:
        "Bạn là người điềm tĩnh, có khả năng suy nghĩ logic và phân tích sâu sắc. Bạn thường cân nhắc kỹ lưỡng trước khi đưa ra quyết định và luôn tìm kiếm sự chính xác trong mọi việc. Sự kiên nhẫn và khả năng tập trung cao giúp bạn giải quyết những vấn đề phức tạp một cách hiệu quả.",
    },
    {
      id: "manh-me",
      title: "MẠNH MẼ, QUYẾT ĐOÁN",
      color: "#EF493D",
      description:
        "Bạn là người mạnh mẽ, quyết đoán và có khả năng lãnh đạo tự nhiên. Bạn không ngại đối mặt với thử thách và luôn sẵn sàng đưa ra những quyết định khó khăn. Sự tự tin và ý chí mạnh mẽ giúp bạn vượt qua mọi khó khăn trong cuộc sống.",
    },
    {
      id: "uu-tu",
      title: "ƯU TƯ, SÂU SẮC",
      color: "#8D3BBB",
      description:
        "Bạn là người có tâm hồn sâu sắc, thường suy nghĩ về ý nghĩa cuộc sống và những vấn đề lớn lao. Bạn có khả năng cảm nhận và thấu hiểu cảm xúc của người khác một cách tinh tế. Sự nhạy cảm và trí tuệ cảm xúc cao giúp bạn kết nối sâu sắc với mọi người xung quanh.",
    },
  ];

  // Guardian Deity Data
  const guardianDeities = [
    {
      id: "chu-dao-to",
      title: "CHỬ ĐẠO TỔ",
      name: "CHỦ ĐỒNG TỬ",
      personalityId: "vui-tuoi",
      description: "Vị thần của niềm vui và sự sáng tạo",
      image: "/Character.png", // Placeholder - replace with actual image
      cardBg: "from-yellow-100 to-yellow-200",
    },
    {
      id: "tan-vien-son-thanh",
      title: "TẢN VIÊN SƠN THÁNH",
      name: "SƠN TỈNH",
      personalityId: "diem-tinh",
      description: "Vị thần của sự điềm tĩnh và trí tuệ",
      image: "/Character.png", // Placeholder - replace with actual image
      cardBg: "from-green-100 to-green-200",
    },
    {
      id: "phu-dong-thien-vuong",
      title: "PHÙ ĐỔNG THIÊN VƯỚNG",
      name: "THÁNH GIÓNG",
      personalityId: "manh-me",
      description: "Vị thần của sức mạnh và quyết đoán",
      image: "/Character.png", // Placeholder - replace with actual image
      cardBg: "from-orange-100 to-orange-200",
    },
    {
      id: "mau-thuong-thien",
      title: "MẪU THƯỢNG THIÊN",
      name: "CÔNG CHÚA LIỄU HẠNH",
      personalityId: "uu-tu",
      description: "Vị thần của sự sâu sắc và cảm xúc",
      image: "/Character.png", // Placeholder - replace with actual image
      cardBg: "from-pink-100 to-purple-200",
    },
  ];

  const selectedOption = personalityOptions.find(
    (option) => option.id === selectedPersonality
  );

  // Find the corresponding guardian deity based on selected personality
  const selectedGuardian = guardianDeities.find(
    (guardian) => guardian.personalityId === selectedPersonality
  );

  const handleOptionSelect = (optionId: string) => {
    setSelectedPersonality(optionId);
  };

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    if (showGuardianResult) {
      console.log("Go to next step");
      return;
    }
    setShowGuardianResult(true);
  };

  const handleBack = () => {
    setShowGuardianResult(false);
  };

  // Guardian Deity Result Component
  const GuardianDeityResult = () => (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full items-center">
      {/* Left Side - Guardian Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 px-4">
        {/* Title */}
        <div className="text-left">
          <h2
            className="text-xl md:text-2xl font-semibold mb-5"
            style={{ color: selectedOption?.color || "#2B638F" }}
          >
            Vị Thần Bảo Hộ của bạn là:
          </h2>
          {/* Guardian Names */}
          <div className="space-y-2">
            <div
              className="text-4xl md:text-5xl font-bold border-b pb-2"
              style={{
                color: selectedOption?.color || "#2B638F",
                borderColor: selectedOption?.color || "#2B638F",
              }}
            >
              {selectedGuardian?.title || "CHỬ ĐẠO TỔ"}
            </div>
            <div
              className="text-7xl md:text-8xl font-bd-street-sign font-extrabold"
              style={{ color: selectedOption?.color || "#2B638F" }}
            >
              {selectedGuardian?.name || "CHỦ ĐỒNG TỬ"}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-800 font-semibold px-9 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Tiếp tục
        </button>
      </div>

      {/* Right Side - Character Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="relative">
          {/* Character Image */}
          <div
            className={`w-80 h-[24rem] md:w-96 md:h-[28rem] lg:w-[28rem] lg:h-[32rem] bg-gradient-to-br ${
              selectedGuardian?.cardBg || "from-blue-100 to-purple-100"
            } rounded-xl flex items-center justify-center border-2 border-gray-300`}
          >
            <div className="text-center text-gray-600">
              <div className="text-lg md:text-xl font-semibold mb-2">
                {selectedGuardian?.name || "CHỦ ĐỒNG TỬ"}
              </div>
              <div className="text-sm md:text-base">
                {selectedGuardian?.description || "Character Illustration"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Personality Selection Component
  const PersonalitySelection = () => (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full items-center">
      {/* Left Side - Personality Options */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-5">
        {/* Title */}
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-4xl font-extrabold uppercase"
            style={{ color: selectedOption?.color || "#2B638F" }}
          >
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
                className={`font-semibold text-base md:text-lg transition-all duration-300 ${
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
                  fontSize: "40px",
                  fontFamily: "var(--font-bd-street-sign)",
                  color: isSelected
                    ? option.color
                    : shouldDim
                    ? "#6B7280"
                    : option.color,
                }}
                width={460}
                height={98}
              />
            </div>
          );
        })}
        {/* Footer */}
        <div className="mt-6 text-left self-start w-full max-w-[460px]">
          <span
            className="text-xs"
            style={{ color: selectedOption?.color || "#6B7280" }}
          >
            *Kết quả mang tính chất tham khảo
          </span>
        </div>
      </div>

      {/* Right Side - Description */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {selectedOption && (
          <div className="bg-gray-300/20 rounded-xl p-8 md:p-10 border border-gray-300 max-h-[24rem] md:max-h-[30rem] w-full flex flex-col">
            <div
              className="text-xl md:text-2xl leading-relaxed whitespace-pre-line italic overflow-y-auto custom-scrollbar flex-1 pr-2"
              style={{ color: selectedOption.color }}
            >
              {selectedOption.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-3 ">
      {/* Main Content Frame */}
      <div
        className="relative bg-amber-100/80 border-3 rounded-2xl max-w-5xl md:max-w-6xl w-full shadow-2xl"
        style={{ borderColor: selectedOption?.color || "#2B638F" }}
      >
        {/* Padded content wrapper */}
        <div className="p-5 md:p-8 lg:p-10">
          {/* This container hides overflow */}
          <div className="relative min-h-[30rem] md:min-h-[38rem] lg:min-h-[44rem] overflow-hidden">
            {/* Personality slides in from left */}
            <div
              className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
                showGuardianResult
                  ? "-translate-x-[110%]"
                  : mounted
                  ? "translate-x-0"
                  : "-translate-x-full"
              }`}
            >
              <PersonalitySelection />
            </div>

            {/* Guardian slides in from right */}
            <div
              className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
                showGuardianResult ? "translate-x-0" : "translate-x-[110%]"
              }`}
            >
              <GuardianDeityResult />
            </div>
          </div>
        </div>

        {/* Edge-aligned navigation buttons */}
        {!showGuardianResult && (
          <button
            onClick={handleNext}
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 rounded-full flex items-center justify-center hover:bg-amber-200/80 transition-all duration-300"
            aria-label="Next"
          >
            <Image
              src="/Next.svg"
              alt="Next"
              width={50}
              height={50}
              className="text-gray-700"
            />
          </button>
        )}

        {showGuardianResult && (
          <button
            onClick={handleBack}
            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 rounded-full flex items-center justify-center hover:bg-amber-200/80 transition-all duration-300"
            aria-label="Back"
          >
            <Image
              src="/Back.svg"
              alt="Back"
              width={50}
              height={50}
              className="text-gray-700"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalityResultPage;