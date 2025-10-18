"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import TokenExpiryHandler from "@/components/TokenExpiryHandler";

interface SessionProviderWrapperProps {
    children: ReactNode;
}

export default function SessionProviderWrapper({
    children,
}: SessionProviderWrapperProps) {
    return (
        <SessionProvider>
            <TokenExpiryHandler />
            {children}
        </SessionProvider>
    );
}
