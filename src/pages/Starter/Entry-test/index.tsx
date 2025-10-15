"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useAnswersSelector,
  useSetAnswer,
} from "@/stores/entry-test/selectors";
import { Progress } from "@/components/Atoms/ui/progress";
import { useSetHouseScores } from "@/stores/entry-test/selectors";
import { ROUTES } from "@routes";

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
    color: "DD9800",
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
    color: "00A63E",
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
  selectedAnswer,
  showSaved,
  progressPulse,
}: {
  question: { id: number; text: string };
  currentStep: number;
  onNext: (answerId: number) => void;
  onBack: () => void;
  selectedAnswer?: number;
  showSaved?: boolean;
  progressPulse?: boolean;
}) => {
  const currentSelected = selectedAnswer ?? null;
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  // Re-enable options whenever the question (step) changes, including when going back
  useEffect(() => {
    setOptionsDisabled(false);
    setClickedId(null);
    setIsFlashing(false);
  }, [currentStep]);

  const handleClick = (answerId: number) => {
    if (optionsDisabled) return;
    setOptionsDisabled(true);
    setClickedId(answerId);
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      onNext(answerId);
      setClickedId(null);
    }, 200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border-3 bg-amber-200/50 border-[#835D26] rounded-3xl p-8 shadow-lg animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="font-bold text-[#835D26] text-lg whitespace-nowrap">
          Câu hỏi {currentStep}/{TOTAL_QUESTIONS}
        </span>
        <div>
          <Progress
            value={(currentStep / TOTAL_QUESTIONS) * 100}
            className={`w-72 h-2 bg-transparent border border-[#835D26] rounded-full shadow-inner [&>div]:bg-[#835D26] [&>div]:rounded-full [&>div]:transition-all [&>div]:duration-500 ${
              progressPulse ? "[&>div]:animate-pulse" : ""
            }`}
          />
        </div>
        <button
          onClick={onBack}
          className="cursor-pointer text-[#835D26] font-bold text-2xl hover:scale-105 rounded-full w-16 h-16 flex items-center justify-center"
        >
          <Image src="/Return 1.svg" alt="Quay lại" width={72} height={72} />
        </button>
      </div>
      {showSaved && (
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/80 border border-green-500 text-green-700 rounded-full px-3 py-1 shadow-sm">
          <span className="text-green-600">✔</span>
          <span className="text-xs font-semibold">Đã lưu</span>
        </div>
      )}

      {/* Question Text */}
      <p className="text-center text-2xl text-[#835D26] font-extrabold my-12 leading-relaxed">
        {question.text}
      </p>

      {/* Answer Options */}
      <div className="flex justify-center items-end gap-10 my-12">
        {answerOptions.map((option, index) => (
          <div key={option.id} className="flex flex-col items-center w-24">
            {/* Label above the box */}
            <div
              className={`text-sm font-medium mb-3 text-center leading-tight max-w-[110px] h-10 flex items-end justify-center ${
                option.id === 2 || option.id === 4 ? "opacity-0" : ""
              }`}
              style={{ color: `#${option.color}` }}
            >
              {option.text}
            </div>
            {/* Selection box */}
            <button
              onClick={() => handleClick(option.id)}
              disabled={optionsDisabled}
              className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                optionsDisabled ? `opacity-60 cursor-not-allowed` : ``
              } ${
                currentSelected === option.id || clickedId === option.id
                  ? `shadow-md scale-110`
                  : `bg-white ${
                      optionsDisabled ? `` : `hover:shadow-md hover:scale-105`
                    }`
              }`}
              style={{ borderColor: `#${option.borderColor}` }}
            >
              {(currentSelected === option.id || clickedId === option.id) && (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded ${
                      isFlashing && clickedId === option.id ? "ring-2" : ""
                    }`}
                    style={{
                      backgroundColor: `#${option.borderColor}`,
                      boxShadow:
                        isFlashing && clickedId === option.id
                          ? `0 0 0 3px #${option.borderColor}55`
                          : undefined,
                    }}
                  ></div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH (ROUTE) ---
export default function EntryTestPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-16 = questions
  const answers = useAnswersSelector();
  const setAnswer = useSetAnswer();
  const [showSaved, setShowSaved] = useState(false);
  const setHouseScores = useSetHouseScores();

  // Store is already persisted; no manual hydration needed

  const handleStartTest = () => {
    setCurrentStep(1);
  };

  const handleNextQuestion = (answerId: number) => {
    setAnswer(currentStep, answerId);
    setShowSaved(true);
    if (currentStep < TOTAL_QUESTIONS) {
      // small delay to allow flash/tick feedback
      setTimeout(() => setCurrentStep(currentStep + 1), 1000);
    } else {
      const finalAnswers = { ...answers, [currentStep]: answerId } as Record<number, number>;

      // Compute mock scores for four houses from answers
      // Mapping questions to houses (simple even spread)
      const questionToHouse: Record<number, "diem-tinh" | "vui-tuoi" | "manh-me" | "uu-tu"> = {} as any;
      const houseCycle: Array<"diem-tinh" | "vui-tuoi" | "manh-me" | "uu-tu"> = [
        "diem-tinh",
        "vui-tuoi",
        "manh-me",
        "uu-tu",
      ];
      for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
        questionToHouse[i] = houseCycle[(i - 1) % 4];
      }

      const baseScores: Record<string, number> = {
        "diem-tinh": 0,
        "vui-tuoi": 0,
        "manh-me": 0,
        "uu-tu": 0,
      };

      Object.entries(finalAnswers).forEach(([qidStr, ans]) => {
        const qid = Number(qidStr);
        const house = questionToHouse[qid];
        if (!house) return;
        // Normalize answer 1..5 -> score 0..4, then scale to 0..6 for nicer totals
        const normalized = Math.max(1, Math.min(5, Number(ans))) - 1; // 0..4
        baseScores[house] += normalized + 1; // 1..5 per question
      });

      // Cap and format to two-digit strings (00..24 etc.)
      const format = (n: number) => String(Math.max(0, Math.min(99, n))).padStart(2, "0");

      const diemTinh = format(baseScores["diem-tinh"]);
      const vuiTuoi = format(baseScores["vui-tuoi"]);
      const manhMe = format(baseScores["manh-me"]);
      const uuTu = format(baseScores["uu-tu"]);

      // Save scores to zustand store and navigate without URL params
      setHouseScores({ diemTinh, vuiTuoi, manhMe, uuTu });
      if (typeof window !== "undefined") {
        window.location.href = ROUTES.STARTER.PERSONALITY_RESULT;
      }
    }
  };

  useEffect(() => {
    if (!showSaved) return;
    const id = setTimeout(() => setShowSaved(false), 1000);
    return () => clearTimeout(id);
  }, [showSaved]);

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
          selectedAnswer={answers[currentStep]}
          showSaved={showSaved}
          progressPulse={showSaved}
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
