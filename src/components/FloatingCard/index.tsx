import React from 'react';

const FloatingCard = ({
    className = "",
    delay = 0,
    amplitude = 10,
    duration = 3000,
    children
}: {
    className: string,
    delay: number,
    amplitude: number,
    duration: number,
    children: React.ReactNode
}) => {
    return (
        <div
            className={`absolute rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-110 hover:z-50 ${className}`}
            style={{
                animation: `float ${duration}ms ease-in-out infinite`,
                animationDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

export default FloatingCard;