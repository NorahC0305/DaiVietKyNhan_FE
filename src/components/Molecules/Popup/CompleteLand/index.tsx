'use client'

import React from 'react'
import Image from 'next/image'
import ButtonImage from '@components/Atoms/ButtonImage'
import X from '../../../../../public/X.svg'
import { cn } from '@/utils/CN'
import ModalBackdrop from '@components/Atoms/ModalBackdrop'

interface CompleteLandProps {
    isOpen: boolean
    onClose: () => void
}

const CompleteLand = ({ isOpen, onClose }: CompleteLandProps) => {
    return (
        <ModalBackdrop isOpen={isOpen} onClose={onClose}>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <span className='text-[#41821E] font-bold text-xl text-justify'>Kỳ Chủ đã thành công thu thập Kỳ Văn của Núi Tản Viên. Bạn đang tiến gần hơn đến Vùng đất thứ năm - Vùng đất cuối cùng. Bạn hãy tiếp tục hành trình của mình ở vùng đất kế tiếp.</span>
                    <ButtonImage className='mt-4'>Tiếp tục</ButtonImage>
                </div>
                <Image src="https://res.cloudinary.com/dznt9yias/image/upload/v1760714093/Logo_ST_w5vzqy.svg" alt="complete-land" width={300} height={300} />
            </div>
        </ModalBackdrop>
    )
}

export default CompleteLand