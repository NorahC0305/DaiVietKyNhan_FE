"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import QuestionModal from "@components/Molecules/Popup/QuestionModal";
import WrongAnswer from "@components/Molecules/Popup/WrongAnswer";
import { toast } from "react-toastify";
import userAnswerLogService from "@services/user-answer-log";
import { IUserAnswerLogRequest } from "@models/user-answer-log/request";
import { IUserSkipQuestionByCoinsRequest } from "@models/user-answer-log/request";
import KyNhanResult, { KyNhan } from "@components/Molecules/Popup/KyNhanResult";

export default function FixedScrollsPageResponsive({
  backgroundImage,
  scrollPositions,
  questions: questionsWithUser,
  answeredQuestionIds,
}: ICOMPONENTS.MapRegionDetailProps) {
  const router = useRouter();
  // Đặt thành `false` để ẩn đường viền và nhãn gỡ lỗi
  const DEBUG_HOTSPOTS = false;
  const [open, setOpen] = useState(false);
  // State cho question modal
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  // State cho wrong answer modal
  const [isWrongAnswerModalOpen, setIsWrongAnswerModalOpen] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  // State cho KyNhanResult modal
  const [isKyNhanResultModalOpen, setIsKyNhanResultModalOpen] = useState(false);
  const [kyNhanSummaries, setKyNhanSummaries] = useState<KyNhan[]>([]);
  const [kyNhanResultData, setKyNhanResultData] = useState<{
    summary: string;
    points: number;
  } | null>(null);

  // State để track các câu hỏi đã được trả lời
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set(answeredQuestionIds)
  );

  // Không cần hàm kiểm tra unlock nữa - tất cả đều mở

  // Hàm kiểm tra câu hỏi đã trả lời đúng chưa
  const isQuestionAnswered = (question: any) => {
    return (
      question?.userAnswerLogs &&
      question.userAnswerLogs.length > 0 &&
      question.userAnswerLogs.some((log: any) => log.isCorrect === true)
    );
  };

  // Hàm lấy câu trả lời cũ của người dùng
  const getPreviousAnswer = (question: any) => {
    if (question?.userAnswerLogs && question.userAnswerLogs.length > 0) {
      const correctAnswer = question.userAnswerLogs.find(
        (log: any) => log.isCorrect === true
      );
      return correctAnswer?.text || "";
    }
    return "";
  };

  // Hàm xử lý khi click vào cuộn giấy - đơn giản hóa
  const handleScrollClick = (scrollIndex: number) => {
    const question = questionsWithUser[scrollIndex];

    if (question) {
      // Kiểm tra xem câu hỏi đã được trả lời đúng chưa
      const isAnswered =
        isQuestionAnswered(question) || answeredQuestions.has(question.id);

      if (
        isAnswered &&
        question?.kynhanSummaries &&
        question.kynhanSummaries.length > 0
      ) {
        // Nếu đã trả lời đúng và có kynhanSummaries, hiển thị KyNhanResult popup
        const transformedKyNhan: KyNhan[] = question.kynhanSummaries.map(
          (summary: any) => ({
            id: summary.id,
            src: summary.imgUrl,
            alt: `Kỳ nhân ${summary.kyNhanId}`,
            name: `Kỳ nhân ${summary.kyNhanId}`,
          })
        );

        setKyNhanSummaries(transformedKyNhan);
        setKyNhanResultData({
          summary:
            question.kynhanSummaries[0]?.summary ||
            "Bạn đã trả lời đúng và thu thập được kỳ ấn của kỳ nhân này.",
          points: question.point || 0,
        });
        setSelectedQuestion(question);
        setIsKyNhanResultModalOpen(true);
      } else {
        // Nếu chưa trả lời hoặc không có kynhanSummaries, hiển thị question modal bình thường
        setSelectedQuestion(question);
        setIsQuestionModalOpen(true);
      }
    } else {
      toast.warning(`Không tìm thấy câu hỏi với index: ${scrollIndex}`);
    }
  };

  // Hàm xử lý khi submit câu trả lời
  const handleQuestionSubmit = async (text: string[], questionId: number) => {
    if (!selectedQuestion || text.length === 0) {
      return;
    }

    setIsSubmittingAnswer(true);

    try {
      // Gửi một request duy nhất với text là mảng
      const requestData: IUserAnswerLogRequest = {
        questionId: questionId,
        text: text,
      };

      const response = await userAnswerLogService.answerQuestion(requestData);
      // console.log(response);
      if (
        response &&
        (response.statusCode === 200 || response.statusCode === 201) &&
        response.data
      ) {
        if (response.data.isCorrect) {
          // Trả lời đúng - hiện toast và cập nhật state
          toast.success("Chính xác! Bạn đã trả lời đúng.");
          setAnsweredQuestions((prev) => {
            const newSet = new Set([...prev, selectedQuestion.id]);
            return newSet;
          });

          // Transform kynhanSummaries to KyNhan format for the popup
          if (
            selectedQuestion?.kynhanSummaries &&
            selectedQuestion.kynhanSummaries.length > 0
          ) {
            const transformedKyNhan: KyNhan[] =
              selectedQuestion.kynhanSummaries.map((summary: any) => ({
                id: summary.id,
                src: summary.imgUrl,
                alt: `Kỳ nhân ${summary.kyNhanId}`,
                name: `Kỳ nhân ${summary.kyNhanId}`, // You might want to get the actual name from somewhere else
              }));
            setKyNhanSummaries(transformedKyNhan);

            // Store the result data before closing the modal
            setKyNhanResultData({
              summary:
                selectedQuestion.kynhanSummaries[0]?.summary ||
                "Bạn đã trả lời đúng và thu thập được kỳ ấn của kỳ nhân này.",
              points: selectedQuestion.point || 0,
            });
            setIsKyNhanResultModalOpen(true);
          }

          // Đóng question modal
          setIsQuestionModalOpen(false);
          setSelectedQuestion(null);
        } else {
          // Trả lời sai - hiện wrong answer modal
          setIsQuestionModalOpen(false);
          setIsWrongAnswerModalOpen(true);
        }
      } else {
        // Handle error response
        toast.error(response?.message || "Có lỗi xảy ra khi gửi câu trả lời.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Có lỗi xảy ra khi gửi câu trả lời. Vui lòng thử lại.");
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsQuestionModalOpen(false);
    setSelectedQuestion(null);
  };

  // Hàm xử lý wrong answer modal
  const handleCloseWrongAnswerModal = () => {
    setIsWrongAnswerModalOpen(false);
  };

  const handleRetryAnswer = () => {
    setIsWrongAnswerModalOpen(false);
    // Mở lại question modal với cùng câu hỏi
    setIsQuestionModalOpen(true);
  };

  const handleUseCoins = async (questionId: number) => {
    if (!questionId) {
      toast.error("Không tìm thấy ID câu hỏi");
      return;
    }

    // Optimistic update: Update UI immediately for better UX
    const previousAnsweredQuestions = answeredQuestions;
    setAnsweredQuestions((prev) => {
      const newSet = new Set([...prev, questionId]);
      return newSet;
    });

    try {
      const requestData: IUserSkipQuestionByCoinsRequest = {
        questionId: questionId,
      };

      const response = await userAnswerLogService.skipQuestionByCoins(
        requestData
      );

      if (
        response &&
        (response.statusCode === 200 || response.statusCode === 201)
      ) {
        // Successfully skipped the question with coins
        toast.success("Đã sử dụng 500 xu để vượt qua câu hỏi");

        // Find the question that was skipped to get its kynhanSummaries
        const skippedQuestion = questionsWithUser.find(
          (q) => q.id === questionId
        );

        if (
          skippedQuestion?.kynhanSummaries &&
          skippedQuestion.kynhanSummaries.length > 0
        ) {
          // Transform kynhanSummaries to KyNhan format for the popup
          const transformedKyNhan: KyNhan[] =
            skippedQuestion.kynhanSummaries.map((summary: any) => ({
              id: summary.id,
              src: summary.imgUrl,
              alt: `Kỳ nhân ${summary.kyNhanId}`,
              name: `Kỳ nhân ${summary.kyNhanId}`,
            }));

          setKyNhanSummaries(transformedKyNhan);
          setKyNhanResultData({
            summary:
              skippedQuestion.kynhanSummaries[0]?.summary ||
              "Bạn đã sử dụng xu để vượt qua và thu thập được kỳ ấn của kỳ nhân này.",
            points: skippedQuestion.point || 0,
          });
          setSelectedQuestion(skippedQuestion);

          // Show KyNhanResult popup
          setIsKyNhanResultModalOpen(true);
        }

        // Close the wrong answer modal
        setIsWrongAnswerModalOpen(false);
        // Don't clear selectedQuestion here as it's needed for KyNhanResult modal
      } else {
        // Rollback optimistic update on error
        setAnsweredQuestions(previousAnsweredQuestions);
        toast.error(
          response?.message ||
            "Có lỗi xảy ra khi sử dụng xu để vượt qua câu hỏi."
        );
      }
    } catch (error) {
      // Rollback optimistic update on error
      setAnsweredQuestions(previousAnsweredQuestions);
      console.error("Error skipping question with coins:", error);
      toast.error("Có lỗi xảy ra khi sử dụng xu. Vui lòng thử lại.");
    }
  };

  // Handler for closing KyNhanResult modal
  const handleCloseKyNhanResult = () => {
    setIsKyNhanResultModalOpen(false);
    setKyNhanSummaries([]);
    setKyNhanResultData(null);
    setSelectedQuestion(null);
  };

  // Handler for going to library with search query
  const handleGoToLibrary = () => {
    // Get the first KyNhan ID from kyNhanSummaries to search for
    if (kyNhanSummaries.length > 0) {
      const firstKyNhanId = kyNhanSummaries[0].id;
      // Navigate to library with search parameter and replace current history entry
      router.replace(`/library?search=${firstKyNhanId}`);
    } else {
      // Fallback to library without search if no kyNhan data
      router.replace("/library");
    }
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
        {/* <KyNhanResult isOpen={true} onClose={() => {}} title="Kết quả" content="Bạn đã trả lời đúng." points={100} kyNhan={[]} /> */}

        {/* Wrapper 50vh: mọi toạ độ top/left tính trong nửa dưới */}
        <div className="relative w-full h-full z-10 border-2">
          {scrollPositions?.map(
            (pos: ICOMPONENTS.ScrollPosition, idx: number) => {
              const question = questionsWithUser[idx];
              const isAnswered = question
                ? isQuestionAnswered(question) ||
                  answeredQuestions.has(question.id)
                : false;

              return (
                <motion.div
                  key={idx}
                  // ⭐ THAY ĐỔI CHÍNH: Kích thước responsive, không còn h-auto
                  className="absolute drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)] w-[20vw] sm:w-[120px] md:w-[150px] lg:w-[180px]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    // transform: `rotate(${pos.rotate})`,
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

      {/* Question Modal */}
      <QuestionModal
        question={selectedQuestion}
        isOpen={isQuestionModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleQuestionSubmit}
        isSubmitting={isSubmittingAnswer}
        isAnswered={
          selectedQuestion ? answeredQuestions.has(selectedQuestion.id) : false
        }
      />

      {/* Wrong Answer Modal */}
      <WrongAnswer
        isOpen={isWrongAnswerModalOpen}
        onClose={handleCloseWrongAnswerModal}
        onRetry={handleRetryAnswer}
        onUseCoins={handleUseCoins}
        questionId={selectedQuestion?.id}
        coinCost={500}
        penaltyPoints={20}
      />

      {/* KyNhanResult Modal */}
      <KyNhanResult
        isOpen={isKyNhanResultModalOpen}
        onClose={handleCloseKyNhanResult}
        title="Bạn đã tìm ra danh tính của vị Kỳ Nhân này. Bạn được cộng 100 điểm."
        content={
          kyNhanResultData?.summary ||
          "Bạn đã trả lời đúng và thu thập được kỳ ấn của kỳ nhân này."
        }
        points={kyNhanResultData?.points}
        kyNhan={kyNhanSummaries}
        onGoToLibrary={handleGoToLibrary}
      />
    </main>
  );
}
