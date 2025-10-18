import http from "@configs/fetch";
import { ILandResponseModel } from "@models/land/response";


const landService = {
  getLands: async () => {
    return await http.get<ILandResponseModel>(`/land`, {
      cache: "no-store",
    });
  },
};

export default landService;

