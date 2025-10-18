import z from "zod";

/**
 * User answer log schema
 */
export const UserAnswerLogSchema = z.object({
  id: z.number(),
  questionId: z.number(),
  userId: z.number(),
  text: z.string(),
  isCorrect: z.boolean(),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isCompletedLand: z.boolean(),
});
export type IUserAnswerLog = z.infer<typeof UserAnswerLogSchema>;
//-----------------End-UserAnswerLogSchema-----------------//
