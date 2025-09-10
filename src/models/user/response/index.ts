import { UserStatus } from "@constants/user"
import { roleModel } from "@models/role/model"
import z from "zod"

const loginResponse = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE]),
    phoneNumber: z.string(),
    roleId: z.number(),
    avatar: z.string(),
    role: roleModel,
})
export type ILoginResponse = z.infer<typeof loginResponse>
//----------------------End----------------------//