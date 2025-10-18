import z from "zod";

export const KyNhanSummarySchema = z.object({
  id: z.number(),
  kyNhanId: z.number(),
  summary: z.string(),
  imgUrl: z.string(),
  questionId: z.number(),
  createdById: z.number(),
  updatedById: z.number(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IKyNhanSummary = z.infer<typeof KyNhanSummarySchema>;
