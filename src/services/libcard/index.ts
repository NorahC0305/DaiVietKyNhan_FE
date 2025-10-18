import http from "@configs/fetch";

interface CreateLibCardRequest {
  imgUrl: File;
  ten: string;
  danhHieu: string;
  namSinhNamMat: string;
  queQuan: string;
  xuatThan: string;
  khoiNghia: string;
  nguoiDongHanh: string;
  phuQuan: string;
  chienCong: string;
  dinhCao: string;
  ketCuc: string;
  kyNhanId: number;
}

const libcardService = {
  createLibCard: async (data: CreateLibCardRequest) => {
    const formData = new FormData();
    formData.append('imgUrl', data.imgUrl);
    formData.append('ten', data.ten);
    formData.append('danhHieu', data.danhHieu);
    formData.append('namSinhNamMat', data.namSinhNamMat);
    formData.append('queQuan', data.queQuan);
    formData.append('xuatThan', data.xuatThan);
    formData.append('khoiNghia', data.khoiNghia);
    formData.append('nguoiDongHanh', data.nguoiDongHanh);
    formData.append('phuQuan', data.phuQuan);
    formData.append('chienCong', data.chienCong);
    formData.append('dinhCao', data.dinhCao);
    formData.append('ketCuc', data.ketCuc);
    formData.append('kyNhanId', data.kyNhanId.toString());
    
    return await http.post('/mo-ta-ky-nhan', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default libcardService;
export type { CreateLibCardRequest };
