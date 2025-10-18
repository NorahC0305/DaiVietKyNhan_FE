import {z} from "zod";
import { BackendPaginationResponseModel, BackendResponseModel } from "@models/backend";
import { QuestionSchema } from "@models/question/entity";
import { LandSchema } from "../entity";

export const LandResponseModel = BackendPaginationResponseModel(LandSchema);
export type ILandResponseModel = z.infer<typeof LandResponseModel>;


export const LandWithUserQuestionResponseModel = BackendResponseModel(LandSchema.extend({
  questions: QuestionSchema.array(),
}));
export type ILandWithUserQuestionResponseModel = z.infer<typeof LandWithUserQuestionResponseModel>;
