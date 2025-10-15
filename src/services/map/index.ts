import http from "@configs/fetch";

export interface MapQuestionsResponse {
  questions: ICOMPONENTS.Question[];
  answeredQuestionIds: number[];
}

const mapService = {
  // Fetch all questions and user's answered status for a specific map/region
  getQuestionsBySlug: async (slug: string) => {
    return await http.get<MapQuestionsResponse>(`/maps/${slug}/questions`, {
      cache: "no-store",
    });
  },
};

export default mapService;

