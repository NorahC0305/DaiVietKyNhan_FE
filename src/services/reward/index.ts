import http from "@configs/fetch";
import { BackendResponseModel } from "@models/backend";
import {
  IRewardListResponse,
  RewardListResponseSchema,
  IExchangeRewardRequest,
} from "@models/reward";
import { IReward } from "@models/reward";
import qs from "qs";

const rewardService = {
  getRewards: async (params?: {
    currentPage?: number;
    pageSize?: number;
    sort?: string;
  }) => {
    const queryParams = qs.stringify({
      ...params,
      qs: params?.sort || "sort:-id",
    });

    return await http.get(`/reward?${queryParams}`, {
      next: { tags: ["rewards"] },
    });
  },

  exchangeReward: async (data: IExchangeRewardRequest) => {
    return await http.post("/user-reward/exchange", data, {
      next: { tags: ["userRewards"] },
    });
  },
};

export default rewardService;
