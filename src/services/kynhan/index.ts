import http from "@configs/fetch";
import { IKyNhanSummaryResponseModel, IKyNhanResponseModel } from "@models/ky-nhan/response";
import { IUpdateKyNhanRequest } from "@models/ky-nhan/request";


const kynhanService = {
  getKyNhanSummary: async () => {
    return await http.get<IKyNhanSummaryResponseModel>(`/kynhan-summary`, {
      cache: "no-store",
    });
  },
  getKyNhan: async () => {
    return await http.get<IKyNhanResponseModel>(`/kynhan`, {
      cache: "no-store",
    });
  },
  createKyNhan: async (formData: FormData) => {
    return await http.post("/kynhan", formData);
  },
  updateKyNhan: async (kyNhanId: number, formData: FormData) => {
    return await http.put(`/kynhan/${kyNhanId}`, formData);
  },
};

export default kynhanService;
