"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import { Skeleton } from "@/components/Atoms/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/Atoms/ui/alert-dialog";
import SummaryCards from "./Components/SummaryCards";
import SearchFilters from "./Components/Toolbar";
import AddQuestionForm from "./Components/AddQuestionForm";
import QuestionsTable from "./Components/QuestionsTable";
import { IKyNhanSummary } from "@models/ky-nhan/entity";
import { ILandEntity } from "@models/land/entity";
import {
  useCreateQuestion,
  useQuestions,
  UIQuestion,
} from "@hooks/use-question-queries";
import questionService from "@services/question";
import { IDeleteQuestionResponse } from "@models/question/response";

interface QuestionData {
  text: string;
  questionType: "TEXT_INPUT";
  allowSimilarAnswers: boolean;
  landId: number;
  kynhanSummaries: number[];
  answers: string[];
}

const QuestionBankPage = ({
  kyNhanSummary,
  lands,
}: {
  kyNhanSummary: IKyNhanSummary[];
  lands: ILandEntity[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLandId, setSelectedLandId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [questionsList, setQuestionsList] = useState<UIQuestion[]>([]);

  const createQuestionMutation = useCreateQuestion();

  // Fetch questions data using the hook
  const { data: allQuestions = [], isLoading, error, refetch } = useQuestions();

  // Update local state when data changes
  useEffect(() => {
    if (allQuestions.length >= 0) {
      setQuestionsList(allQuestions);
    }
  }, [allQuestions]);

  // Filter questions based on search and category using local state
  const filteredQuestions = questionsList.filter((question) => {
    const matchesSearch =
      !searchTerm ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedLandId === null || question.landId === selectedLandId.toString();
    return matchesSearch && matchesCategory;
  });

  // Calculate summary statistics based on local questions list
  const totalQuestions = questionsList.length;
  const activeQuestions = questionsList.filter(
    (q) => q.status === "active"
  ).length;
  const draftQuestions = questionsList.filter(
    (q) => q.status === "draft"
  ).length;
  const averageCorrectRate =
    totalQuestions > 0
      ? questionsList.reduce((sum, q) => sum + q.correctRate, 0) /
        totalQuestions
      : 0;

  // Handle mutation errors with toast notification
  useEffect(() => {
    if (createQuestionMutation.error) {
      console.error("Failed to create question:", createQuestionMutation.error);
      toast.error("Không thể tạo câu hỏi");
    }
  }, [createQuestionMutation.error]);

  const handleAddQuestion = (questionData: QuestionData) => {
    createQuestionMutation.mutate(questionData, {
      onSuccess: () => {
        setShowAddForm(false);
        // Refetch data để cập nhật UI với câu hỏi mới
        refetch();
      },
    });
  };

  const handleView = (id: string) => {
    console.log("View question:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit question:", id);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteQuestionId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteQuestionId) return;

    try {
      const response = (await questionService.deleteQuestion(
        Number(deleteQuestionId)
      )) as IDeleteQuestionResponse;
      if (response.statusCode === 200) {
        toast.success(response.message);

        // Cách 1: Cập nhật local state để loại bỏ item đã xóa
        setQuestionsList((prev) =>
          prev.filter((question) => question.id !== deleteQuestionId)
        );

        // Cách 2: Refetch data từ server (backup option)
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Không thể xóa câu hỏi");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteQuestionId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteQuestionId(null);
  };

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
            selectedLandId={selectedLandId || undefined}
            onSearchChange={setSearchTerm}
            onLandIdChange={(value: string) =>
              setSelectedLandId(value === "all" ? null : Number(value))
            }
            onAddQuestion={() => setShowAddForm(!showAddForm)}
            lands={lands}
          />

          {/* Summary Cards */}
          <SummaryCards
            totalQuestions={totalQuestions}
            activeQuestions={activeQuestions}
            draftQuestions={draftQuestions}
            averageCorrectRate={averageCorrectRate}
          />

          {/* Add Question Form */}
          {showAddForm && (
            <AddQuestionForm
              onSubmit={handleAddQuestion}
              lands={lands || []}
              kyNhanSummary={kyNhanSummary || []}
            />
          )}

          {/* Questions Table */}
          <QuestionsTable
            lands={lands}
            questions={filteredQuestions}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
            error={error}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa câu hỏi</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không
              thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={"cursor-pointer"}
              onClick={handleCancelDelete}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuestionBankPage;
