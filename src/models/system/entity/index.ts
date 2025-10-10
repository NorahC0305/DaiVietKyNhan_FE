import { z } from "zod";

export const SystemConfigSchema = z.object({
    id: z.number(),
    launchDate: z.coerce.date(),
    isActive: z.boolean().default(true),
    createdById: z.number().nullable(),
    updatedById: z.number().nullable(),
    deletedById: z.number().nullable(),
    deletedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
})
export type ISystemConfig = z.infer<typeof SystemConfigSchema>