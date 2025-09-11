import z from "zod"

export const roleModel = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    createdById: z.number(),
    updatedById: z.number(),
    deletedById: z.number(),
    deletedAt: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})
export type IRoleModel = z.infer<typeof roleModel>
//----------------------End----------------------//