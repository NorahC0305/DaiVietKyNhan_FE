'use client'

import Image from 'next/image'
import TransitionWrapper from '@atoms/TransitionWrapper'
import React, { useState, useCallback, useEffect } from 'react'
import QuangTrung from '../../../../public/QuangTrung_NguyenHue.jpg'
import MacDinhChi from '../../../../public/MacDinhChi.jpg'
import DaiVietKyNhan from '../../../../public/DaiVietKyNhan.jpg'
import TrungTrac from '../../../../public/TrungTrac.jpg'
import DinhBoLinh from '../../../../public/DinhBoLinh.jpg'
import NguyenCongTru from '../../../../public/NguyenCongTru.jpg'
import styles from './index.module.scss'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@routes'
import { useUserSetEmail } from '@stores/user/selectors'

const AuthLayoutClient = ({ children }: { children: React.ReactNode }) => {
    /**
     * Define variables hooks
     */
    const pathname = usePathname()
    //-----------------End-----------------//

    const [isCard1Alt, setIsCard1Alt] = useState<boolean>(false)
    const [isCard2Alt, setIsCard2Alt] = useState<boolean>(false)
    const [isCard1Flipping, setIsCard1Flipping] = useState<boolean>(false)
    const [isCard2Flipping, setIsCard2Flipping] = useState<boolean>(false)

    const handleCard1Iteration = useCallback(() => {
        setIsCard1Alt(prev => !prev)
        setIsCard1Flipping(true)
    }, [])

    const handleCard2Iteration = useCallback(() => {
        setIsCard2Alt(prev => !prev)
        setIsCard2Flipping(true)
    }, [])

    const handleCard1FlipEnd = useCallback(() => {
        setIsCard1Flipping(false)
    }, [])

    const handleCard2FlipEnd = useCallback(() => {
        setIsCard2Flipping(false)
    }, [])

    /**
     * Clear stores when unmount
     */
    const setEmail = useUserSetEmail();
    // useEffect(() => {
    //     return () => {
    //         setEmail("");
    //     };
    // }, []);
    //--------------------End--------------------//

    return (
        <div className={`relative w-full h-screen flex justify-center items-center ${pathname === ROUTES.AUTH.REGISTER ? 'my-20' : ''}`}>
            {/* Card chính - Góc phải trên */}
            <div className={`${styles.card1} hidden md:block`} onAnimationIteration={handleCard1Iteration}>
                <Image
                    src={isCard1Alt ? DinhBoLinh : QuangTrung}
                    alt={isCard1Alt ? 'Đinh Bộ Lĩnh' : 'Quang Trung'}
                    sizes='100vw'
                    className={`${isCard1Flipping ? styles.flipOnce : ''} object-fill rounded-2xl`}
                    onAnimationEnd={handleCard1FlipEnd}
                />
            </div>

            {/* Card thứ 2 - Góc trái trên */}
            <div className={`${styles.card2} hidden md:block`} onAnimationIteration={handleCard2Iteration}>
                <Image
                    src={isCard2Alt ? NguyenCongTru : MacDinhChi}
                    alt={isCard2Alt ? 'Nguyễn Công Trứ' : 'Mạc Đĩnh Chi'}
                    sizes='100vw'
                    className={`${isCard2Flipping ? styles.flipOnce : ''} object-fill rounded-3xl`}
                    onAnimationEnd={handleCard2FlipEnd}
                />
            </div>

            {/* Card thứ 3 - Góc trên */}
            <div className={`${styles.card3} hidden md:block`}>
                <Image
                    src={DaiVietKyNhan}
                    alt="Dại Việt Kỳ Nhân"
                    sizes='100vw'
                    className='rounded-3xl'
                />
            </div>

            {/* Card thứ 4 - Góc phải dưới */}
            <div className={`${styles.card4} hidden md:block`}>
                <Image
                    src={TrungTrac}
                    alt="Trung Trắc"
                    sizes='100vw'
                    className={styles.cardImageCircle}
                />
            </div>
            {/* 

            {/* Main content */}
            <TransitionWrapper className='w-full max-w-xl bg-white/20 lg:bg-white/30 rounded-md overflow-hidden shadow-xl flex justify-center items-center'>
                {children}
            </TransitionWrapper>
        </div>
    )
}

export default AuthLayoutClient