"use client"

import React, { useEffect, useState } from 'react'
import kynhanService from '@services/kynhan'
import { IKyNhan } from '@models/ky-nhan/entity'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@components/Atoms/ui/select'
import { Avatar, AvatarImage, AvatarFallback } from '@components/Atoms/ui/avatar'
import { Input } from '@components/Atoms/ui/input'
import { Search } from 'lucide-react'
import useDebounce from '@hooks/useDebounce'

type KyNhanSelectProps = {
    value?: number | null
    onChange: (id: number | null) => void
    placeholder?: string
    className?: string
    landId?: number
    pageSize?: number
}

const KyNhanSelect: React.FC<KyNhanSelectProps> = ({
    value,
    onChange,
    placeholder = 'Chọn Kỳ Nhân',
    className,
    landId,
    pageSize = 300,
}) => {
    const [options, setOptions] = useState<IKyNhan[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // Fetch from API using search query (debounced)
    const debouncedQuery = useDebounce(searchQuery, 300)

    useEffect(() => {
        let mounted = true
        const controller = new AbortController()
        const load = async () => {
            try {
                setLoading(true)
                const nameLike = debouncedQuery?.trim() || ''
                const qs = nameLike
                    ? `sort:id,name:like=${encodeURIComponent(nameLike)}`
                    : 'sort:id'
                const res = await kynhanService.getKyNhan(qs, 1, pageSize)
                const items = res?.data?.results ?? []
                const filtered = typeof landId === 'number' ? items.filter((i: IKyNhan) => i.landId === landId) : items
                if (mounted) setOptions(filtered)
            } catch (_) {
                if (mounted) setOptions([])
            } finally {
                if (mounted) setLoading(false)
            }
        }
        load()

        return () => {
            mounted = false
            controller.abort()
        }
    }, [debouncedQuery, pageSize, landId])

    // Reset search when dropdown closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('')
        }
    }, [isOpen])

    const selected = options.find((o) => o.id === value)

    return (
        <Select
            value={value != null ? String(value) : undefined}
            onValueChange={(val) => onChange(val ? parseInt(val, 10) : null)}
            disabled={loading}
            onOpenChange={setIsOpen}
        >
            <SelectTrigger className={className}>
                <div className="flex items-center gap-2">
                    {selected ? (
                        <>
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={selected.imgUrl} alt={selected.name} />
                                <AvatarFallback>{selected.name?.charAt(0) ?? '?'}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{selected.name}</span>
                        </>
                    ) : (
                        <SelectValue placeholder={loading ? 'Đang tải...' : placeholder} />
                    )}
                </div>
            </SelectTrigger>
            <SelectContent>
                {/* Search Input */}
                <div className="p-2 border-b">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm theo tên..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-sm"
                            onClick={(e) => e.stopPropagation()}
                            color="black"
                        />
                    </div>
                </div>

                {/* Options List */}
                {options.length > 0 ? (
                    options.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={item.imgUrl} alt={item.name} />
                                    <AvatarFallback>{item.name?.charAt(0) ?? '?'}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{item.name}</span>
                            </div>
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-2 text-sm text-gray-500 text-center">
                        {searchQuery ? 'Không tìm thấy Kỳ Nhân nào' : 'Không có dữ liệu'}
                    </div>
                )}
            </SelectContent>
        </Select>
    )
}

export default KyNhanSelect


