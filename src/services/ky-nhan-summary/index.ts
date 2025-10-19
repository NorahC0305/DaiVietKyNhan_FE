import http from "@configs/fetch";
import {
  IKyNhanSummaryResponseModel,
  CreateKyNhanSummaryResponseModel,
  ICreateKyNhanSummaryResponseModel,
} from "@models/kynhanSummary/response";
import {
  CreateKyNhanSummaryRequestSchema,
  ICreateKyNhanSummaryRequest,
} from "@models/kynhanSummary/request";

export interface KyNhanSummaryResponse {
  summary: string;
}

const kyNhanSummaryService = {
  // Fetch all questions and user's answered status for a specific map/region
  getKyNhanSummary: async () => {
    return await http.get<IKyNhanSummaryResponseModel>(`/kynhan-summary`, {
      cache: "no-store",
    });
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
};

export default kyNhanSummaryService;
