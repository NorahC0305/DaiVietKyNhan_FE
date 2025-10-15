"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useHouseScoresSelector } from "@/stores/entry-test/selectors";
import Image from "next/image";
import FrameText from "../Components/FrameText";
import FrameNumber from "../Components/FrameNumber";
import { ROUTES } from "@routes";

const PersonalityResultPage = () => {
  const router = useRouter();
  const storeScores = useHouseScoresSelector();
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

  // Auto-select personality with highest score
  useEffect(() => {
    if (storeScores && !selectedPersonality) {
      const scores = [
        { id: "diem-tinh", score: parseInt(storeScores.diemTinh || "0") || 0 },
        { id: "vui-tuoi", score: parseInt(storeScores.vuiTuoi || "0") || 0 },
        { id: "manh-me", score: parseInt(storeScores.manhMe || "0") || 0 },
        { id: "uu-tu", score: parseInt(storeScores.uuTu || "0") || 0 },
      ];

      const maxScore = Math.max(...scores.map((s) => s.score));
      const highestScorePersonalities = scores.filter(
        (s) => s.score === maxScore
      );

      // If multiple personalities have the same highest score, select the first one
      // User can still change selection manually
      if (highestScorePersonalities.length > 0) {
        setSelectedPersonality(highestScorePersonalities[0].id);
      }
    }
  }, [storeScores?.diemTinh, storeScores?.vuiTuoi, storeScores?.manhMe, storeScores?.uuTu]);

  // No URL params; read from zustand store

  const personalityOptions = [
    {
      id: "diem-tinh",
      title: "ĐIỀM TĨNH, LÝ TRÍ",
      number: storeScores?.diemTinh ?? "00",
      color: "#41821E",
      description:
        "Bạn là người điềm tĩnh, có khả năng suy nghĩ logic và phân tích sâu sắc. Bạn thường cân nhắc kỹ lưỡng trước khi đưa ra quyết định và luôn tìm kiếm sự chính xác trong mọi việc. Sự kiên nhẫn và khả năng tập trung cao giúp bạn giải quyết những vấn đề phức tạp một cách hiệu quả.",
    },
    {
      id: "vui-tuoi",
      title: "VUI TƯ, SẢNG KHOÁI",
      number: storeScores?.vuiTuoi ?? "05",
      color: "#2B638F",
      description:
        "Bạn là người vui vẻ, tràn đầy năng lượng và luôn nhìn cuộc sống bằng lăng kính lạc quan. Bạn hướng ngoại, cởi mở và dễ dàng hòa nhập với mọi người xung quanh. Ở bất cứ đâu, bạn cũng có thể trở thành tâm điểm mang lại niềm vui, bởi năng lượng sảng khoái và sự nhiệt tình của bạn có sức lan tỏa mạnh mẽ. Sự sáng tạo và trí tưởng tượng phong phú giúp bạn luôn mang lại cảm hứng và niềm vui cho người khác.\n\nBạn sống rất tự phát, đôi khi có phần bốc đồng. Bạn thường tập trung vào hiện tại và tận hưởng từng khoảnh khắc hơn là lo lắng quá nhiều cho tương lai. Điều này giúp bạn linh hoạt, dễ thích nghi và say mê với những gì đang diễn ra. Tuy nhiên, vì quá say mê với những gì đang diễn ra, bạn đôi khi khó đầu tư và tập trung hoàn thiện các kế hoạch.",
    },
    {
      id: "manh-me",
      title: "MẠNH MẼ, QUYẾT ĐOÁN",
      number: storeScores?.manhMe ?? "12",
      color: "#EF493D",
      description:
        "Bạn là người mạnh mẽ, quyết đoán và có khả năng lãnh đạo tự nhiên. Bạn không ngại đối mặt với thử thách và luôn sẵn sàng đưa ra những quyết định khó khăn. Sự tự tin và ý chí mạnh mẽ giúp bạn vượt qua mọi khó khăn trong cuộc sống.",
    },
    {
      id: "uu-tu",
      title: "ƯU TƯ, SÂU SẮC",
      number: storeScores?.uuTu ?? "24",
      color: "#8D3BBB",
      description:
        "Bạn là người có tâm hồn sâu sắc, thường suy nghĩ về ý nghĩa cuộc sống và những vấn đề lớn lao. Bạn có khả năng cảm nhận và thấu hiểu cảm xúc của người khác một cách tinh tế. Sự nhạy cảm và trí tuệ cảm xúc cao giúp bạn kết nối sâu sắc với mọi người xung quanh.",
    },
  ];

  // Guardian Deity Data - Updated to match new design
  const guardianDeities = [
    {
      id: "tan-vien-son-thanh",
      title: "TẢN VIÊN SƠN THÁNH",
      name: "SƠN TINH",
      personalityId: "diem-tinh",
      description: "Vị thần của sự điềm tĩnh và trí tuệ",
      image: "/Sơn Tinh 1.svg",
      borderColor: "border-green-500",
      bgColor: "bg-green-50",
      textColor: "#10B981",
    },
    {
      id: "chu-dao-to",
      title: "CHỬ ĐẠO TỔ",
      name: "CHỬ ĐỒNG TỬ",
      personalityId: "vui-tuoi",
      description: "Vị thần của niềm vui và sự sáng tạo",
      image: "/Chử đồng tử 1.svg",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
      textColor: "#3B82F6",
    },
    {
      id: "phu-dong-thien-vuong",
      title: "PHÙ ĐỔNG THIÊN VƯƠNG",
      name: "THÁNH GIÓNG",
      personalityId: "manh-me",
      description: "Vị thần của sức mạnh và quyết đoán",
      image: "/Thánh Gióng 1.svg",
      borderColor: "border-red-500",
      bgColor: "bg-red-50",
      textColor: "#EF4444",
    },
    {
      id: "mau-thuong-thien",
      title: "MẪU THƯỢNG THIÊN",
      name: "CÔNG CHÚA LIỄU HẠNH",
      personalityId: "uu-tu",
      description: "Vị thần của sự sâu sắc và cảm xúc",
      image: "/Liễu Hạnh 1.svg",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-50",
      textColor: "#8B5CF6",
    },
  ];

  const selectedOption = personalityOptions.find(
    (option) => option.id === selectedPersonality
  );

  // Calculate highest score for comparison
  const getHighestScore = () => {
    if (!storeScores) return 0;
    const scores = [
      parseInt(storeScores.diemTinh || "0") || 0,
      parseInt(storeScores.vuiTuoi || "0") || 0,
      parseInt(storeScores.manhMe || "0") || 0,
      parseInt(storeScores.uuTu || "0") || 0,
    ];
    return Math.max(...scores);
  };

  const highestScore = getHighestScore();

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
  }, [selectedPersonality]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedPersonality(optionId);
  };

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    if (showGuardianResult) {
      router.replace(ROUTES.PUBLIC.MAP);
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
      <div className="w-full max-w-4xl bg-amber-100 border-3 border-[#835D26] rounded-lg p-5 mb-8">
        <div className="text-center  text-[#835D26] font-medium">
          <p className="text-lg md:text-xl font-extrabold mb-2">
            Tương ứng với khí chất, vị Thần Bảo Hộ của bạn là:
          </p>
          <p className="text-sm md:text-base font-extrabold italic text-[#835D26]">
            (Trong trường hợp bạn có nhiều hơn một khí chất có số điểm ngang
            nhau, vui lòng chọn một vị Thần Bảo Hộ theo mong muốn của bạn)
          </p>
        </div>
      </div>

      {/* Guardian Selection Cards */}
      <div className="w-full max-w-8xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {guardianDeities.map((guardian) => {
            const isSelected = selectedGuardian?.id === guardian.id;
            const hasSelection = selectedGuardian !== null;
            // Find the corresponding personality score for this guardian
            const correspondingPersonality = personalityOptions.find(
              (p) => p.id === guardian.personalityId
            );
            const currentScore =
              parseInt(correspondingPersonality?.number || "0") || 0;
            const isHighestScore = currentScore === highestScore;
            const shouldDim = hasSelection && !isSelected && !isHighestScore;
            const isClickable = !hasSelection || isSelected || isHighestScore;
            // Split title into lines of max 2 words per line
            const titleWords = guardian.title.split(" ");
            const titleLines: string[] = [];
            for (let i = 0; i < titleWords.length; i += 2) {
              titleLines.push(titleWords.slice(i, i + 2).join(" "));
            }
            // Split name into lines of max 2 words per line
            const nameWords = guardian.name.split(" ");
            const nameLines: string[] = [];
            for (let i = 0; i < nameWords.length; i += 2) {
              nameLines.push(nameWords.slice(i, i + 2).join(" "));
            }
            return (
              <div
                key={guardian.id}
                onClick={
                  isClickable ? () => setSelectedGuardian(guardian) : undefined
                }
                className={`relative transition-all duration-300 transform ${
                  isClickable
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed"
                } ${isSelected ? "scale-105" : "scale-100"} ${
                  shouldDim ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Guardian Card */}
                <div
                  className={`relative w-full h-80 md:h-96 lg:h-[28rem] border-4 ${guardian.borderColor} bg-amber-200/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Large Image aligned left */}
                  <div className="absolute inset-y-0 right-0 w-[68%] md:w-[72%] lg:w-[74%]">
                    <Image
                      src={guardian.image}
                      alt={guardian.name}
                      fill
                      sizes="(max-width: 768px) 68vw, (max-width: 1024px) 72vw, 74vw"
                      className="object-contain object-right"
                    />
                  </div>

                  {/* Overlay Text */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-3 text-left">
                      <div
                        className="text-sm md:text-base font-extrabold uppercase tracking-wide mb-2 leading-tight text-center"
                        style={{ color: guardian.textColor }}
                      >
                        {titleLines.map((line, idx) => (
                          <div key={`${guardian.id}-title-${idx}`}>{line}</div>
                        ))}
                      </div>
                      <div
                        className="mx-auto rounded-sm"
                        style={{
                          height: "6px",
                          width: "120px",
                          backgroundColor: guardian.textColor,
                        }}
                      />
                      <div
                        className="mt-2 text-2xl md:text-3xl font-bd-street-sign leading-tight text-center"
                        style={{ color: guardian.textColor }}
                      >
                        {nameLines.map((line, idx) => (
                          <div key={`${guardian.id}-name-${idx}`}>{line}</div>
                        ))}
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
        <div className="flex items-center justify-center">
          <button
            onClick={handleNext}
            disabled={!selectedGuardian}
            className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 ${
              selectedGuardian
                ? "hover:scale-105"
                : "opacity-50 cursor-not-allowed"
            }`}
            style={{ width: "180px", height: "50px" }}
          >
            <Image
              src="/Button.svg"
              alt="Tiếp tục"
              layout="fill"
              objectFit="contain"
              className="absolute"
            />
            <p className="relative z-10 text-[#835D26] font-semibold">
              Tiếp tục
            </p>
          </button>
        </div>
      </div>
    </div>
  );

  // Personality Selection Component
  const PersonalitySelection = () => {
    // Check if it's mobile landscape (width > height and width < 1024)
    const isMobileLandscape =
      isMobile && window.innerWidth > window.innerHeight;

    return (
      <div
        className={`${
          isMobileLandscape ? "flex flex-row" : "flex flex-col lg:flex-row"
        } gap-6 lg:gap-10 w-full items-center`}
      >
        {/* Left Side - Personality Options */}
        <div
          className={`${
            isMobileLandscape ? "w-1/2" : "w-full lg:w-1/2"
          } flex flex-col justify-center items-center ${
            isMobileLandscape ? "space-y-2" : "space-y-5"
          }`}
        >
          {/* Title */}
          <div className="text-center mb-4">
            <h1
              className={`${
                isMobileLandscape ? "text-lg" : "text-3xl lg:text-4xl"
              } font-extrabold uppercase`}
              style={{ color: selectedOption?.color || "#2B638F" }}
            >
              KHÍ CHẤT CỦA BẠN CÓ THIÊN HƯỚNG:
            </h1>
          </div>
          <div
            className={`flex flex-col lg:flex-col ${
              isMobileLandscape ? "gap-2" : "gap-4"
            }`}
          >
            {personalityOptions.map((option) => {
              const isSelected = selectedPersonality === option.id;
              const hasSelection = selectedPersonality !== null;
              const currentScore = parseInt(option.number) || 0;
              const isHighestScore = currentScore === highestScore;
              const shouldDim = hasSelection && !isSelected && !isHighestScore;
              const isClickable = !hasSelection || isSelected || isHighestScore;

              return (
                <div
                  key={option.id}
                  onClick={
                    isClickable
                      ? () => handleOptionSelect(option.id)
                      : undefined
                  }
                  className={`transition-all duration-300 ${
                    isClickable
                      ? "cursor-pointer hover:opacity-80"
                      : "cursor-not-allowed"
                  } ${shouldDim ? "opacity-40" : "opacity-100"}`}
                >
                  <div className="flex items-center">
                    {/* Left Frame - Text */}
                    <FrameText
                      text={option.title}
                      className={`text-base lg:text-lg transition-all duration-300 ${
                        isSelected ? "scale-105" : "scale-100"
                      }`}
                      textClassName={`transition-all duration-300`}
                      textStyle={{
                        fontSize: isMobile ? "22px" : "36px",
                        fontFamily: "var(--font-bd-street-sign)",
                        color: option.color,
                      }}
                      width={isMobile ? 220 : 320}
                      height={isMobile ? 50 : 70}
                    />

                    {/* Right Frame - Number */}
                    <FrameNumber
                      text={option.number}
                      className={`text-base lg:text-lg transition-all duration-300 ${
                        isSelected ? "scale-105" : "scale-100"
                      }`}
                      textClassName={`transition-all duration-300`}
                      textStyle={{
                        fontSize: isMobile ? "20px" : "30px",
                        fontFamily: "var(--font-bd-street-sign)",
                        color: option.color,
                      }}
                      width={isMobile ? 70 : 120}
                      height={isMobile ? 60 : 80}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Footer */}
          <div
            className={`${
              isMobileLandscape ? "mt-2" : "mt-6"
            } text-left self-start w-full max-w-[460px]`}
          >
            <span
              className={`${isMobileLandscape ? "text-xs" : "text-xs"}`}
              style={{ color: selectedOption?.color || "#6B7280" }}
            >
              *Kết quả mang tính chất tham khảo
            </span>
          </div>
        </div>

        {/* Right Side - Description */}
        <div
          className={`${
            isMobileLandscape ? "w-1/2" : "w-full lg:w-1/2"
          } flex justify-center items-center`}
        >
          {selectedOption && (
            <div
              className={`bg-gray-300/20 rounded-xl ${
                isMobileLandscape ? "p-3" : "p-8 lg:p-10"
              } border border-gray-300 ${
                isMobileLandscape
                  ? "max-h-[15rem]"
                  : "max-h-[24rem] lg:max-h-[30rem]"
              } w-full flex flex-col`}
            >
              <div
                className={`${
                  isMobileLandscape ? "text-sm" : "text-xl lg:text-2xl"
                } leading-relaxed whitespace-pre-line italic overflow-y-auto custom-scrollbar flex-1 pr-2`}
                style={{ color: selectedOption.color }}
              >
                {selectedOption.description}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 ">
      {/* When not showing guardian, keep content inside framed container */}
      {!showGuardianResult && (
        <div
          className="relative bg-amber-100/80 border-3 rounded-2xl max-w-5xl md:max-w-6xl w-full shadow-2xl"
          style={{ borderColor: selectedOption?.color || "#2B638F" }}
        >
          {/* Padded content wrapper */}
          <div className="p-5 md:p-8 lg:p-10">
            {/* This container hides overflow */}
            <div
              className={`relative overflow-hidden ${
                isMobile && window.innerWidth > window.innerHeight
                  ? "min-h-[20rem] max-h-[25rem]"
                  : "min-h-[30rem] md:min-h-[38rem] lg:min-h-[44rem]"
              }`}
            >
              {/* Personality slides in from left */}
              <div
                className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
                  mounted ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <PersonalitySelection />
              </div>
            </div>
          </div>

          {/* Edge-aligned navigation button */}
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
        </div>
      )}

      {/* Guardian section rendered independently and full-width */}
      {showGuardianResult && (
        <div className="w-full">
          <GuardianDeityResult />
        </div>
      )}
    </div>
  );
};

export default PersonalityResultPage;
