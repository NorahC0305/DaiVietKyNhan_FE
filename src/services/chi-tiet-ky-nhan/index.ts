import http from "@configs/fetch";

const chiTietKyNhanService = {
    createChiTietKyNhanForm: async (formData: FormData) => {
        return await http.post(`/chi-tiet-kynhan/full`, formData);
    },
};

export default chiTietKyNhanService;
