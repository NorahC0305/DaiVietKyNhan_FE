"use client";

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ROUTES } from '@routes';
import { toast } from 'react-toastify';

export default function TokenExpiryHandler() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading' || !session?.accessToken) return;

        try {
            // Decode JWT để lấy thời gian hết hạn
            const token = session.accessToken;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = payload.exp * 1000; // Convert to milliseconds

            // Kiểm tra ngay lập tức
            if (Date.now() >= expiryTime) {
                console.log("Token already expired, signing out immediately...");
                handleSignOut();
                return;
            }

            // Tính thời gian còn lại
            const timeUntilExpiry = expiryTime - Date.now();

            // Set timeout để signOut khi token hết hạn
            const timeout = setTimeout(() => {
                console.log("Token expired, signing out...");
                handleSignOut();
            }, timeUntilExpiry);

            return () => clearTimeout(timeout);
        } catch (error) {
            console.error("Error checking token expiry:", error);
            // Nếu không decode được token, signOut ngay
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
