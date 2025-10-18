"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@lib/QueryKey";
import questionService from "@services/question";
import { IQuestionResponse } from "@models/question/response";
import { ICreateQuestionRequest } from "@models/question/request";
import { IQuestion } from "@models/question/entity";
import { toast } from "react-toastify";

// Query keys for questions
export const questionQueryKeys = {
  all: ["questions"] as const,
  lists: () => [...questionQueryKeys.all, "list"] as const,
  list: (filters?: { search?: string; category?: string; type?: string }) =>
    [...questionQueryKeys.lists(), { filters }] as const,
  details: () => [...questionQueryKeys.all, "detail"] as const,
  detail: (id: string | number) =>
    [...questionQueryKeys.details(), id] as const,
};

// UI Question interface
export interface UIQuestion {
  id: string;
  question: string;
  landId: string;
  type: string;
  createdAt: string;
  status: "active" | "draft";
  correctRate: number;
}

// Transform question data to UI format
const transformQuestionToUI = (question: any): UIQuestion => {
  try {
    // Handle createdAt which might be string or Date
    let createdAt = "";
    if (question.createdAt) {
      if (question.createdAt instanceof Date) {
        createdAt = question.createdAt.toLocaleDateString("vi-VN");
      } else {
        // Handle string date
        const date = new Date(question.createdAt);
        if (!isNaN(date.getTime())) {
          createdAt = date.toLocaleDateString("vi-VN");
        } else {
          createdAt = question.createdAt; // fallback to original string
        }
      }
    }

    return {
      id: question.id?.toString() || "",
      question: question.text || "",
      landId: question.landId?.toString() || "",
      type:
        question.questionType === "TEXT_INPUT"
          ? "Tự Luận"
          : question.questionType || "",
      createdAt,
      status: question.deletedAt ? "draft" : "active",
      correctRate: 0, // Default correct rate, you might need to calculate this from answers
    };
  } catch (error) {
    console.error("Error transforming question:", error, question);
    // Return a fallback question object
    return {
      id: question.id?.toString() || "unknown",
      question: question.text || "Unknown question",
      landId: question.landId?.toString() || "",
      type: "Tự Luận",
      createdAt: new Date().toLocaleDateString("vi-VN"),
      status: "active",
      correctRate: 0,
    };
  }
};

// Hook to get all questions
export const useQuestions = (filters?: {
  search?: string;
  landId?: string;
  type?: string;
}) => {
  return useQuery({
    queryKey: questionQueryKeys.list(filters),
    queryFn: async () => {
      try {
        const response = await questionService.getAllQuestions();

        console.log("Question response:", response);

        // Handle different possible response structures
        let questionsData = null;

        // Case 1: response.data.results (pagination structure)
        if (response.data?.results && Array.isArray(response.data.results)) {
          questionsData = response.data.results;
        }
        // Case 2: response.data is array directly
        else if (Array.isArray(response.data)) {
          questionsData = response.data;
        }
        // Case 3: response is array directly (as shown in the image)
        else if (Array.isArray(response)) {
          questionsData = response;
        }

        if (questionsData && Array.isArray(questionsData)) {
          console.log("Questions data found:", questionsData);
          return questionsData.map(transformQuestionToUI);
        }

        console.log(
          "No valid questions data found in response structure:",
          response
        );
        return [];
      } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to create a new question
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateQuestionRequest) => {
      const response = await questionService.createQuestion(data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate questions list to refresh data
      queryClient.invalidateQueries({ queryKey: questionQueryKeys.lists() });
      toast.success("Tạo câu hỏi thành công");
    },
  });
};
