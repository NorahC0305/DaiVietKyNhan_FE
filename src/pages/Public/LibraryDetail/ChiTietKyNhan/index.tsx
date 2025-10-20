"use client"

import React, { useEffect, useMemo, useState } from 'react'
import chiTietKyNhanService from '@services/chi-tiet-ky-nhan'
import TipTapEditor from '@components/Organisms/Tiptap'
import Image from 'next/image'

interface ChiTietKyNhanProps {
    kyNhanId: number
}

interface ChiTietKyNhanResponse {
    id: number
    kyNhanId: number
    thamKhao: string | null
    media: Array<{ id: number; url: string; alt?: string | null }>
    boiCanhLichSuVaSuuThan?: Array<{ id: number; tieuDe: string; noiDung: string; nguon?: string | null; thuTu?: number | null }>
    boiCanhLichSuVaXuatThan?: Array<{ id: number; tieuDe: string; noiDung: string; nguon?: string | null; thuTu?: number | null }>
    suSachVietGi?: Array<{ id: number; tieuDe: string; doanVan: string; tacGia?: string | null; nguonSach?: string | null; thuTu?: number | null }>
    giaiThoaiDanGian?: Array<{ id: number; tieuDe: string; noiDung: string; nguon?: string | null; thuTu?: number | null }>
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center mt-10 mb-7">
        <h2 className="font-bd-street-sign text-3xl lg:text-5xl text-[#CBA247]">{children}</h2>
    </div>
)

const ChiTietKyNhan: React.FC<ChiTietKyNhanProps> = ({ kyNhanId }) => {
    const [data, setData] = useState<ChiTietKyNhanResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await chiTietKyNhanService.getChiTietKyNhanByKyNhanId(kyNhanId) as any
                console.log('API Response:', res?.data[0]?.media);

                const payload = res?.data[0] || res?.data
                setData(payload || null)
            } catch (e) {
                console.error(e)
                setError('Không tải được chi tiết kỳ nhân')
            } finally {
                setLoading(false)
            }
        }
        if (kyNhanId) fetchData()
    }, [kyNhanId])

    const boiCanh = useMemo(() => {
        return data?.boiCanhLichSuVaXuatThan || data?.boiCanhLichSuVaSuuThan || []
    }, [data])

    if (loading) {
        return <div className="w-full flex items-center justify-center py-10 text-white">Đang tải chi tiết...</div>
    }

    if (error) {
        return <div className="w-full flex items-center justify-center py-10 text-red-500">{error}</div>
    }

    if (!data) {
        return null
    }

    return (
        <div className="flex flex-col mx-6 lg:mx-52">
            <SectionTitle>BỐI CẢNH LỊCH SỬ</SectionTitle>
            <div className="space-y-6">
                {boiCanh.map((item) => (
                    <div key={item.id}>
                        {item.tieuDe && (
                            <div className="text-white font-bd-street-sign text-3xl mb-2">{item.tieuDe.trim()}</div>
                        )}
                        <TipTapEditor value={item.noiDung || ''} onChange={() => { }} disabled className="rounded-md border-0 m-h-fit" />
                        {item.nguon && (
                            <div className="text-sm text-gray-300 mt-2">Nguồn: {item.nguon}</div>
                        )}
                    </div>
                ))}
                {boiCanh.length === 0 && (
                    <div className="text-gray-300">Chưa có dữ liệu</div>
                )}
            </div>

            <SectionTitle>SỬ SÁCH VIẾT GÌ</SectionTitle>
            <div className="space-y-6">
                {(data.suSachVietGi || []).map((item) => (
                    <div key={item.id}>
                        <div className="flex flex-col gap-2">
                            {item.tieuDe && (
                                <div className="text-white font-bd-street-sign text-3xl">{item.tieuDe.trim()}</div>
                            )}
                            <TipTapEditor value={item.doanVan || ''} onChange={() => { }} disabled className="rounded-md border-0 h-fit" />
                            <div className="text-sm text-gray-300">
                                {item.tacGia ? `Tác giả: ${item.tacGia}` : ''}{item.tacGia && item.nguonSach ? ' • ' : ''}{item.nguonSach ? `Nguồn: ${item.nguonSach}` : ''}
                            </div>
                        </div>
                    </div>
                ))}
                {(!data.suSachVietGi || data.suSachVietGi.length === 0) && (
                    <div className="text-gray-300">Chưa có dữ liệu</div>
                )}
            </div>

            <SectionTitle>GIAI ĐOẠN DÂN GIAN VÀ TRUYỀN THUYẾT</SectionTitle>
            <div className="space-y-6">
                {(data.giaiThoaiDanGian || []).map((item) => (
                    <div key={item.id}>
                        {item.tieuDe && (
                            <div className="text-white font-bd-street-sign text-3xl mb-2">{item.tieuDe.trim()}</div>
                        )}
                        <TipTapEditor value={item.noiDung || ''} onChange={() => { }} disabled className="rounded-md border-0 m-h-fit" />
                        {item.nguon && (
                            <div className="text-sm text-gray-300 mt-2">Nguồn: {item.nguon}</div>
                        )}
                    </div>
                ))}
                {(!data.giaiThoaiDanGian || data.giaiThoaiDanGian.length === 0) && (
                    <div className="text-gray-300">Chưa có dữ liệu</div>
                )}
            </div>

            <SectionTitle>THAM KHẢO</SectionTitle>
            <div>
                <TipTapEditor value={data.thamKhao || ''} onChange={() => { }} disabled className="rounded-md border-0 h-fit" />
            </div>

            {data?.media && data?.media?.length > 0 ? (
                <>
                    <SectionTitle>THƯ VIỆN ẢNH</SectionTitle>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data?.media?.map((m) => (
                            <div key={m.id} className="relative w-full aspect-square rounded-lg overflow-hidden">
                                <Image src={m.url} alt={m.alt || 'media'} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </>
            ) : <></>}
        </div>
    )
}

export default ChiTietKyNhan