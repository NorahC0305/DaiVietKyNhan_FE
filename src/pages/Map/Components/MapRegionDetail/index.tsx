"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Circle } from "lucide-react";
import QuestionModal from "@/components/Atoms/QuestionModal";
import { toast } from "react-toastify";
import RedeemModal from "@components/Atoms/RedeemModal";
import AchievementsModal from "@components/Atoms/AchievementsModal";

export default function FixedScrollsPageResponsive({
  backgroundImage,
  scrollPositions,
  questions,
  answeredQuestionIds,
}: ICOMPONENTS.MapRegionDetailProps) {
  // Đặt thành `false` để ẩn đường viền và nhãn gỡ lỗi
  const DEBUG_HOTSPOTS = false;
  const [open, setOpen] = useState(false);
  // State cho question modal
  const [selectedQuestion, setSelectedQuestion] =
    useState<ICOMPONENTS.Question | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // State để track các câu hỏi đã được trả lời
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set(answeredQuestionIds)
  );

  // Không cần hàm kiểm tra unlock nữa - tất cả đều mở

  // Hàm xử lý khi click vào cuộn giấy - đơn giản hóa
  const handleScrollClick = (scrollIndex: number) => {
    const question = questions[scrollIndex];

    if (question) {
      setSelectedQuestion(question);
      setIsQuestionModalOpen(true);
    } else {
      toast.warning(`Không tìm thấy câu hỏi với index: ${scrollIndex}`);
    }
  };

  // Hàm xử lý khi submit câu trả lời
  const handleQuestionSubmit = (answerText: string) => {
    if (selectedQuestion) {
      setAnsweredQuestions((prev) => {
        const newSet = new Set([...prev, selectedQuestion.id]);
        return newSet;
      });
      toast.success("Cập nhật câu trả lời thành công");
    }

    // TODO: gửi API kiểm tra đáp án khi BE sẵn sàng
    toast.success("Đã gửi câu trả lời để kiểm tra");
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
        {/* <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/Các cuộn giấy.png"
            alt="Background scroll papers template"
            fill
            className="object-contain"
            priority
          />
        </div> */}

        {/* Wrapper 50vh: mọi toạ độ top/left tính trong nửa dưới */}
        <div className="relative w-full h-full z-10">
          {scrollPositions?.map(
            (pos: ICOMPONENTS.ScrollPosition, idx: number) => {
              const question = questions[idx];
              const isAnswered = question
                ? answeredQuestions.has(question.id)
                : false;

              return (
                <motion.div
                  key={idx}
                  // ⭐ THAY ĐỔI CHÍNH: Kích thước responsive, không còn h-auto
                  className="absolute drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)] w-[20vw] sm:w-[120px] md:w-[150px] lg:w-[180px]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotate})`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
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
                      className={`absolute inset-0 cursor-pointer ${
                        DEBUG_HOTSPOTS
                          ? "border-2 border-red-500/70 bg-red-500/10 hover:bg-red-500/20"
                          : "bg-transparent"
                      }`}
                      onClick={() => handleScrollClick(idx)}
                    />

                    {DEBUG_HOTSPOTS && (
                      <span className="absolute -top-3 -left-3 text-xs font-bold text-red-600 bg-white/80 px-1 rounded z-10">
                        {idx + 1}
                      </span>
                    )}

                    {/* Trạng thái câu hỏi */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div
                        className={`rounded-full shadow-lg border flex items-center justify-center
                       w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] lg:w-[28px] lg:h-[28px] xl:w-[32px] xl:h-[32px]
                       ${
                         isAnswered
                           ? "bg-green-500 border-green-600"
                           : "bg-white/95 border-gray-300"
                       }`}
                      >
                        {isAnswered ? (
                          <Check className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] xl:w-[18px] xl:h-[18px] text-white" />
                        ) : (
                          <Circle className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px] xl:w-[18px] xl:h-[18px] text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Không cần lock icon nữa - tất cả đều có thể click */}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
      {/* <RedeemModal  isOpen={true}
        onClose={() => setOpen(false)}
        onRedeem={(tierId) => {
          // call API here
          console.log("redeem", tierId);
          setOpen(false);
        }}
        tiers={[
          {
            id: "t1",
            canRedeem: true,
            cost: { unit: "POINT", amount: 300 },
            reward: { unit: "COIN", amount: 150 },
          },
          {
            id: "t2",
            canRedeem: true,
            cost: { unit: "POINT", amount: 500 },
            reward: { unit: "COIN", amount: 250 },
          },
          {
            id: "t3",
            canRedeem: false,
            cost: { unit: "COIN", amount: 6000 },
            reward: { unit: "TEXT", label: "Combo quà tặng đặc biệt" },
          },
        ]} /> */}

        <AchievementsModal
          isOpen={true}
          onClose={() => setOpen(false)}
          onClaim={(achievementId) => {
            // call API here
            console.log("claim", achievementId);
            setOpen(false);
          }}
        achievements={[
          {
            id: "a1",
            title: "Đạt được 100 xu",
            description: "Đạt được 100 xu",
            canClaim: true,
          },
          {
            id: "a2",
            title: "Đạt được 100 xu",
            description: "Đạt được 100 xu",
            canClaim: true,
          },
          {
            id: "a3",
            title: "Đạt được 100 xu",
            description: "Đạt được 100 xu",
            canClaim: true,
          },
          {
            id: "a4",
            title: "Đạt được 100 xu",
            description: "Đạt được 100 xu",
            canClaim: false,
          },
        ]}
        />


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
