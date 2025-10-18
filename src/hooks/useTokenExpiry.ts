import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ROUTES } from '@routes';
import { toast } from 'react-toastify';

export function useTokenExpiry() {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session?.accessToken) return;

        try {
            // Decode JWT để lấy thời gian hết hạn
            const token = session.accessToken;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = payload.exp * 1000; // Convert to milliseconds

            const checkExpiry = () => {
                if (Date.now() >= expiryTime) {
                    console.log("Token expired, signing out...");
                    // Force signOut và clear session
                    signOut({
                        callbackUrl: ROUTES.AUTH.LOGIN,
                        redirect: true
                    }).then(() => {
                        // Clear localStorage nếu có
                        if (typeof window !== 'undefined') {
                            localStorage.clear();
                            sessionStorage.clear();
                        }
                    });
                    toast.error("Phiên làm việc hết hạn, vui lòng đăng nhập lại");
                }
            };

            // Kiểm tra ngay lập tức
            checkExpiry();

            // Set interval để kiểm tra mỗi phút
            const interval = setInterval(checkExpiry, 60000);

            return () => clearInterval(interval);
        } catch (error) {
            console.error("Error checking token expiry:", error);
        }
    }, [session?.accessToken]);
}
