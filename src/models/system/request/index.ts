import { z } from "zod";

/**
 * Update release date body schema
 */
export const UpdateReleaseDateBodySchema = z.object({
    date: z.string().min(1, 'Ngày không được để trống'),
    time: z.string().min(1, 'Giờ không được để trống'),
    description: z.string().optional(),
    isActive: z.boolean().default(false),
}).strict();

export type IUpdateReleaseDateBodySchema = z.infer<typeof UpdateReleaseDateBodySchema>;

/**
 * Set release date body schema
 */
export const SetReleaseDateBodySchema = z.object({
    launchDate: z.string().datetime('Ngày giờ không hợp lệ'),
}).strict();

export type ISetReleaseDateBodySchema = z.infer<typeof SetReleaseDateBodySchema>;
