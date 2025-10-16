import http from "@configs/fetch";
import { ITestHomeResponseModel } from "@models/test-home/response";

const testHomeService = {
  // Fetch test home with optimized caching
  getTestHome: async () => {
    return await http.get<ITestHomeResponseModel>(`/test-question-home/user`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
  },
};

export default testHomeService;
