import { z } from "zod";


/**
 * KyNhan Summary create request schema
 */
export const CreateKyNhanSummaryRequestSchema = z.object({
  imgUrl: z.instanceof(File, { message: "Ảnh không được để trống" }),
  kyNhanId: z.number().min(1, "ID kỳ nhân không được để trống"),
  summary: z.string().min(1, "Tóm tắt không được để trống"),
});

export type ICreateKyNhanSummaryRequest = z.infer<typeof CreateKyNhanSummaryRequestSchema>;
