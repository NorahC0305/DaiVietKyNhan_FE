import { z } from "zod";

/**
 * Create mo ta ky nhan request schema
 */
export const CreateMoTaKyNhanRequestSchema = z.object({
  ten: z.string(),
  danhHieu: z.string(),
  namSinhNamMat: z.string().optional(),
  queQuan: z.string().optional(),
  xuatThan: z.string().optional(),
  khoiNghia: z.string().optional(),
  nguoiDongHanh: z.string().optional(),
  phuQuan: z.string().optional(),
  chienCong: z.string().optional(),
  dinhCao: z.string().optional(),
  ketCuc: z.string().optional(),
  kyNhanId: z.number(),
  imgUrl: z.instanceof(File).optional(),
});

export type ICreateMoTaKyNhanRequest = z.infer<typeof CreateMoTaKyNhanRequestSchema>;

/**
 * Update mo ta ky nhan request schema
 */
export const UpdateMoTaKyNhanRequestSchema = z.object({
  ten: z.string().optional(),
  danhHieu: z.string().optional(),
  namSinhNamMat: z.string().optional(),
  queQuan: z.string().optional(),
  xuatThan: z.string().optional(),
  khoiNghia: z.string().optional(),
  nguoiDongHanh: z.string().optional(),
  phuQuan: z.string().optional(),
  chienCong: z.string().optional(),
  dinhCao: z.string().optional(),
  ketCuc: z.string().optional(),
  kyNhanId: z.number().optional(),
  imgUrl: z.instanceof(File).optional(),
});

export type IUpdateMoTaKyNhanRequest = z.infer<typeof UpdateMoTaKyNhanRequestSchema>;
