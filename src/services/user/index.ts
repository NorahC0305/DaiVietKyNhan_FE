import http from "@configs/fetch";
import { IQueryRequest } from "@models/common/request";
import {
  IUpdateMeBodySchema,
  IUpdateUserPointsRequest,
} from "@models/user/request";
import {
  IPointStatsResponse,
  IPointChangeLogPaginationResponse,
  IUserPlayStatsResponse,
  ITopUserStatsResponse,
  IMonthlyUserStatsResponse,
  ILandStatsResponse,
} from "@models/user/response";
import qs from "qs";

const userService = {
  getMe: async () => {
    return await http.get("/auth/me", {
      next: { tags: ["userProfile"] },
    });
  },
  getUsers: async (
    params?: IQueryRequest & { sortBy?: string; sortOrder?: "asc" | "desc" }
  ) => {
    const qsParts: string[] = [];

    // Handle sorting
    if (params?.sortBy && params?.sortOrder) {
      const prefix = params.sortOrder === "desc" ? "-" : "";
      qsParts.push(`sort:${prefix}${params.sortBy}`);
    } else {
      // Default sort
      qsParts.push("sort:-createdAt", "sort:-status");
    }

    if (params?.status) {
      qsParts.push(`status=${params.status}`);
    }

    if (params?.search) {
      qsParts.push(`name:like=${params.search}`);
    }

    if (params?.email) {
      qsParts.push(`email:like=${params.email}`);
    }

    const qsValue = qsParts.join(",");

    const finalParams = {
      qs: qsValue,
      currentPage: params?.page,
      pageSize: params?.limit,
    };

    const queryString = qs.stringify(finalParams, {
      skipNulls: true,
    });

    return await http.get(`/user/user-list?${queryString}`, {
      next: { tags: ["modifyUser"] },
    });
  },
  updateMe: async (data: IUpdateMeBodySchema) => {
    return await http.put("/auth/me", data);
  },
  getPointStats: async () => {
    return await http.get<IPointStatsResponse>("/dashboard/point/stats", {
      next: { tags: ["pointStats"] },
    });
  },
  getChangePointUserLogs: async (params?: {
    qs?: string;
    currentPage?: number;
    pageSize?: number;
  }) => {
    const queryString = qs.stringify(
      {
        qs: params?.qs || "sort:-createdAt",
        currentPage: params?.currentPage || 1,
        pageSize: params?.pageSize || 10,
      },
      { skipNulls: true }
    );

    return await http.get<IPointChangeLogPaginationResponse>(
      `/change-point-user-log?${queryString}`,
      {
        next: { tags: ["changePointUserLog"] },
      }
    );
  },
  updateUserPoints: async (data: IUpdateUserPointsRequest) => {
    return await http.post("/change-point-user-log", data, {
      next: { tags: ["changePointUserLog"] },
    });
  },
  getUserPlayStats: async () => {
    return await http.get<IUserPlayStatsResponse>(
      "/dashboard/user-play/stats",
      {
        next: { tags: ["userPlayStats"] },
      }
    );
  },
  getTopUserStats: async () => {
    return await http.get<ITopUserStatsResponse>(
      "/dashboard/user-play/top-user/stats",
      {
        next: { tags: ["topUserStats"] },
      }
    );
  },
  getMonthlyUserStats: async () => {
    return await http.get<IMonthlyUserStatsResponse>(
      "/dashboard/user-play/months",
      {
        next: { tags: ["monthlyUserStats"] },
      }
    );
  },
  getLandStats: async () => {
    return await http.get<ILandStatsResponse>(
      "/dashboard/user-play/land/stats",
      {
        next: { tags: ["landStats"] },
      }
    );
  },
  addHeart: async () => {
    return await http.put("/user/add-heart", null, {
      next: { tags: ["addHeart"] },
    });
  },
};

export default userService;
