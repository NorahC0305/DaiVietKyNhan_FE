import http from "@configs/fetch"
import { IUpdateMeBodySchema } from "@models/user/request";

const userService = {
    updateMe: async (data: IUpdateMeBodySchema) => {
        return await http.put("/user/me", data);
    }
}


export default userService