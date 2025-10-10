import http from "@configs/fetch"
import { ISetReleaseDateBodySchema, IUpdateReleaseDateBodySchema } from "@models/system/request";


const systemService = {
    getReleaseDate: async (qs: string) => {
        return await http.get(`/system-config?qs=${qs}`);
    },
    getActiveWithAmountUser: async (isActive: boolean) => {
        return await http.get(`/system-config/active/${isActive}`, {
            cache: 'no-store',
        });
    },
    updateReleaseDate: async (id:number, data: IUpdateReleaseDateBodySchema) => {
        return await http.put(`/system-config/${id}`, data);
    },
    deleteReleaseDate: async (id:number) => {
        return await http.delete(`/system-config/${id}`,{});
    },
    setReleaseDate: async (data: ISetReleaseDateBodySchema) => {
        return await http.post("/system-config", data);
    }
}


export default systemService