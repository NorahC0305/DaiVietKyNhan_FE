"use client"

import { RotateCw } from "lucide-react";

export default function ForceLandscape({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="hidden landscape:block">
                {children}
            </main>

            <div className="flex flex-col items-center justify-center text-center h-screen bg-black text-white landscape:hidden">
                <RotateCw className="mb-4" />
                <p className="text-xl">Vui lòng xoay ngang màn hình để sử dụng.</p>
            </div>
        </>
    );
}