import http from "@configs/fetch";
import { IKyNhanSummaryResponseModel, IKyNhanResponseModel } from "@models/ky-nhan/response";
import { IUpdateKyNhanRequest } from "@models/ky-nhan/request";


const kynhanService = {

  getKyNhan: async (qs?: string) => {
    return await http.get<IKyNhanResponseModel>(`/kynhan?qs=${qs}`, {
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
