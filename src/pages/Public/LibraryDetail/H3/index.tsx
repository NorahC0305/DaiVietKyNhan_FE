import React from 'react'

const H3LibDetail = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h3 className={`text-2xl lg:text-4xl font-bd-street-sign text-[#222222] mb-2 ${className}`}>
            {children}
        </h3>
    );
};

export default H3LibDetail;