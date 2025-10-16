import http from "@configs/fetch";
import { IFigureResponseModel } from "@models/figure/repsonse";

const figureService = {
  // Fetch all figures
  getAllFigures: async () => {
    return await http.get<IFigureResponseModel>(`/figure`, {
      cache: "no-store",
    });
  },
  chooseFigure: async (figureId: number) => {
    return await http.post<IFigureResponseModel>(`/figure/user/${figureId}`, {
      figureId,
    });
  },
};

export default figureService;
