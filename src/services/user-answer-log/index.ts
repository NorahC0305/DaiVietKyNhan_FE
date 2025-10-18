import http from "@configs/fetch";
import { IUserAnswerLogRequest, IUserSkipQuestionByCoinsRequest } from "@models/user-answer-log/request";
import { IUserAnswerLogResponseModel } from "@models/user-answer-log/response";
import { IUserTestHomeResponseModel } from "@models/user-test-home/repsonse";

const userAnswerLogService = {
  answerQuestion: async (body: IUserAnswerLogRequest) => {
    return await http.post<IUserAnswerLogResponseModel>(`/user-answer-log`, body);
  },
  skipQuestionByCoins: async (body: IUserSkipQuestionByCoinsRequest) => {
    return await http.post<IUserTestHomeResponseModel>(`/user-answer-log/pass`, body);
  },
};

export default userAnswerLogService;