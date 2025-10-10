import { z } from "zod";
import { PaginationModel } from "@/models/pagination";
import { SystemConfigSchema } from "../entity";
/**
 * Release date entity schema
 */
export const ReleaseDateSchema = z
  .object({
    id: z.number(),
    launchDate: z.string().datetime("Ngày giờ không hợp lệ"),
    description: z.string().optional(),
    isActive: z.boolean(),
    createdById: z.number().nullable().optional(),
    updatedById: z.number().nullable().optional(),
    deletedById: z.number().nullable().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    deletedAt: z.string().datetime().nullable().optional(),
  })
  .strict();

export type IReleaseDate = z.infer<typeof ReleaseDateSchema>;

/**
 * Get release date response schema
 */
export const GetReleaseDateResponseSchema = z
  .object({
    statusCode: z.number(),
    message: z.string(),
    data: z.object({
      pagination: PaginationModel,
      results: z.array(ReleaseDateSchema),
    }),
  })
  .strict();

export type IGetReleaseDateResponse = z.infer<
  typeof GetReleaseDateResponseSchema
>;

/**
 * Set release date response schema
 */
export const SetReleaseDateResponseSchema = z
  .object({
    statusCode: z.number(),
    message: z.string(),
    data: ReleaseDateSchema.optional(),
  })
  .strict();

export type ISetReleaseDateResponse = z.infer<
  typeof SetReleaseDateResponseSchema
>;

/**
 * Update release date response schema
 */
export const UpdateReleaseDateResponseSchema = z
  .object({
    statusCode: z.number(),
    message: z.string(),
    data: z.object({
      launchDate: z.string().datetime("Ngày giờ không hợp lệ"),
      id: z.number(),
    }),
  })
  .strict();

export type IUpdateReleaseDateResponse = z.infer<
  typeof UpdateReleaseDateResponseSchema
>;

/**
 * Delete release date response schema
 */
export const DeleteReleaseDateResponseSchema = z
  .object({
    statusCode: z.number(),
    message: z.string(),
  })
  .strict();

export type IDeleteReleaseDateResponse = z.infer<
  typeof DeleteReleaseDateResponseSchema
>;

export const GetSystemConfigWithAmountUserResSchema = z.object({
  systemConfig: SystemConfigSchema.nullable(),
  amountUser: z.number().int().nonnegative()
})
export type IGetSystemConfigWithAmountUserResponse = z.infer<
  typeof GetSystemConfigWithAmountUserResSchema
>;
