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

export const KyNhanSchema = z.object({
  id: z.number(),
  name: z.string(),
  thoiKy: z.string(),
  chienCong: z.string(),
  imgUrl: z.string(),
  active: z.boolean(),
  landId: z.number(),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IKyNhan = z.infer<typeof KyNhanSchema>;
