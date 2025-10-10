import http from "@configs/fetch"
import { ISetReleaseDateBodySchema, IUpdateReleaseDateBodySchema } from "@models/system/request";


const systemService = {
    getReleaseDate: async () => {
        return await http.get("/system/release-date");
    },
    updateReleaseDate: async (data: IUpdateReleaseDateBodySchema) => {
        return await http.patch("/system/release-date", data);
    },
    deleteReleaseDate: async (id: number) => {
        return await http.delete("/system/release-date", { body: { id } });
    },
    setReleaseDate: async (data: ISetReleaseDateBodySchema) => {
        return await http.post("/system-config", data);
    }
}


export default systemService