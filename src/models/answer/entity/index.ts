import z from "zod";

/**
 * Answer schema
 */
export const AnswerSchema = z.object({
  id: z.number(),
  text: z.string(),
  questionId: z.number().optional(),
  createdById: z.number().optional(),
  updatedById: z.number().nullable().optional(),
  deletedById: z.number().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type IAnswer = z.infer<typeof AnswerSchema>;
//-----------------End-AnswerSchema-----------------//
