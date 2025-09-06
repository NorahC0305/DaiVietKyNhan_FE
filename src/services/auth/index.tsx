import http from "@configs/fetch"

const authService = {
    login: async (data: any) => {
        return await http.post("/auth/login", data);
    },
}


export default authService