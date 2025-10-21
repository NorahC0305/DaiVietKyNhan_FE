'use client'

import React from 'react'
import Image from 'next/image'
import ButtonImage from '@components/Atoms/ButtonImage'
import ModalBackdrop from '@components/Atoms/ModalBackdrop'
import { LAND_CONFIG_KEY } from '@constants/common'

interface CompleteLandProps {
    isOpen: boolean
    onClose: () => void
    land: string
}

const CompleteLand = ({ isOpen, onClose, land }: CompleteLandProps) => {
    const landData = LAND_CONFIG_KEY[land as keyof typeof LAND_CONFIG_KEY]
    return (
        <ModalBackdrop isOpen={isOpen} onClose={onClose}>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    {land === 'ky-linh-viet-hoa' ? (
                        <span className="font-bold text-xl text-justify" style={{ color: landData?.color }}>Kỳ Chủ đã thành công thu thập Kỳ Văn của {landData?.tenNui}. Bạn hãy tiếp tục hành trình của mình ở Vùng đất cuối cùng.</span>
                    ) : (
                        <span className="font-bold text-xl text-justify" style={{ color: landData?.color }}>Kỳ Chủ đã thành công thu thập Kỳ Văn của {landData?.tenNui}. Bạn đang tiến gần hơn đến Vùng đất thứ năm - Vùng đất cuối cùng. Bạn hãy tiếp tục hành trình của mình ở vùng đất kế tiếp.</span>
                    )}
                    <ButtonImage className='mt-4 sm:mt-6' onClick={onClose}>Tiếp tục</ButtonImage>
                </div>
                <Image src={landData?.img} alt="complete-land" width={300} height={300} />
            </div>
        </ModalBackdrop>
    )
}

export default CompleteLand