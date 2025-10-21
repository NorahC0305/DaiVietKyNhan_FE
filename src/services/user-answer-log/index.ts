import http from "@configs/fetch";
import { IUserAnswerLogRequest, IUserSkipQuestionByCoinsRequest } from "@models/user-answer-log/request";
import { IUserAnswerLogResponseModel } from "@models/user-answer-log/response";

const userAnswerLogService = {
  answerQuestion: async (body: IUserAnswerLogRequest) => {
    return await http.post<IUserAnswerLogResponseModel>(`/user-answer-log`, body);
  },
  skipQuestionByCoins: async (body: IUserSkipQuestionByCoinsRequest) => {
    return await http.post<IUserAnswerLogResponseModel>(`/user-answer-log/pass`, body);
  },
};

export default userAnswerLogService;