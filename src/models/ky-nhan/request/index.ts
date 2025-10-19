import { z } from "zod";

/**
 * KyNhan update request schema
 */
export const UpdateKyNhanRequestSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  thoiKy: z.string().min(1, "Thời kỳ không được để trống"),
  chienCong: z.string().min(1, "Chiến công không được để trống"),
  active: z.boolean(),
});

export type IUpdateKyNhanRequest = z.infer<typeof UpdateKyNhanRequestSchema>;
