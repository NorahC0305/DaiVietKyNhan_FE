import z from "zod";

const createChiTietKyNhanRequestSchema = z.object({
    kyNhanId: z.number(),
    thamKhao: z.any(),
    boiCanhLichSuVaXuatThan: z.any(),
    suSachVietGi: z.any(),
    giaiThoaiDanGian: z.any(),
    thuVienAnh: z.any(),
});

export type ICreateChiTietKyNhanRequest = z.infer<typeof createChiTietKyNhanRequestSchema>;