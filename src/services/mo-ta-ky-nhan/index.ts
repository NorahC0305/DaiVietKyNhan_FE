import http from "@configs/fetch";
import { IMoTaKyNhanListResponseModel, IMoTaKyNhanDetailResponseModel } from "@models/mo-ta-ky-nhan/response";
import { IMoTaKyNhan } from "@models/mo-ta-ky-nhan/entity";

interface GetMoTaKyNhanListParams {
  currentPage?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
}

const libcardService = {
  createLibCard: async (formData: FormData) => {
    // Chỉ nhận FormData và gửi trực tiếp
    return await http.post('/mo-ta-ky-nhan', formData);
  },

  getMoTaKyNhanList: async (params: GetMoTaKyNhanListParams = {}) => {
    const queryParams = new URLSearchParams();

    if (params.currentPage) queryParams.append('currentPage', params.currentPage.toString());
    if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params.sort) queryParams.append('qs', params.sort);
    if (params.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const url = queryString ? `/mo-ta-ky-nhan?${queryString}` : '/mo-ta-ky-nhan';

    return await http.get<IMoTaKyNhanListResponseModel>(url);
  },

  getMoTaKyNhanById: async (id: number) => {
    return await http.get<IMoTaKyNhanDetailResponseModel>(`/mo-ta-ky-nhan/${id}`);
  },

  getMoTaKyNhanByKyNhanId: async (kyNhanId: number) => {
    return await http.get(`/mo-ta-ky-nhan/kynhan/${kyNhanId}`);
  },

  updateMoTaKyNhan: async (id: number, formData: FormData) => {
    return await http.put(`/mo-ta-ky-nhan/${id}`, formData);
  },

  deleteMoTaKyNhan: async (id: number) => {
    return await http.delete(`/mo-ta-ky-nhan/${id}`, {});
  },
};

export default libcardService;
