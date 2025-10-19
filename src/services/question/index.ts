import http from "@configs/fetch";
import { IQuestion } from "@models/question/entity";
import { ICreateQuestionRequest } from "@models/question/request";
import {
  ICreateQuestionResponse,
  IQuestionResponse,
} from "@models/question/response";

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
};

export default questionService;
