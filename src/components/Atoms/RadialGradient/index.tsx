import React from 'react'

const RadialGradial = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
    return (
        <h3 style={{
            width: 'fit-content',
            height: 'fit-content',
            fontStyle: 'normal',
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '0.03em',
            background: 'radial-gradient(50% 50% at 50% 50%, #FAC95F 25.48%, #CBA247 65.87%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            ...style,
        }} className={`font-bd-street-sign ${className}`}>
            {children}
        </h3>
    )
}

export default RadialGradial