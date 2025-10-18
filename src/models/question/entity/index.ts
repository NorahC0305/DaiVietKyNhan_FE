import { AnswerSchema } from "@models/answer/entity";
import { KyNhanSummarySchema } from "@models/ky-nhan/entity";
import z from "zod";

/**
 * Question schema
 */
export const QuestionSchema = z.object({
  id: z.number(),
  text: z.string(),
  questionType: z.enum(["TEXT_INPUT"]),
  allowSimilarAnswers: z.boolean(),
  point: z.number(),
  landId: z.number(),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  kynhanSummaries: KyNhanSummarySchema.array(),
  answers: AnswerSchema.array(),
});
export type IQuestion = z.infer<typeof QuestionSchema>;
//-----------------End-QuestionSchema-----------------//
