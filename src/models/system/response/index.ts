import { z } from "zod";

/**
 * Release date entity schema
 */
export const ReleaseDateSchema = z.object({
    id: z.number(),
    launchDate: z.string().datetime('Ngày giờ không hợp lệ'),
    description: z.string().optional(),
    isActive: z.boolean(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
}).strict();

export type IReleaseDate = z.infer<typeof ReleaseDateSchema>;

/**
 * Get release date response schema
 */
export const GetReleaseDateResponseSchema = z.object({
    success: z.boolean(),
    data: ReleaseDateSchema.optional(),
    message: z.string().optional(),
}).strict();

export type IGetReleaseDateResponse = z.infer<typeof GetReleaseDateResponseSchema>;

/**
 * Set release date response schema
 */
export const SetReleaseDateResponseSchema = z.object({
    success: z.boolean(),
    data: ReleaseDateSchema.optional(),
    message: z.string().optional(),
}).strict();

export type ISetReleaseDateResponse = z.infer<typeof SetReleaseDateResponseSchema>;

/**
 * Update release date response schema
 */
export const UpdateReleaseDateResponseSchema = z.object({
    success: z.boolean(),
    data: ReleaseDateSchema.optional(),
    message: z.string().optional(),
}).strict();

export type IUpdateReleaseDateResponse = z.infer<typeof UpdateReleaseDateResponseSchema>;

/**
 * Delete release date response schema
 */
export const DeleteReleaseDateResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
}).strict();

export type IDeleteReleaseDateResponse = z.infer<typeof DeleteReleaseDateResponseSchema>;
