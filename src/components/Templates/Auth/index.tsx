'use client'

import GameCard from '@components/Atoms/GameCard'
import TransitionWrapper from '@components/Atoms/TransitionWrapper'
import FloatingCard from '@components/FloatingCard'
import React from 'react'


const AuthLayoutClient = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative w-full h-screen flex justify-center items-center overflow-hidden'>
            {/* Floating Cards - Bên phải */}
            <FloatingCard
                className="top-16 right-16 w-24 h-32 z-10"
                delay={0}
                amplitude={10}
                duration={3000}
            >
                <GameCard title="Tướng Sĩ" bgColor="bg-amber-700" textColor="text-white" subtitle="Anh Hùng" />
            </FloatingCard>
            {/* 

            {/* Main content - Form đăng nhập */}
            <TransitionWrapper className='w-full max-w-xl bg-white/30 rounded-md overflow-hidden shadow-xl flex justify-center items-center'>
                {children}
            </TransitionWrapper>
        </div>
    )
}

export default AuthLayoutClient