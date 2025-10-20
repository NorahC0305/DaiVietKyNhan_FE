import { z } from "zod";

/**
 * Mo ta ky nhan schema
 */
export const MoTaKyNhanSchema = z.object({
  id: z.number(),
  ten: z.string(),
  danhHieu: z.string(),
  namSinhNamMat: z.string(),
  queQuan: z.string(),
  xuatThan: z.string(),
  khoiNghia: z.string(),
  nguoiDongHanh: z.string(),
  phuQuan: z.string(),
  chienCong: z.string(),
  dinhCao: z.string(),
  ketCuc: z.string(),
  imgUrl: z.string(),
  kyNhanId: z.number(),
  createdById: z.number(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IMoTaKyNhan = z.infer<typeof MoTaKyNhanSchema>;
