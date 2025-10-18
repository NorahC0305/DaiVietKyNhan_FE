import http from "@configs/fetch";
import { ILandResponseModel, ILandWithUserQuestionResponseModel } from "@models/Land/response";


const landService = {
  getLands: async () => {
    return await http.get<ILandResponseModel>(`/land`, {
      cache: "no-store",
    });
  },
  getQuestionsWithUser: async (landId: number) => {
    return await http.get<ILandWithUserQuestionResponseModel>(`/land/user/question/${landId}`, {
      cache: "no-store",
    });
  },
};

export default landService;

