"use client";

import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function HeaderPublicPermissionLayoutClient({ children }: Props) {
    return (
        <>
            {children}
        </>
    );
}


