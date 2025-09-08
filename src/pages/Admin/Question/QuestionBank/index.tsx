"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import SummaryCards from "./Components/SummaryCards";
import SearchFilters from "./Components/Toolbar";
import AddQuestionForm from "./Components/AddQuestionForm";
import QuestionsTable from "./Components/QuestionsTable";

interface QuestionData {
  category: string;
  difficulty: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
  createdAt: string;
  status: "active" | "draft";
  correctRate: number;
}

const QuestionBankPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tất cả");
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data - trong thực tế sẽ lấy từ API
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "Thủ đô của Việt Nam là gì?",
      category: "Địa lý",
      difficulty: "Dễ",
      createdAt: "2024-03-15",
      status: "active",
      correctRate: 88,
    },
    {
      id: "2",
      question: "Ai là tác giả của tác phẩm 'Truyện Kiều'?",
      category: "Văn học",
      difficulty: "Trung bình",
      createdAt: "2024-03-14",
      status: "active",
      correctRate: 81,
    },
    {
      id: "3",
      question: "Năm nào Việt Nam gia nhập ASEAN?",
      category: "Lịch sử",
      difficulty: "Khó",
      createdAt: "2024-03-13",
      status: "draft",
      correctRate: 0,
    },
  ]);

  const handleAddQuestion = (questionData: QuestionData) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: questionData.question,
      category: questionData.category,
      difficulty: questionData.difficulty,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
      correctRate: 0,
    };
    setQuestions((prev) => [newQuestion, ...prev]);
    setShowAddForm(false);
  };

  const handleView = (id: string) => {
    console.log("View question:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit question:", id);
  };

  const handleDelete = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || question.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "Tất cả" ||
      question.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const totalQuestions = questions.length;
  const activeQuestions = questions.filter((q) => q.status === "active").length;
  const draftQuestions = questions.filter((q) => q.status === "draft").length;
  const averageCorrectRate =
    questions.length > 0
      ? Math.round(
          questions.reduce((sum, q) => sum + q.correctRate, 0) /
            questions.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <Card className="border-gray-300 bg-admin-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
            Ngân hàng câu hỏi
          </CardTitle>
          <div className="text-sm text-gray-500">
            Quản lý và theo dõi ngân hàng câu hỏi
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
            onAddQuestion={() => setShowAddForm(!showAddForm)}
          />

          {/* Summary Cards */}
          <SummaryCards
            totalQuestions={totalQuestions}
            activeQuestions={activeQuestions}
            draftQuestions={draftQuestions}
            averageCorrectRate={averageCorrectRate}
          />

          {/* Add Question Form */}
          {showAddForm && <AddQuestionForm onSubmit={handleAddQuestion} />}

          {/* Questions Table */}
          <QuestionsTable
            questions={filteredQuestions}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBankPage;
