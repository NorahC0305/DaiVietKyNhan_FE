import http from "@configs/fetch"
import { ILoginFormDataRequest, IRegisterFormDataRequest } from "@models/user/request";

const authService = {
    login: async (data: ILoginFormDataRequest) => {
        return await http.post("/auth/login", data);
    },
    register: async (data: IRegisterFormDataRequest) => {
        return await http.post("/auth/register", data);
    },
    resendVerifiedEmail: async (email: string) => {
        return await http.post(`/auth/resend-verified-email/${email}`, {});
    }
}


export default authService