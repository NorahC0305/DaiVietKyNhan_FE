import z from "zod";

/**
 * Create question request
 */
export const createQuestionRequest = z.object({
  text: z.string().min(1, "Câu hỏi không được để trống"),
  questionType: z.enum(["TEXT_INPUT"]),
  allowSimilarAnswers: z.boolean(),
  landId: z.number().min(1, "Danh mục không được để trống"),
  kynhanSummaries: z.array(z.number()).min(1, "Kỳ nhân không được để trống"),
  answers: z.array(z.string()).min(1, "Câu trả lời không được để trống"),
});
export type ICreateQuestionRequest = z.infer<typeof createQuestionRequest>;
//-----------------End-CreateQuestionRequest-----------------//
