import z from "zod";

export const ChiTietKyNhanSchema = z.object({
    id: z.number(),
    kyNhanId: z.number(),
    thamKhao: z.string().nullable(),
    media: z.array(z.object({ id: z.number(), url: z.string(), alt: z.string().nullable() })),
    boiCanhLichSuVaSuuThan: z.array(z.object({ id: z.number(), tieuDe: z.string(), noiDung: z.string(), nguon: z.string().nullable(), thuTu: z.number().nullable() })),
    boiCanhLichSuVaXuatThan: z.array(z.object({ id: z.number(), tieuDe: z.string(), noiDung: z.string(), nguon: z.string().nullable(), thuTu: z.number().nullable() })),
    suSachVietGi: z.array(z.object({ id: z.number(), tieuDe: z.string(), doanVan: z.string(), tacGia: z.string().nullable(), nguonSach: z.string().nullable(), thuTu: z.number().nullable() })),
    giaiThoaiDanGian: z.array(z.object({ id: z.number(), tieuDe: z.string(), noiDung: z.string(), nguon: z.string().nullable(), thuTu: z.number().nullable() })),
}); 

export type IChiTietKyNhanResponse = z.infer<typeof ChiTietKyNhanSchema>;