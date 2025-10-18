import React from 'react'
import { cn } from '@/utils/CN'

const Avartar = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center border-2 lg:h-16 lg:w-16 h-12 w-12 border-third-light bg-third-lightest rounded-full", className)}>
            {children}
        </div>
    )
}

export default Avartar