import http from "@configs/fetch"
import { IUpdateMeBodySchema } from "@models/user/request";

const userService = {
    getMe: async () => {
        return await http.get("/auth/me", {
            next: { tags: ['userProfile'] }
        });
    },
    getUsers: async () => {
        return await http.get("/user/user-list", {
            next: { tags: ['modifyUser'] }
        });
    },
    updateMe: async (data: IUpdateMeBodySchema) => {
        return await http.put("/auth/me", data);
    }
}


export default userService