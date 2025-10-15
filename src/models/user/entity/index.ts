import { USER } from "@constants/user";
import z from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string().min(9).max(15),
  gender: z.enum([USER.GENDER.MALE, USER.GENDER.FEMALE, USER.GENDER.OTHER]).nullable(),
  coin: z.number(),
  point: z.number(),
  birthDate: z.coerce.date().nullable(),
  avatar: z.string().nullable(),
  status: z.enum([USER.USER_STATUS.ACTIVE, USER.USER_STATUS.INACTIVE]),
  roleId: z.number().positive(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})
export type IUser = z.infer<typeof UserSchema>