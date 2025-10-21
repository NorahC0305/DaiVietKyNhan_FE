import http from "@configs/fetch";
import {
  IUserLandArrayResponseModel,
  IUserLandWithLandArrayResponseModel,
} from "@models/user-land/response";

const userLandService = {
  createUserLand: async () => {
    return await http.post<IUserLandArrayResponseModel>(`/user-land/user`, {});
  },
  getUserLand: async () => {
    return await http.get<IUserLandWithLandArrayResponseModel>(`/user-land/user`,
      {
        cache: "no-store",
      }
    );
  },
};

export default userLandService;
