import { z } from "zod";

// Land model for achievement
export const LandModel = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
});
export type ILand = z.infer<typeof LandModel>;

// Achievement model
export const AchievementModel = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  requirement: z.number(),
  reward: z.number(),
  isActive: z.boolean(),
  order: z.number(),
  landId: z.number().nullable(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  land: LandModel.nullable(),
});

export type IAchievement = z.infer<typeof AchievementModel>;
