'use client'

import Image from 'next/image'
import TransitionWrapper from '@atoms/TransitionWrapper'
import FloatingCard from '@atoms/FloatingCard'
import React from 'react'
import QuangTrung from '../../../../public/QuangTrung_NguyenHue.jpg'
import styles from './index.module.scss'

const AuthLayoutClient = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative w-full h-screen flex justify-center items-center overflow-hidden'>
            {/* Floating Cards với animation tự nhiên */}

            {/* Card chính - Góc phải trên */}
            <div className={styles.card1}>
                <Image
                    src={QuangTrung}
                    alt="Tướng Sĩ"
                    fill
                    className='object-fill rounded-3xl'
                />
            </div>

            {/* Card thứ 2 - Góc trái trên */}
            <div className={styles.card2}>
                <Image
                    src={QuangTrung}
                    alt="Tướng Sĩ 2"
                    fill
                    className='object-fill rounded-3xl'
                />
            </div>

            {/* Card thứ 3 - Góc phải dưới */}
            <div className={styles.card3}>
                <Image
                    src={QuangTrung}
                    alt="Tướng Sĩ 3"
                    fill
                    className={styles.cardImageCircle}
                />
            </div>
            {/* 

            {/* Main content */}
            <TransitionWrapper className='w-full max-w-xl bg-white/30 rounded-md overflow-hidden shadow-xl flex justify-center items-center'>
                {children}
            </TransitionWrapper>
        </div>
    )
}

export default AuthLayoutClient