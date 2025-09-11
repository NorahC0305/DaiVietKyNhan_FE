'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function Sparkle({ id, top, left, onAnimationEnd }: { id: number, top: number, left: number, onAnimationEnd: (id: number) => void }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onAnimationEnd(id);
        }, 2000);

        return () => clearTimeout(timer);
    }, [id, onAnimationEnd]);

    if (!visible) return null;

    return (
        <div
            className={clsx('fixed w-[6px] h-[6px] bg-amber-400 rounded-full pointer-events-none z-[5] animate-sparkle')}
            style={{ top: `${top}px`, left: `${left}px` }}
        />
    );
}