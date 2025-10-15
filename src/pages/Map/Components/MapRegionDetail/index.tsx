"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lock } from "lucide-react";
import QuestionModal from "@/components/Atoms/QuestionModal";
import { getQuestionById } from "@/constants/mockdata/questions";
import { Question } from "@/types/IComponents/Question";

interface MapRegionDetailProps {
  backgroundImage?: string;
}

export default function FixedScrollsPageResponsive({
  backgroundImage,
}: MapRegionDetailProps) {
  // Đặt thành `false` để ẩn đường viền và nhãn gỡ lỗi
  const DEBUG_HOTSPOTS = false;
  console.log(backgroundImage);

  // State cho question modal
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // State để track các câu hỏi đã trả lời đúng (unlocked questions)
  const [unlockedQuestions, setUnlockedQuestions] = useState<Set<number>>(
    new Set([1])
  ); // Câu đầu tiên luôn được mở khóa
  const scrollPositions = [
    { top: "25%", left: "22%", rotate: "-12deg" },
    { top: "64%", left: "22%", rotate: "-8deg" },
    { top: "8%", left: "32%", rotate: "-14deg" },
    { top: "34%", left: "30%", rotate: "-10deg" },
    { top: "75%", left: "32%", rotate: "-12deg" },
    { top: "22%", left: "41%", rotate: "-9deg" },
    { top: "48%", left: "46%", rotate: "-13deg" },
    { top: "70%", left: "42%", rotate: "-11deg" },
    { top: "26%", left: "52%", rotate: "-8deg" },
    { top: "70%", left: "55%", rotate: "-12deg" },
    { top: "2%", left: "58%", rotate: "-12deg" },
    { top: "40%", left: "60%", rotate: "-10deg" },
    { top: "20%", left: "66%", rotate: "-9deg" },
    { top: "60%", left: "72%", rotate: "-11deg" },
  ];

  // Hàm kiểm tra câu hỏi có được mở khóa không
  const isQuestionUnlocked = (questionId: number) => {
    return unlockedQuestions.has(questionId);
  };

  // Hàm xử lý khi click vào cuộn giấy
  const handleScrollClick = (scrollIndex: number) => {
    const questionId = scrollIndex + 1; // ID bắt đầu từ 1

    // Kiểm tra xem câu hỏi có được mở khóa không
    if (!isQuestionUnlocked(questionId)) {
      console.log(`Câu hỏi ${questionId} chưa được mở khóa`);
      return;
    }

    const question = getQuestionById(questionId);

    if (question) {
      setSelectedQuestion(question);
      setIsQuestionModalOpen(true);
      console.log(
        `Đã click vào cuộn giấy số ${
          scrollIndex + 1
        }, hiển thị câu hỏi ID: ${questionId}`
      );
    } else {
      console.warn(`Không tìm thấy câu hỏi với ID: ${questionId}`);
    }
  };

  // Hàm xử lý khi submit câu trả lời
  const handleQuestionSubmit = (
    selectedOptionId: number,
    isCorrect: boolean
  ) => {
    console.log("Đã chọn đáp án:", selectedOptionId, "Kết quả:", isCorrect);

    if (isCorrect && selectedQuestion) {
      // Mở khóa câu hỏi tiếp theo
      const nextQuestionId = selectedQuestion.id + 1;
      if (nextQuestionId <= 14) {
        // Giới hạn số câu hỏi
        setUnlockedQuestions((prev) => {
          const newSet = new Set([...prev, nextQuestionId]);
          console.log("New unlocked questions:", Array.from(newSet));
          return newSet;
        });
        console.log(`✅ Đã mở khóa câu hỏi ${nextQuestionId}`);
      } else {
        console.log("❌ Đã hết câu hỏi (nextQuestionId > 14)");
      }
    } else {
      console.log(
        "❌ Không mở khóa - isCorrect:",
        isCorrect,
        "selectedQuestion:",
        !!selectedQuestion
      );
    }

    // Ở đây có thể thêm logic lưu kết quả, gửi API, etc.
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsQuestionModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#f0e8d8]">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Region background"
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      {/* Chỉ hiển thị ở nửa dưới màn hình */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] overflow-hidden z-10">
        {/* Background layer với ảnh các cuộn giấy để làm mẫu định vị */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/Các cuộn giấy.png"
            alt="Background scroll papers template"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Wrapper 50vh: mọi toạ độ top/left tính trong nửa dưới */}
        <div className="relative w-full h-full z-10">
          {scrollPositions.map((pos, idx) => {
            const questionId = idx + 1;
            const isUnlocked = isQuestionUnlocked(questionId);

            return (
              <motion.div
                key={idx}
                // ⭐ THAY ĐỔI CHÍNH: Kích thước responsive, không còn h-auto
                className={`absolute drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)] w-[20vw] sm:w-[120px] md:w-[150px] lg:w-[180px] ${
                  !isUnlocked ? "opacity-40 grayscale" : ""
                }`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: `rotate(${pos.rotate})`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={
                  isUnlocked
                    ? {
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }
                    : {}
                }
                whileTap={
                  isUnlocked
                    ? {
                        scale: 0.95,
                        transition: { duration: 0.1 },
                      }
                    : {}
                }
              >
                {/* ⭐ THAY ĐỔI CHÍNH: Container của ảnh giờ có tỷ lệ khung hình cố định */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "180 / 70" }}
                >
                  <Image
                    src="/cuộn giấy cuộn lại.svg"
                    alt={`Cuộn giấy ${idx + 1}`}
                    fill
                    className="object-contain pointer-events-none select-none"
                    sizes="(max-width: 640px) 20vw, (max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
                    priority
                  />

                  <button
                    aria-label={`Vị trí cuộn giấy ${idx + 1}`}
                    className={`absolute inset-0 ${
                      isUnlocked ? "cursor-pointer" : "cursor-not-allowed"
                    } ${
                      DEBUG_HOTSPOTS
                        ? "border-2 border-red-500/70 bg-red-500/10 hover:bg-red-500/20"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleScrollClick(idx)}
                    disabled={!isUnlocked}
                  />

                  {DEBUG_HOTSPOTS && (
                    <span className="absolute -top-3 -left-3 text-xs font-bold text-red-600 bg-white/80 px-1 rounded z-10">
                      {idx + 1}
                    </span>
                  )}

                  {/* Số thứ tự câu hỏi */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div
                      className="bg-white/95 rounded-full shadow-lg border border-gray-300 flex items-center justify-center
                       w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[28px] lg:h-[28px] xl:w-[32px] xl:h-[32px]"
                    >
                      <span
                        className="font-bold text-gray-800
                         text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]"
                      >
                        {questionId}
                      </span>
                    </div>
                  </div>

                  {/* Lock icon cho câu hỏi chưa mở khóa */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div
                        className="bg-white/90 rounded-full shadow-lg
                         w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[28px] lg:h-[28px] xl:w-[32px] xl:h-[32px]
                         flex items-center justify-center"
                      >
                        <Lock className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] xl:w-[18px] xl:h-[18px] text-gray-600" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Question Modal */}
      <QuestionModal
        question={selectedQuestion}
        isOpen={isQuestionModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleQuestionSubmit}
      />
    </main>
  );
}
