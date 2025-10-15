"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function QuestionModal({
  question,
  isOpen,
  onClose,
  onSubmit,
}: ICOMPONENTS.QuestionModalProps) {
  const [answerText, setAnswerText] = useState("");

  const handleSubmit = () => {
    if (question) {
      onSubmit(answerText.trim());
    }
  };

  const handleClose = () => {
    setAnswerText("");
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

              {/* Text input answer */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Câu trả lời của bạn
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  placeholder="Nhập câu trả lời..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Nhập câu trả lời và bấm Gửi</div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!answerText.trim()}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Gửi
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
