"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle } from "lucide-react";
import { QuestionModalProps } from "@/types/IComponents/Question";
import { useState } from "react";

export default function QuestionModal({
  question,
  isOpen,
  onClose,
  onSubmit,
}: QuestionModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (optionId: number) => {
    if (!showResult) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null && question) {
      const correct =
        selectedOption === question.options[question.correctAnswer - 1].id;
      setIsCorrect(correct);
      setShowResult(true);
      onSubmit(selectedOption, correct);
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-200">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {question.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  {getDifficultyText(question.difficulty)}
                </span>
              </div>

              <p className="text-sm text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block">
                {question.category}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {question.content}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrectOption =
                    option.id ===
                    question.options[question.correctAnswer - 1].id;
                  const showCorrect = showResult && isCorrectOption;
                  const showIncorrect =
                    showResult && isSelected && !isCorrectOption;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={showResult}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        showResult
                          ? showCorrect
                            ? "border-green-500 bg-green-50 text-green-800"
                            : showIncorrect
                            ? "border-red-500 bg-red-50 text-red-800"
                            : isCorrectOption
                            ? "border-green-500 bg-green-50 text-green-800"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                          : isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                      } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                              showResult
                                ? showCorrect
                                  ? "bg-green-500 text-white"
                                  : showIncorrect
                                  ? "bg-red-500 text-white"
                                  : isCorrectOption
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                                : isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium">{option.text}</span>
                        </div>

                        {showResult && (
                          <div className="flex items-center">
                            {showCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {showIncorrect && (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showResult && question.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                >
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Giải thích:
                  </h4>
                  <p className="text-blue-700 leading-relaxed">
                    {question.explanation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {showResult ? (
                    <span
                      className={`font-medium ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect
                        ? "🎉 Chúc mừng! Bạn đã trả lời đúng!"
                        : "😔 Chưa đúng rồi, hãy thử lại!"}
                    </span>
                  ) : (
                    "Hãy chọn một đáp án"
                  )}
                </div>

                <div className="flex space-x-3">
                  {!showResult ? (
                    <button
                      onClick={handleSubmit}
                      disabled={selectedOption === null}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Trả lời
                    </button>
                  ) : (
                    <button
                      onClick={handleClose}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      Đóng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
