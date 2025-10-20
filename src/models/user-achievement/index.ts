import { AchievementModel } from "@models/achievement";
import {z} from "zod";


// User Achievement model
export const UserAchievementModel = z.object({
  id: z.number(),
  userId: z.number(),
  achievementId: z.number(),
  status: z.enum(["PENDING", "COMPLETED", "CLAIMED"]),
  completedAt: z.string().nullable(),
  rewardClaimed: z.boolean(),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  achievement: AchievementModel,
});

export type IUserAchievement = z.infer<typeof UserAchievementModel>;

// Response model for getMyAchievements API
export const MyAchievementsResponseModel = z.object({
  statusCode: z.number(),
  message: z.string().optional(),
  data: z.array(UserAchievementModel).optional(),
});

export type IMyAchievementsResponse = z.infer<typeof MyAchievementsResponseModel>;
