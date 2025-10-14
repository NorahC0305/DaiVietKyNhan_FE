"use client";

import Image from "next/image";
import { useState } from "react";
import { Progress } from "@/components/Atoms/ui/progress";

// --- DỮ LIỆU GIẢ LẬP CHO BÀI TEST ---
const TOTAL_QUESTIONS = 16;
const questions = [
  { id: 1, text: "Tôi thường cố gắng để có thể vượt qua mọi khó khăn." },
  { id: 2, text: "Tôi hiếm khi cảm thấy buồn bã." },
  { id: 3, text: 'Tôi là "linh hồn" của các buổi tiệc.' },
  // Vui lòng thêm các câu hỏi còn lại vào đây
  { id: 4, text: "Tôi dễ dàng cảm thông với người khác." },
  { id: 5, text: "Tôi luôn giữ cho không gian xung quanh gọn gàng, ngăn nắp." },
  { id: 6, text: "Tôi ít khi lo lắng về những điều tồi tệ có thể xảy ra." },
  { id: 7, text: "Tôi có trí tưởng tượng phong phú." },
  { id: 8, text: "Tôi thường không nói nhiều với người lạ." },
  { id: 9, text: "Tôi tin rằng nghệ thuật và cái đẹp là quan trọng." },
  { id: 10, text: "Tôi thường né tránh các cuộc tranh luận." },
  { id: 11, text: "Tôi bị cuốn hút bởi những ý tưởng mới lạ và độc đáo." },
  { id: 12, text: "Tôi cảm thấy thoải mái khi là trung tâm của sự chú ý." },
  {
    id: 13,
    text: "Tôi có xu hướng lan tỏa niềm vui đến mọi người xung quanh.",
  },
  { id: 14, text: "Tôi thường cố gắng làm hài lòng tất cả mọi người." },
  { id: 15, text: "Tôi không bận tâm nhiều lắm khi bị người khác chỉ trích." },
  { id: 16, text: "Tôi có một vốn từ vựng phong phú." },
];

const answerOptions = [
  {
    id: 1,
    text: "Hoàn toàn không đồng ý",
    color: "EF493D",
    borderColor: "EF493D",
  },
  {
    id: 2,
    text: "Không đồng ý",
    color: "F08D63",
    borderColor: "F08D63",
  },
  {
    id: 3,
    text: "Trung lập",
    color: "FDBC44",
    borderColor: "FDBC44",
  },
  {
    id: 4,
    text: "Đồng ý",
    color: "A5C53E",
    borderColor: "A5C53E",
  },
  {
    id: 5,
    text: "Hoàn toàn đồng ý",
    color: "41821E",
    borderColor: "41821E",
  },
];

// --- COMPONENT CON: TRANG MỞ ĐẦU ---
const IntroComponent = ({ onStartTest }: { onStartTest: () => void }) => (
  <div className="w-full max-w-2xl mx-auto bg-amber-200/50 border-3 border-[#835D26] rounded-2xl p-6 text-center shadow-lg animate-fade-in">
    <p className="text-[#835D26] text-lg font-bold mb-6 leading-relaxed">
      Trước khi bước vào Kỳ Giới để KHAI NHÂN MỞ ẤN, Kỳ Chủ hãy tham gia nghi
      thức Tìm Thần Bảo Hộ. Chỉ thông qua một bài kiểm tra nho nhỏ, khí chất của
      Kỳ Chủ sẽ được tự động kết nối với vị thần phù hợp trong Tứ Bất Tử để soi
      đường chỉ lối xuyên suốt hành trình.
    </p>
    <div className="flex items-center justify-center">
      <button
        onClick={onStartTest}
        className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 ${
          true ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
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
        <p className="relative z-10 text-[#835D26] font-bold">Tiếp tục</p>
      </button>
    </div>
  </div>
);

// --- COMPONENT CON: MÀN HÌNH CÂU HỎI ---
const QuestionComponent = ({
  question,
  currentStep,
  onNext,
  onBack,
}: {
  question: { id: number; text: string };
  currentStep: number;
  onNext: (answerId: number) => void;
  onBack: () => void;
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      onNext(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto border-3 bg-amber-200/50 border-[#835D26] rounded-3xl p-8 shadow-lg animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="font-bold text-[#835D26] text-lg whitespace-nowrap">
          Câu hỏi {currentStep}/{TOTAL_QUESTIONS}
        </span>
        <div>
          <Progress
            value={(currentStep / TOTAL_QUESTIONS) * 100}
            className="w-72 h-2 bg-transparent border border-[#835D26] rounded-full shadow-inner [&>div]:bg-[#835D26] [&>div]:rounded-full"
          />
        </div>
        <button className="text-[#835D26] font-bold text-2xl hover:bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center">
          <Image src="/Return 1.svg" alt="Quay lại" width={72} height={72} />
        </button>
      </div>

      {/* Question Text */}
      <p className="text-center text-2xl text-[#835D26] font-extrabold my-12 leading-relaxed">
        {question.text}
      </p>

      {/* Answer Options */}
      <div className="flex justify-center items-end gap-10 my-12">
        {answerOptions.map((option, index) => (
          <div key={option.id} className="flex flex-col items-center">
            {/* Label above the box */}
            <div className={`text-sm font-medium mb-3 text-center leading-tight max-w-[110px] ${option.color}`}>
              {option.text}
            </div>
            {/* Selection box */}
            <button
              onClick={() => setSelectedAnswer(option.id)}
              className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === option.id
                  ? `${option.borderColor} bg-opacity-20 bg-gradient-to-br from-[#835D26] to-[#835D26] shadow-md scale-110`
                  : `${option.borderColor} bg-white hover:shadow-md hover:scale-105`
              }`}
            >
              {selectedAnswer === option.id && (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded bg-gradient-to-br ${
                      option.id <= 2
                        ? "from-red-400 to-red-500"
                        : option.id === 3
                        ? "from-orange-400 to-orange-500"
                        : "from-green-400 to-green-500"
                    }`}
                  ></div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={onBack}
          className="bg-transparent border-2 border-yellow-400 text-yellow-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400/20 transition-colors duration-300"
        >
          Quay lại
        </button>
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-900 font-bold py-3 px-8 rounded-full transition-all duration-300 disabled:from-yellow-200 disabled:to-orange-200 disabled:cursor-not-allowed hover:from-yellow-500 hover:to-orange-500 shadow-lg"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH (ROUTE) ---
export default function EntryTestPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-16 = questions
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStartTest = () => {
    setCurrentStep(1);
  };

  const handleNextQuestion = (answerId: number) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: answerId }));
    if (currentStep < TOTAL_QUESTIONS) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Test Completed. Answers:", {
        ...answers,
        [currentStep]: answerId,
      });
      // Navigate to result page or show results here
    }
  };

  const handleBackQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderContent = () => {
    if (currentStep === 0) {
      return <IntroComponent onStartTest={handleStartTest} />;
    }
    if (currentStep > 0 && currentStep <= TOTAL_QUESTIONS) {
      const currentQuestion = questions.find((q) => q.id === currentStep);
      if (!currentQuestion) return null;

      return (
        <QuestionComponent
          question={currentQuestion}
          currentStep={currentStep}
          onNext={handleNextQuestion}
          onBack={handleBackQuestion}
        />
      );
    }
    // You can render a result component here
    return <div className="text-white text-2xl">Hoàn thành bài test!</div>;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Sử dụng key để trigger animation mỗi khi step thay đổi */}
      <div key={currentStep} className="w-full">
        {renderContent()}
      </div>
    </main>
  );
}
