import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ROUTES } from '@routes';
import { toast } from 'react-toastify';

export function useTokenExpiry() {
    const { data: session } = useSession() as { data: { accessToken: string } | null };

    useEffect(() => {
        if (!session?.accessToken) return;  

        try {
            const token = session.accessToken as string;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = payload.exp * 1000;

            const checkExpiry = () => {
                if (Date.now() >= expiryTime) {
                    console.log("Token expired, signing out...");
                    signOut({
                        callbackUrl: ROUTES.AUTH.LOGIN,
                        redirect: true
                    }).then(() => {
                        if (typeof window !== 'undefined') {
                            localStorage.clear();
                            sessionStorage.clear();
                        }
                    });
                    toast.error("Phiên làm việc hết hạn, vui lòng đăng nhập lại");
                }
            };

            checkExpiry();

            const interval = setInterval(checkExpiry, 60000);

            return () => clearInterval(interval);
        } catch (error) {
            console.error("Error checking token expiry:", error);
        }
    }, [session?.accessToken]);
}
