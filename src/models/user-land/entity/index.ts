import { LAND } from "@constants/land";
import { LandSchema } from "@models/Land/entity";
import { z } from "zod";

/**
 * User land schema
 */
export const UserLandSchema = z.object({
  id: z.number(),
  userId: z.number(),
  landId: z.number(),
  status: z.enum([
    LAND.LAND_STATUS.PENDING,
    LAND.LAND_STATUS.LOCKED,
    LAND.LAND_STATUS.UNLOCKED,
  ]),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z
    .string()
    .nullable()
    .transform((str) => (str ? new Date(str) : null)),
  createdAt: z.string().transform((str) => new Date(str)),
  updatedAt: z.string().transform((str) => new Date(str)),
});
export type IUserLandEntity = z.infer<typeof UserLandSchema>;
//-----------------End-UserLandSchema-----------------//

/**
 * User land with land schema
 */
export const UserLandWithLandSchema = UserLandSchema.extend({
  land: LandSchema,
});
export type IUserLandWithLandEntity = z.infer<typeof UserLandWithLandSchema>;
//-----------------End-UserLandWithLandSchema-----------------//