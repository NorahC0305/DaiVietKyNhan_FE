import { BackendResponseModel } from "@models/backend";
import { UserLandSchema, UserLandWithLandSchema } from "../entity";
import { z } from "zod";

/**
 * User land response model for array response
 */
export const UserLandArrayResponseModel = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.array(UserLandSchema),
});

/**
 * Single user land response model
 */
export const UserLandResponseModel = BackendResponseModel(UserLandSchema);

export type IUserLandArrayResponseModel = z.infer<typeof UserLandArrayResponseModel>;
export type IUserLandResponseModel = z.infer<typeof UserLandResponseModel>;
//-----------------End-UserLandResponseModel-----------------//


/**
 * User land with land response model for array response
 */
export const UserLandWithLandArrayResponseModel = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.array(UserLandWithLandSchema),
});

export type IUserLandWithLandArrayResponseModel = z.infer<typeof UserLandWithLandArrayResponseModel>;
export type IUserLandWithLandResponseModel = z.infer<typeof UserLandWithLandSchema>;
//-----------------End-UserLandWithLandArrayResponseModel-----------------//