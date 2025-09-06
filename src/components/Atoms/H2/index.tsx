import React from 'react'

const H2 = ({ children, className, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) => {

    return (
        <h1 className={`text-lg font-bold text-white ${className}`} {...props}>{children}</h1>
    )
}

export default H2