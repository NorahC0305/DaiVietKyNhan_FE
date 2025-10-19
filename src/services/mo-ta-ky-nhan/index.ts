import http from "@configs/fetch";

const libcardService = {
  createLibCard: async (formData: FormData) => {
    // Chỉ nhận FormData và gửi trực tiếp
    return await http.post('/mo-ta-ky-nhan', formData);
  },
};

export default libcardService;
