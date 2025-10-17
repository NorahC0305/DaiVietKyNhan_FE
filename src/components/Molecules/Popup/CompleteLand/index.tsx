'use client'

import React from 'react'
import Image from 'next/image'
import ButtonImage from '@components/Atoms/ButtonImage'
import ModalBackdrop from '@components/Atoms/ModalBackdrop'

type LandType = 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'

const LAND_CONFIG: Record<LandType, { img: string; tenNui: string; color: string }> = {
    'Sơn Tinh': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714093/Logo_ST_w5vzqy.svg',
        tenNui: 'Núi Tản Viên',
        color: '#41821E'
    },
    'Thánh Gióng': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714074/Logo_TG_ybvbuo.svg',
        tenNui: 'Đền Phù Đổng',
        color: '#EF493D'
    },
    'Chử Đồng Tử': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714057/Logo_C%C4%90T_dvt4yb.svg',
        tenNui: 'Đầm Dạ Trạch',
        color: '#2B638F'
    },
    'Liễu Hạnh': {
        img: 'https://res.cloudinary.com/dznt9yias/image/upload/v1760714057/Logo_C%C4%90T_dvt4yb.svg',
        tenNui: 'Phủ Tây Hồ',
        color: '#8D3BBB'
    }
}

interface CompleteLandProps {
    isOpen: boolean
    onClose: () => void
    land: LandType
}

const CompleteLand = ({ isOpen, onClose, land }: CompleteLandProps) => {
    const kyChu = LAND_CONFIG[land]
    return (
        <ModalBackdrop isOpen={isOpen} onClose={onClose}>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    {land === 'Liễu Hạnh' ? (
                        <span className="font-bold text-xl text-justify" style={{ color: kyChu?.color }}>Kỳ Chủ đã thành công thu thập Kỳ Văn của {kyChu?.tenNui}. Bạn hãy tiếp tục hành trình của mình ở Vùng đất cuối cùng.</span>
                    ) : (
                        <span className="font-bold text-xl text-justify" style={{ color: kyChu?.color }}>Kỳ Chủ đã thành công thu thập Kỳ Văn của {kyChu?.tenNui}. Bạn đang tiến gần hơn đến Vùng đất thứ năm - Vùng đất cuối cùng. Bạn hãy tiếp tục hành trình của mình ở vùng đất kế tiếp.</span>
                    )}
                    <ButtonImage className='mt-4 sm:mt-6'>Tiếp tục</ButtonImage>
                </div>
                <Image src={kyChu?.img} alt="complete-land" width={300} height={300} />
            </div>
        </ModalBackdrop>
    )
}

export default CompleteLand