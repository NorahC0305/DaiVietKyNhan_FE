'use client'

import React from 'react'
import Image from 'next/image'
import ButtonImage from '@components/Atoms/ButtonImage'
import ModalBackdrop from '@components/Atoms/ModalBackdrop'
import { LAND_CONFIG } from '@constants/common'

type LandKey = 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'
interface CompleteLandProps {
    isOpen: boolean
    onClose: () => void
    land: LandKey
}

const CompleteLand = ({ isOpen, onClose, land }: CompleteLandProps) => {
    const kyChu = LAND_CONFIG[land as LandKey]
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