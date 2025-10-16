import http from "@configs/fetch";
import { IGodProfileResponseModel } from "@models/god-profile/response";

const godProfileService = {
  // Fetch point home
  getPointHome: async () => {
    return await http.get<IGodProfileResponseModel>(`/god-profile/pointHome`, {
      cache: "no-store",
    });
  },

  chooseGodProfile: async (godProfileId: number) => {
    return await http.post<IGodProfileResponseModel>(
      `/god-profile/user-choice/${godProfileId}`,
      {
        next: { tags: ["godProfile"] },
      }
    );
  },
};

export default godProfileService;
