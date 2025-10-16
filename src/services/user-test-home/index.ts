import http from "@configs/fetch";
import { IUserTestHomeResponseModel } from "@models/user-test-home/repsonse";
import { IUserTestHomeRequest } from '@models/user-test-home/request';

const userTestHomeService = {
  saveAnswer: async (body: IUserTestHomeRequest) => {
    return await http.post<IUserTestHomeResponseModel>(`/user-test-question-home`, body);
  }
};

export default userTestHomeService;