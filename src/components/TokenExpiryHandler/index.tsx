"use client";

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ROUTES } from '@routes';
import { toast } from 'react-toastify';

export default function TokenExpiryHandler() {
    const { data: session, status } = useSession() as { data: { accessToken: string } | null, status: 'loading' | 'authenticated' | 'unauthenticated' };

    useEffect(() => {
        if (status === 'loading' || !session?.accessToken) return;

        try {
            const token = session.accessToken as string;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = payload.exp * 1000;

            if (Date.now() >= expiryTime) {
                handleSignOut();
                return;
            }

            const timeUntilExpiry = expiryTime - Date.now();

            const timeout = setTimeout(() => {
                handleSignOut();
            }, timeUntilExpiry);

            return () => clearTimeout(timeout);
        } catch (error) {
            console.error("Error checking token expiry:", error);
            handleSignOut();
        }
    }, [session?.accessToken, status]);

    const handleSignOut = async () => {
        try {
            // Clear storage trước
            if (typeof window !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
            }

            // SignOut và redirect
            await signOut({
                callbackUrl: ROUTES.AUTH.LOGIN,
                redirect: true
            });

            toast.error("Phiên làm việc hết hạn, vui lòng đăng nhập lại");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return null; // Component không render gì
}
