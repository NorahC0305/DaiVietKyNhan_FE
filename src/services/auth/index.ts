import http from "@configs/fetch"
import { ILoginFormDataRequest, IRegisterFormDataRequest, IResetPasswordFormDataRequest, IVerifyOtpFormDataRequest } from "@models/user/request";

const authService = {
    login: async (data: ILoginFormDataRequest) => {
        return await http.post("/auth/login", data);
    },
    googleLogin: async () => {
        return await http.get("/auth/google-link");
    },
    register: async (data: IRegisterFormDataRequest) => {
        return await http.post("/auth/register", data);
    },
    resendVerifiedEmail: async (email: string) => {
        return await http.post(`/auth/resend-verified-email/${email}`, {});
    },
    forgotPassword: async (email: string) => {
        return await http.post(`/auth/forgot-password`, { email });
    },
    resetPassword: async (data: IResetPasswordFormDataRequest) => {
        return await http.post(`/auth/reset-password`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    },
    // sendOtp: async (email: string) => {
    //     return await http.post(`/mail/send-otp?email=${email}`, {});
    // },
    verifyOtp: async (data: IVerifyOtpFormDataRequest) => {
        return await http.post(`/auth/verify-forgot-password`, data);
    }
}


export default authService