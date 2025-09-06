'use client'

import TransitionWrapper from '@components/Atoms/TransitionWrapper'
import React from 'react'

const AuthLayoutClient = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <TransitionWrapper className='w-full max-w-6xl bg-white/30 rounded-md overflow-hidden shadow-xl flex justify-center items-center'>
                {children}
            </TransitionWrapper>
        </div>
    )
}

export default AuthLayoutClient