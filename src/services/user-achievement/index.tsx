import http from "@configs/fetch";
import qs from "qs";
import { z } from "zod";
import {
  IUserAchievement,
  UserAchievementModel,
  IMyAchievementsResponse,
} from "@models/user-achievement";
import { BackendResponseModel } from "@models/backend";

const UserAchievementsArrayModel = z.array(UserAchievementModel);
const UserAchievementResponseModel = BackendResponseModel(
  UserAchievementsArrayModel
);

type IUserAchievementResponse = z.infer<typeof UserAchievementResponseModel>;

const userAchievementService = {
  getUserAchievements: async (params?: {
    qs?: string;
    currentPage?: number;
    pageSize?: number;
  }) => {
    const queryParams: any = {};

    if (params?.qs) {
      queryParams.qs = params.qs;
    }
    if (params?.currentPage) {
      queryParams.currentPage = params.currentPage;
    }
    if (params?.pageSize) {
      queryParams.pageSize = params.pageSize;
    }

    const queryString = qs.stringify(queryParams, {
      skipNulls: true,
    });

    return await http.get<IUserAchievementResponse>(
      `/user-achievement?${queryString}`,
      {
        next: { tags: ["userAchievements"] },
      }
    );
  },
  claimAchievement: async (userAchievementId: number) => {
    return await http.post(
      `user-achievement/claim-reward/${userAchievementId}`,
      null,
      {
        next: { tags: ["userAchievements"] },
      }
    );
  },

  getMyAchievements: async () => {
    return await http.get<IMyAchievementsResponse>(`/user-achievement/my-achievements`, {
      next: { tags: ["userAchievements"] },
    });
  },
};

export default userAchievementService;
