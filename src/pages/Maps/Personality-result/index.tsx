"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FrameText from "../Components/FrameText";
import FrameNumber from "../Components/FrameNumber";

const PersonalityResultPage = () => {
  const router = useRouter();
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(
    null
  );
  const [selectedGuardian, setSelectedGuardian] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGuardianResult, setShowGuardianResult] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // trigger initial slide-in animation
    const id = window.setTimeout(() => setMounted(true), 10);

    // Check if mobile on mount and resize
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1200;
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const personalityOptions = [
    {
      id: "diem-tinh",
      title: "ĐIỀM TĨNH, LÝ TRÍ",
      number: "00",
      color: "#41821E",
      description:
        "Bạn là người điềm tĩnh, có khả năng suy nghĩ logic và phân tích sâu sắc. Bạn thường cân nhắc kỹ lưỡng trước khi đưa ra quyết định và luôn tìm kiếm sự chính xác trong mọi việc. Sự kiên nhẫn và khả năng tập trung cao giúp bạn giải quyết những vấn đề phức tạp một cách hiệu quả.",
    },
    {
      id: "vui-tuoi",
      title: "VUI TƯ, SẢNG KHOÁI",
      number: "05",
      color: "#2B638F",
      description:
        "Bạn là người vui vẻ, tràn đầy năng lượng và luôn nhìn cuộc sống bằng lăng kính lạc quan. Bạn hướng ngoại, cởi mở và dễ dàng hòa nhập với mọi người xung quanh. Ở bất cứ đâu, bạn cũng có thể trở thành tâm điểm mang lại niềm vui, bởi năng lượng sảng khoái và sự nhiệt tình của bạn có sức lan tỏa mạnh mẽ. Sự sáng tạo và trí tưởng tượng phong phú giúp bạn luôn mang lại cảm hứng và niềm vui cho người khác.\n\nBạn sống rất tự phát, đôi khi có phần bốc đồng. Bạn thường tập trung vào hiện tại và tận hưởng từng khoảnh khắc hơn là lo lắng quá nhiều cho tương lai. Điều này giúp bạn linh hoạt, dễ thích nghi và say mê với những gì đang diễn ra. Tuy nhiên, vì quá say mê với những gì đang diễn ra, bạn đôi khi khó đầu tư và tập trung hoàn thiện các kế hoạch.",
    },
    {
      id: "manh-me",
      title: "MẠNH MẼ, QUYẾT ĐOÁN",
      number: "12",
      color: "#EF493D",
      description:
        "Bạn là người mạnh mẽ, quyết đoán và có khả năng lãnh đạo tự nhiên. Bạn không ngại đối mặt với thử thách và luôn sẵn sàng đưa ra những quyết định khó khăn. Sự tự tin và ý chí mạnh mẽ giúp bạn vượt qua mọi khó khăn trong cuộc sống.",
    },
    {
      id: "uu-tu",
      title: "ƯU TƯ, SÂU SẮC",
      number: "24",
      color: "#8D3BBB",
      description:
        "Bạn là người có tâm hồn sâu sắc, thường suy nghĩ về ý nghĩa cuộc sống và những vấn đề lớn lao. Bạn có khả năng cảm nhận và thấu hiểu cảm xúc của người khác một cách tinh tế. Sự nhạy cảm và trí tuệ cảm xúc cao giúp bạn kết nối sâu sắc với mọi người xung quanh.",
    },
  ];

  // Guardian Deity Data - Updated to match new design
  const guardianDeities = [
    {
      id: "tan-vien-son-thanh",
      title: "TẢN VIÊN",
      subtitle: "SƠN THÁNH",
      name: "SƠN TINH",
      personalityId: "diem-tinh",
      description: "Vị thần của sự điềm tĩnh và trí tuệ",
      image: "/Character.png",
      borderColor: "border-green-500",
      bgColor: "bg-green-50",
      textColor: "#10B981",
    },
    {
      id: "chu-dao-to",
      title: "CHỬ ĐẠO TỔ",
      subtitle: "",
      name: "CHỬ ĐỒNG TỬ",
      personalityId: "vui-tuoi",
      description: "Vị thần của niềm vui và sự sáng tạo",
      image: "/Character.png",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
      textColor: "#3B82F6",
    },
    {
      id: "phu-dong-thien-vuong",
      title: "PHÙ ĐỔNG",
      subtitle: "THIÊN VƯƠNG",
      name: "THÁNH GIÓNG",
      personalityId: "manh-me",
      description: "Vị thần của sức mạnh và quyết đoán",
      image: "/Character.png",
      borderColor: "border-red-500",
      bgColor: "bg-red-50",
      textColor: "#EF4444",
    },
    {
      id: "mau-thuong-thien",
      title: "MẪU",
      subtitle: "THƯỢNG THIÊN",
      name: "CÔNG CHÚA LIỄU HẠNH",
      personalityId: "uu-tu",
      description: "Vị thần của sự sâu sắc và cảm xúc",
      image: "/Character.png",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-50",
      textColor: "#8B5CF6",
    },
  ];

  const selectedOption = personalityOptions.find(
    (option) => option.id === selectedPersonality
  );

  // Find the corresponding guardian deity based on selected personality
  const defaultGuardian = guardianDeities.find(
    (guardian) => guardian.personalityId === selectedPersonality
  );

  // Auto-select guardian when personality is selected
  useEffect(() => {
    if (selectedPersonality && !selectedGuardian) {
      const guardian = guardianDeities.find(
        (guardian) => guardian.personalityId === selectedPersonality
      );
      if (guardian) {
        setSelectedGuardian(guardian);
      }
    }
  }, [selectedPersonality, selectedGuardian]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedPersonality(optionId);
  };

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    if (showGuardianResult) {
      console.log("Go to next step");
      // Here you would navigate to the next step or page
      return;
    }
    // Only show guardian result if a personality is selected
    if (selectedPersonality) {
      setShowGuardianResult(true);
    }
  };

  const handleBack = () => {
    setShowGuardianResult(false);
  };

  // Guardian Deity Result Component - New Design
  const GuardianDeityResult = () => (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6 px-6">
      {/* Instruction Box */}
      <div className="w-full max-w-4xl bg-amber-100 border-2 border-amber-300 rounded-lg p-4 mb-6">
        <div className="text-center text-amber-800 font-medium">
          <p className="text-lg md:text-xl mb-2">
            Tương ứng với khí chất, vị Thần Bảo Hộ của bạn là:
          </p>
          <p className="text-sm md:text-base text-amber-700">
            (Trong trường hợp bạn có nhiều hơn một khí chất có số điểm ngang
            nhau, vui lòng chọn một vị Thần Bảo Hộ theo mong muốn của bạn)
          </p>
        </div>
      </div>

      {/* Guardian Selection Cards */}
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {guardianDeities.map((guardian) => {
            const isSelected = selectedGuardian?.id === guardian.id;
            return (
              <div
                key={guardian.id}
                onClick={() => setSelectedGuardian(guardian)}
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected ? "scale-105" : "scale-100"
                }`}
              >
                {/* Guardian Card */}
                <div
                  className={`w-full h-64 md:h-72 lg:h-80 border-4 ${guardian.borderColor} ${guardian.bgColor} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {/* Character Image Area */}
                  <div className="h-3/4 relative">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/50 to-gray-100/50">
                      {/* Placeholder for character image */}
                      <div className="text-center text-gray-600">
                        <div
                          className="text-sm font-bold mb-1"
                          style={{ color: guardian.textColor }}
                        >
                          {guardian.name}
                        </div>
                        <div className="text-xs opacity-75">
                          Character Image
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Area */}
                  <div className="h-1/4 bg-white/80 flex flex-col justify-center items-center px-2 py-1">
                    <div className="text-center">
                      {guardian.subtitle && (
                        <div
                          className="text-xs md:text-sm font-bold mb-1"
                          style={{ color: guardian.textColor }}
                        >
                          {guardian.subtitle}
                        </div>
                      )}
                      <div
                        className="text-lg md:text-xl font-extrabold uppercase tracking-wide"
                        style={{ color: guardian.textColor }}
                      >
                        {guardian.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Action Buttons Container */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {!isMobile && (
          <button
            onClick={handleBack}
            className="cursor-pointer flex items-center justify-center hover:opacity-80 transition-opacity duration-300"
            aria-label="Back"
          >
            <Image src="/Back.svg" alt="Back" width={50} height={50} />
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selectedGuardian}
          className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 ${
            selectedGuardian ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
          }`}
          style={{ width: '180px', height: '50px' }} // Example dimensions
        >
          <Image src="/TIEPTUC.png" alt="Tiếp tục" layout="fill" objectFit="contain" />
        </button>
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
        <div className="flex flex-col gap-4">
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
                <div className="flex items-center">
                  {/* Left Frame - Text */}
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
                      fontSize: isMobile ? "18px" : "24px",
                      fontFamily: "var(--font-bd-street-sign)",
                      color: isSelected
                        ? option.color
                        : shouldDim
                        ? "#6B7280"
                        : option.color,
                    }}
                    width={isMobile ? 180 : 320}
                    height={isMobile ? 50 : 70}
                  />

                  {/* Right Frame - Number */}
                  <FrameNumber
                    text={option.number}
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
                      fontSize: isMobile ? "16px" : "20px",
                      fontFamily: "var(--font-bd-street-sign)",
                      color: isSelected
                        ? option.color
                        : shouldDim
                        ? "#6B7280"
                        : option.color,
                    }}
                    width={isMobile ? 60 : 80}
                    height={isMobile ? 60 : 80}
                  />
                </div>
              </div>
            );
          })}
        </div>
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
            disabled={!selectedPersonality}
            className={`cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              selectedPersonality
                ? "hover:bg-amber-200/80"
                : "opacity-50 cursor-not-allowed"
            }`}
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

        {showGuardianResult && isMobile && (
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