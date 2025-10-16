import { z } from "zod";

export const FigureSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  createdById: z.number().nullable().optional(),
  updatedById: z.number().nullable().optional(),
  deletedById: z.number().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type IFigure = z.infer<typeof FigureSchema>;
