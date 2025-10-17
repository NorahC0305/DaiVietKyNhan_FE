import React from 'react'
import Image from 'next/image'
import Button from '../../../../public/Button.svg'
import { cn } from '@/utils/CN'

interface ButtonImageProps {
    children?: React.ReactNode
    className?: string
}

const ButtonImage = ({ children, className }: ButtonImageProps) => {
    return (
        <button className={cn('relative cursor-pointer', className)}>
            <Image src={Button} alt="button" width={150} height={150} />
            <span className='absolute text-secondary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl'>{children}</span>
        </button>
    )
}

export default ButtonImage