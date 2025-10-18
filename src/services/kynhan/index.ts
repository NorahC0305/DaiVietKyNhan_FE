import http from "@configs/fetch";
import { IKyNhanSummaryResponseModel } from "@models/ky-nhan/response";

interface CreateKyNhanRequest {
  imgUrl: File;
  name: string;
  thoiky: string;
  chienCong: string;
  active: boolean;
  landId: number;
}

const kynhanService = {
  getKyNhanSummary: async () => {
    return await http.get<IKyNhanSummaryResponseModel>(`/kynhan-summary`, {
      cache: "no-store",
    });
  },
  createKyNhan: async (data: CreateKyNhanRequest) => {
    const formData = new FormData();
    formData.append('imgUrl', data.imgUrl);
    formData.append('name', data.name);
    formData.append('thoiky', data.thoiky);
    formData.append('chienCong', data.chienCong);
    formData.append('active', data.active.toString());
    formData.append('landId', data.landId.toString());
    
    return await http.post('/kynhan', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default kynhanService;