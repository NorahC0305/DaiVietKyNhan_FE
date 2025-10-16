import http from "@configs/fetch";
import { ITestHomeResponseModel } from "@models/test-home/response";

const testHomeService = {
  // Fetch test home
  getTestHome: async () => {
    return await http.get<ITestHomeResponseModel>(`/test-question-home/user`, {
      cache: "no-store",
    });
  }
};

export default testHomeService;
