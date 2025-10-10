'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { ROUTES } from "@routes";
import { ROLE } from "@constants/common";
import LoadingPage from "@components/Molecules/Loading";

const GoogleCompletePage = () => {
    const router = useRouter();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const userRaw = params.get("user");
            const accessToken = params.get("accessToken");
            const refreshToken = params.get("refreshToken");

            if (!accessToken || !refreshToken || !userRaw) {
                router.push(ROUTES.AUTH.LOGIN);
                return;
            }

            const user = await JSON.parse(decodeURIComponent(userRaw));

            const res = await signIn("credentials", {
                redirect: false,
                email: user.email,
                name: user.name,
                password: "__google__",
                accessToken: accessToken,
                refreshToken: refreshToken,
            });

            //#region Handle response
            const status = res?.status;

            //#region Handle success
            if (status === 200) {
                const session = await getSession() as unknown as UTILS.ISession;

                switch (session?.user?.role) {
                    case ROLE.CUSTOMER.ID:
                        router.push(ROUTES.PUBLIC.HOME);
                        break;
                    case ROLE.ADMIN.ID:
                        router.push(ROUTES.ADMIN_DASHBOARD.USER.INFO);
                        break;
                    default:
                        break;
                }
                router.refresh();
                return;
            }
            //#endregion
        };

        handleGoogleAuth();
    }, [router]);

    return (
        <LoadingPage />
    )
};

export default GoogleCompletePage;