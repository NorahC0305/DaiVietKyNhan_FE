import http from "@configs/fetch"
import { IUpdateMeBodySchema } from "@models/user/request";

const userService = {
    getMe: async () => {
        return await http.get("/auth/me", { 
            next: { tags: ['userProfile']}
        });
    },
    updateMe: async (data: IUpdateMeBodySchema) => {
        return await http.put("/auth/me", data);
    }
}


export default userService