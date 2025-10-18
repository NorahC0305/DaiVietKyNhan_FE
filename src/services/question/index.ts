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
  updateQuestion: async (id: number, data: ICreateQuestionRequest) => {
    return await http.put<IQuestionResponse>(`/question/${id}`, data);
  },
  deleteQuestion: async (questionId: number) => {
    return await http.delete<IQuestionResponse>(`/question/${questionId}`, {});
  },
};

export default questionService;
