import Image from 'next/image'
import React from 'react'
import ScrollPaper from "../../../../../public/ScrollPaper.svg"

const DetailInfo = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Image src={ScrollPaper} alt="Detail Girl" width={1000} height={1000} />
        </div>
    )
}

export default DetailInfo