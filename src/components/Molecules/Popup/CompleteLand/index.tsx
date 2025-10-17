import React from 'react'
import Image from 'next/image'
import ButtonImage from '@components/Atoms/ButtonImage'

const CompleteLand = () => {
    return (
        <div className='w-[650px] p-10 border-4 border-secondary bg-primary-light font-bold text-xl rounded-2xl'>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <span className='text-[#41821E] text-start'>Kỳ Chủ đã thành công thu thập Kỳ Văn của Núi Tản Viên. Bạn đang tiến gần hơn đến Vùng đất thứ năm - Vùng đất cuối cùng. Bạn hãy tiếp tục hành trình của mình ở vùng đất kế tiếp.</span>
                    <ButtonImage>Tiếp tục</ButtonImage>
                </div>
                <Image src="https://res.cloudinary.com/dznt9yias/image/upload/v1760714093/Logo_ST_w5vzqy.svg" alt="complete-land" width={250} height={250} />
            </div>
        </div>
    )
}

export default CompleteLand