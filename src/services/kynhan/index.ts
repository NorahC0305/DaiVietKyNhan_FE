import http from "@configs/fetch";
import {
  IKyNhanSummaryResponseModel,
  IKyNhanResponseModel,
  IKyNhanUserListResponseModel,
  IKyNhanDetailResponseModel,
} from "@models/ky-nhan/response";
import { IUpdateKyNhanRequest } from "@models/ky-nhan/request";

const kynhanService = {
  getKyNhan: async (qs?: string, currentPage?: number, pageSize?: number) => {
    const params = new URLSearchParams();
    if (qs) params.append("qs", qs);
    if (currentPage !== undefined)
      params.append("currentPage", currentPage.toString());
    if (pageSize !== undefined) params.append("pageSize", pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `/kynhan?${queryString}` : "/kynhan";

    return await http.get<IKyNhanResponseModel>(url, {
      cache: "no-store",
    });
  },
  getUserKyNhanList: async (searchQuery?: string) => {
    const qsParts: string[] = [];
    
    // Add default sorting
    qsParts.push("sort:-updatedAt");
    
    // Add search query if provided
    if (searchQuery) {
      qsParts.push(`name:like=${encodeURIComponent(searchQuery)}`);
    }
    
    const queryString = qsParts.join(",");
    return await http.get<IKyNhanUserListResponseModel>(`/kynhan/list/user?qs=${queryString}`, {
      cache: "no-store",
    });
  },
  createKyNhan: async (formData: FormData) => {
    return await http.post("/kynhan", formData);
  },
  updateKyNhan: async (kyNhanId: number, formData: FormData) => {
    return await http.put(`/kynhan/${kyNhanId}`, formData);
  },
  getKyNhanById: async (kyNhanId: number) => {
    return await http.get<IKyNhanDetailResponseModel>(`/kynhan/${kyNhanId}`, {
      cache: "no-store",
    });
  },
};

export default kynhanService;
