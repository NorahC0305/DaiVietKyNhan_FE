import z from "zod";

/**
 * Login form data request
 */
export const userAnswerLogRequest = z.object({
  questionId: z.number().optional(),
  text: z.string().optional(),
});
export type IUserAnswerLogRequest = z.infer<typeof userAnswerLogRequest>;
//-----------------End-UserAnswerLogRequest-----------------//

/**
 * User skip question by coins request
 */
export const userSkipQuestionByCoinsRequest = z.object({
  questionId: z.number().optional(),
});
export type IUserSkipQuestionByCoinsRequest = z.infer<
  typeof userSkipQuestionByCoinsRequest
>;
//-----------------End-UserSkipQuestionByCoinsRequest-----------------//
