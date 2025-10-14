import React from 'react'
import { cn } from '@/utils/CN'

const Avartar = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center border-2 h-16 w-16 border-third-light bg-third-lightest rounded-full", className)}>
            {children}
        </div>
    )
}

export default Avartar