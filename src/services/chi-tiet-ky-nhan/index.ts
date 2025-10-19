import http from "@configs/fetch";

const chiTietKyNhanService = {
    createChiTietKyNhanForm: async (formData: FormData) => {
        return await http.post(`/chi-tiet-kynhan/upsert`, formData);
    },
    getChiTietKyNhanByKyNhanId: async (kyNhanId: number) => {
        return await http.get(`/chi-tiet-kynhan/ky-nhan/${kyNhanId}`);
    },
};

export default chiTietKyNhanService;
