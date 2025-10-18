import { QuestionSchema } from "../entity";
import { BackendPaginationResponseModel, BackendResponseModel } from "@models/backend";
import z from "zod";



/**
 * Question response schema
 */
export const QuestionResponseSchema = BackendPaginationResponseModel(QuestionSchema);
export type IQuestionResponse = z.infer<typeof QuestionResponseSchema>;
//-----------------End-QuestionResponseSchema-----------------//

/**
 * Create question response schema
 */
export const CreateQuestionResponseSchema =
  BackendResponseModel(QuestionSchema);
export type ICreateQuestionResponse = z.infer<
  typeof CreateQuestionResponseSchema
>;
//-----------------End-CreateQuestionResponseSchema-----------------//


/**
 * Delete question response schema
 */
export const DeleteQuestionResponseSchema =
  BackendResponseModel(QuestionSchema);
export type IDeleteQuestionResponse = z.infer<
  typeof DeleteQuestionResponseSchema
>;
//-----------------End-DeleteQuestionResponseSchema-----------------//