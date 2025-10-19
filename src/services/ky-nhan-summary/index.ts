import http from "@configs/fetch";
import { IKyNhanSummaryResponseModel } from "@models/ky-nhan/response";

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
    return await http.get<IKyNhanSummaryResponseModel>(`/kynhan-summary/land/${landId}`, {
      cache: "no-store",
    });
  },
};

export default kyNhanSummaryService;
