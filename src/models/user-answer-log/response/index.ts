import { BackendResponseModel } from "@models/backend";
import { UserAnswerLogSchema } from "../entity";
import { z } from "zod";

/**
 * User answer log response model
 */
export const UserAnswerLogResponseModel =
  BackendResponseModel(UserAnswerLogSchema);
export type IUserAnswerLogResponseModel = z.infer<
  typeof UserAnswerLogResponseModel
>; //-----------------End-UserAnswerLogResponseModel-----------------//
