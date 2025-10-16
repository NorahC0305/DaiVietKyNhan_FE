import http from "@configs/fetch";
import { IFigureResponseModel } from "@models/figure/repsonse";

const figureService = {
  // Fetch all figures with optimized caching
  getAllFigures: async () => {
    return await http.get<IFigureResponseModel>(`/figure`, {
      cache: "force-cache",
      next: { revalidate: 7200 }, // Cache for 2 hours
    });
  },
  chooseFigure: async (figureId: number) => {
    return await http.post<IFigureResponseModel>(`/figure/user/${figureId}`, {
      figureId,
    });
  },
};

export default figureService;
