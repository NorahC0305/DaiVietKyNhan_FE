"use client";

import { AnimatePresence, EasingFunction, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type React from "react";

const TransitionWrapper = ({
    children,
    className,
    initial = { opacity: 0, y: -20 },
    animate = { opacity: 1, y: 0 },
    exit = { opacity: 0, y: -20 },
    transition = { duration: 0.2, ease: "easeInOut" as unknown as EasingFunction[] },
    mode = "wait",
}: ICOMPONENTS.TransitionWrapperProps) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode={mode as ICOMPONENTS.TransitionMode as "wait" | "popLayout" | "sync" | undefined}>
            <motion.div
                key={pathname}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default TransitionWrapper;