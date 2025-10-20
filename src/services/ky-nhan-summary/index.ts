import http from "@configs/fetch";
import {
  IKyNhanSummaryResponseModel,
  CreateKyNhanSummaryResponseModel,
  ICreateKyNhanSummaryResponseModel,
  IUpdateKyNhanSummaryResponseModel,
  IGetKyNhanSummaryByIdResponseModel,
} from "@models/kynhanSummary/response";
import {
  CreateKyNhanSummaryRequestSchema,
  ICreateKyNhanSummaryRequest,
  IUpdateKyNhanSummaryRequest,
} from "@models/kynhanSummary/request";
import { IKyNhanSummary } from "@models/kynhanSummary/entity";

export interface KyNhanSummaryResponse {
  summary: string;
}

const kyNhanSummaryService = {
  // Fetch all ky nhan summaries
  getKyNhanSummary: async (qs?: string, currentPage?: number, pageSize?: number) => {
    const params = new URLSearchParams();
    if (qs) params.append("qs", qs);
    if (currentPage !== undefined) params.append("currentPage", currentPage.toString());
    if (pageSize !== undefined) params.append("pageSize", pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `/kynhan-summary?${queryString}` : "/kynhan-summary";
    
    return await http.get<IKyNhanSummaryResponseModel>(url, {
      cache: "no-store",
    });
  },

  // Get ky nhan summary by ID
  getKyNhanSummaryById: async (kyNhanSummaryId: number) => {
    return await http.get<IGetKyNhanSummaryByIdResponseModel>(
      `/kynhan-summary/${kyNhanSummaryId}`,
      {
        cache: "no-store",
      }
    );
  },

  getKyNhanWwithLand: async (landId: number) => {
    return await http.get<IKyNhanSummaryResponseModel>(
      `/kynhan-summary/land/${landId}`,
      {
        cache: "no-store",
      }
    );
  },

  // Create new kỳ nhân summary
  createKyNhanSummary: async (formData: ICreateKyNhanSummaryRequest | FormData) => {
    return await http.post<ICreateKyNhanSummaryResponseModel>(
      `/kynhan-summary`,
      formData
    );
  },

  // Update ky nhan summary
  updateKyNhanSummary: async (kyNhanSummaryId: number, formData: IUpdateKyNhanSummaryRequest | FormData) => {
    return await http.put<IUpdateKyNhanSummaryResponseModel>(
      `/kynhan-summary/${kyNhanSummaryId}`,
      formData
    );
  },
};

export default kyNhanSummaryService;
