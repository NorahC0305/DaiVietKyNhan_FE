"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import InputAnswer from "@components/Molecules/Popup/InputAnswer";
import { Loader2 } from "lucide-react";

export default function QuestionModal({
  question,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  isAnswered = false,
}: ICOMPONENTS.QuestionModalProps) {
  const [answerText, setAnswerText] = useState("");
  const [secondAnswerText, setSecondAnswerText] = useState("");

  // Kiểm tra câu hỏi đã trả lời đúng chưa
  const isQuestionAnswered = (question: any) => {
    return (
      question?.userAnswerLogs &&
      question.userAnswerLogs.length > 0 &&
      question.userAnswerLogs.some((log: any) => log.isCorrect === true)
    );
  };

  // Lấy câu trả lời cũ của người dùng
  const getPreviousAnswer = (question: any) => {
    if (question?.userAnswerLogs && question.userAnswerLogs.length > 0) {
      const correctAnswer = question.userAnswerLogs.find(
        (log: any) => log.isCorrect === true
      );
      return correctAnswer?.text || "";
    }
    return "";
  };

  // Lấy 2 câu trả lời cũ của người dùng (cho answerOptionType: "TWO")
  const getPreviousAnswers = (question: any) => {
    if (question?.userAnswerLogs && question.userAnswerLogs.length > 0) {
      const correctAnswers = question.userAnswerLogs.filter(
        (log: any) => log.isCorrect === true
      );
      // Giả sử câu trả lời đầu tiên là answer đầu, câu trả lời thứ 2 là answer thứ 2
      return {
        firstAnswer: correctAnswers[0]?.text || "",
        secondAnswer: correctAnswers[1]?.text || "",
      };
    }
    return { firstAnswer: "", secondAnswer: "" };
  };

  // Sử dụng prop isAnswered từ parent thay vì chỉ dựa vào server data
  const isQuestionAnsweredFromServer = question ? isQuestionAnswered(question) : false;
  const finalIsAnswered = isAnswered || isQuestionAnsweredFromServer;
  const previousAnswer = question ? getPreviousAnswer(question) : "";
  const previousAnswers = question ? getPreviousAnswers(question) : { firstAnswer: "", secondAnswer: "" };

  // Xác định xem có phải loại TWO không
  const isTwoAnswerType = question?.answerOptionType === "TWO";

  // Set câu trả lời cũ khi modal mở và câu hỏi đã được trả lời
  useEffect(() => {
    if (isOpen && question && finalIsAnswered) {
      if (isTwoAnswerType) {
        setAnswerText(previousAnswers.firstAnswer);
        setSecondAnswerText(previousAnswers.secondAnswer);
      } else {
        setAnswerText(previousAnswer);
      }
    } else if (isOpen && question && !finalIsAnswered) {
      setAnswerText("");
      setSecondAnswerText("");
    }
  }, [isOpen, question, finalIsAnswered, previousAnswer, previousAnswers, isTwoAnswerType]);

  const handleSubmit = () => {
    if (question) {
      if (isTwoAnswerType) {
        onSubmit(answerText.trim(), secondAnswerText.trim());
      } else {
        onSubmit(answerText.trim());
      }
    }
  };

  const handleClose = () => {
    setAnswerText("");
    setSecondAnswerText("");
    onClose();
  };

  if (!question) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Trung bình";
      case "hard":
        return "Khó";
      default:
        return difficulty;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal with parchment background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl sm:max-w-5xl mx-2 sm:mx-4"
          >
            {/* Parchment frame container */}
            <div className="relative w-full overflow-hidden">
              {/* Maintain 16:9 aspect ratio and render frame image */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/frame1.png"
                  alt="Khung giấy"
                  fill
                  priority
                  sizes="(max-width: 768px) 95vw, (max-width: 1280px) 100vw, 1280px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Content overlay INSIDE a safe area (debug border visible) */}
              <div
                className="absolute flex flex-col items-center justify-between py-2 sm:py-4"
                style={{
                  top: "12%",
                  right: "8%",
                  bottom: "15%",
                  left: "8%",
                }}
              >
                {/* Debug border for the safe content region */}
                {/* <div className="absolute inset-0 border-2 border-rose-500/70 pointer-events-none rounded-sm" /> */}

                <div className="w-full max-w-3xl mx-auto text-center space-y-2 sm:space-y-4 overflow-y-auto px-2 sm:px-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#835D26] font-bd-street-sign leading-tight">
                    CÂU HỎI
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mx-auto max-w-full sm:max-w-2xl md:max-w-3xl px-1">
                    {question.text || question.content}
                  </p>
                </div>

                {/* Answer area using InputAnswer component */}
                <div className="w-full flex flex-col items-center gap-3 sm:gap-4 mt-2 sm:mt-4">
                  {isTwoAnswerType ? (
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full justify-center">
                      <InputAnswer
                        value={answerText}
                        onChange={setAnswerText}
                        disabled={finalIsAnswered}
                        placeholder="Đáp án 1..."
                      />
                      <InputAnswer
                        value={secondAnswerText}
                        onChange={setSecondAnswerText}
                        disabled={finalIsAnswered}
                        placeholder="Đáp án 2..."
                      />
                    </div>
                  ) : (
                    <InputAnswer
                      value={answerText}
                      onChange={setAnswerText}
                      disabled={finalIsAnswered}
                    />
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                    {finalIsAnswered ? (
                      <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 cursor-pointer bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm sm:text-base"
                      >
                        Đóng
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={
                          !answerText.trim() || 
                          isSubmitting ||
                          (isTwoAnswerType && !secondAnswerText.trim())
                        }
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 cursor-pointer bg-[#835D26] text-white rounded-lg font-medium hover:bg-[#835D26]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
                      >
                        {isSubmitting && <Loader2 className="animate-spin" />}
                        {isSubmitting ? "Đang gửi..." : "Gửi"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
