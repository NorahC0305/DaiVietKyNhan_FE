
import { USER } from "@constants/user"
import { roleModel } from "@models/role/model"
import { BackendResponseModel, BackendPaginationResponseModel } from "@models/backend"
import z from "zod"

const loginResponse = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    status: z.enum([USER.USER_STATUS.ACTIVE, USER.USER_STATUS.INACTIVE]),
    phoneNumber: z.string(),
    roleId: z.number(),
    avatar: z.string(),
    role: roleModel,
})
export type ILoginResponse = z.infer<typeof loginResponse>
//----------------------End----------------------//

const meResponseData = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    gender: z.enum([USER.GENDER.MALE, USER.GENDER.FEMALE, USER.GENDER.OTHER]),
    birthDate: z.string(),
    avatar: z.string().nullable(),
    coin: z.number(),
    point: z.number(),
    status: z.enum([USER.USER_STATUS.ACTIVE, USER.USER_STATUS.INACTIVE]),
    roleId: z.number(),
    createdById: z.number().nullable(),
    updatedById: z.number().nullable(),
    deletedById: z.number().nullable(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    role: roleModel,
})

const meResponse = BackendResponseModel(meResponseData)
const mePaginationResponse = BackendPaginationResponseModel(meResponseData)

export type IMeResponse = z.infer<typeof meResponse>
export type IMePaginationResponse = z.infer<typeof mePaginationResponse>
//----------------------End----------------------//