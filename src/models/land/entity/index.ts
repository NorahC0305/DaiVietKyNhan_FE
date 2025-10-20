import { z } from "zod";

/**
 * Land schema
 */
export const LandSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
  totalQuestion: z.number(),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z
    .string()
    .nullable()
    .transform((str) => (str ? new Date(str) : null)),
  createdAt: z.string().transform((str) => new Date(str)),
  updatedAt: z.string().transform((str) => new Date(str)),
});
export type ILandEntity = z.infer<typeof LandSchema>;
//-----------------End-LandSchema-----------------//
