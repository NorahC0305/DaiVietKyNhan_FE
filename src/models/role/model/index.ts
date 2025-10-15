import z from "zod"

export const roleModel = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean().optional(),
    createdById: z.number().optional(),
    updatedById: z.number().optional(),
    deletedById: z.number().optional(),
    deletedAt: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
})
export type IRoleModel = z.infer<typeof roleModel>
//----------------------End----------------------//