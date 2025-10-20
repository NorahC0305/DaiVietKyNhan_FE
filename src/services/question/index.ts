import http from "@configs/fetch";
import { IQuestion } from "@models/question/entity";
import { ICreateQuestionRequest } from "@models/question/request";
import {
  ICreateQuestionResponse,
  IQuestionResponse,
} from "@models/question/response";

// Question stats interface
interface IQuestionStats {
  countQuestion: number;
  rateCorrect: number;
}

interface IQuestionStatsResponse {
  statusCode: number;
  data: IQuestionStats;
  message: string;
}

const questionService = {
  // Create a new question
  createQuestion: async (data: ICreateQuestionRequest) => {
    return await http.post<ICreateQuestionResponse>(`/question`, data);
  },

  // Get all questions
  getAllQuestionsAdmin: async () => {
    return await http.get<IQuestionResponse>(`/question`);
  },

  // Get a single question by ID
  getQuestionById: async (id: number) => {
    return await http.get<ICreateQuestionResponse>(`/question/${id}`);
  },
  updateQuestion: async (id: number, data: ICreateQuestionRequest) => {
    return await http.put<IQuestionResponse>(`/question/${id}`, data);
  },
  deleteQuestion: async (questionId: number) => {
    return await http.delete<IQuestionResponse>(`/question/${questionId}`, {});
  },
  
  // Get questions statistics
  getQuestionStats: async () => {
    return await http.get<IQuestionStatsResponse>('/dashboard/questions/stats');
  },
};

export default questionService;

// Export interfaces for use in hooks
export type { IQuestionStats, IQuestionStatsResponse };
