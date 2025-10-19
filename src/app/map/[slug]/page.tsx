import { notFound } from "next/navigation";
import MapRegionDetail from "@pages/Map/Components/MapRegionDetail";
import landService from "@services/land";
import { ILandWithUserQuestionResponseModel } from "@models/Land/response";

export const dynamic = 'force-dynamic';

// Mapping từ slug đến region data
const regionSlugs = {
  "nui-tan-vien": {
    slug: "nui-tan-vien",
    id: 1,
    backgroundImage:
      "https://res.cloudinary.com/dznt9yias/image/upload/v1760722789/Map_So%CC%9Bn_Tinh_2_pq7v2w.svg",
  },
  "phu-tay-ho": {
    slug: "phu-tay-ho",
    id: 2,
    backgroundImage:
      "https://res.cloudinary.com/dznt9yias/image/upload/v1760722781/Map_Tha%CC%81nh_Gio%CC%81ng_1_x9yqi3.svg",
  },
  "dam-da-trach": {
    slug: "dam-da-trach",
    id: 3,
    backgroundImage:
      "https://res.cloudinary.com/dznt9yias/image/upload/v1760722758/Map_Chu%CC%9B%CC%89_%C4%90o%CC%82%CC%80ng_Tu%CC%9B%CC%89_1_nypmqj.svg", // Sử dụng ảnh Thánh Gióng cho Đầm Dạ Trạch
  },
  "lang-phu-dong": {
    slug: "lang-phu-dong",
    id: 4,
    backgroundImage: "/Map Thánh Gióng 1.svg", // Sử dụng ảnh Sơn Tinh cho Làng Phù Đổng
  },

  "ky-linh-viet-hoa": {
    slug: "ky-linh-viet-hoa",
    id: 5,
    backgroundImage: "/Chử Đồng Tử 1.png",
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
async function getQuestionsWithUser(landId: number) {
  const questions = (await landService.getQuestionsWithUser(
    landId
  )) as ILandWithUserQuestionResponseModel;
  return questions;
}
export default async function MapRegionPage({ params }: PageProps) {
  const { slug } = await params;
  const region = regionSlugs[slug as keyof typeof regionSlugs];
  const questionsWithUser = await getQuestionsWithUser(region.id);
  console.log(questionsWithUser.data?.questions);

  if (!region) {
    notFound();
  }

  // Default scroll positions
  const defaultScrollPositions = [
    { top: "25%", left: "22%", rotate: "-12deg" },
    { top: "64%", left: "22%", rotate: "-8deg" },
    { top: "8%", left: "32%", rotate: "-14deg" },
    { top: "34%", left: "30%", rotate: "-10deg" },
    { top: "75%", left: "32%", rotate: "-12deg" },
    { top: "22%", left: "41%", rotate: "-9deg" },
    { top: "48%", left: "46%", rotate: "-13deg" },
    { top: "70%", left: "42%", rotate: "-11deg" },
    { top: "26%", left: "52%", rotate: "-8deg" },
    { top: "70%", left: "55%", rotate: "-12deg" },
    { top: "2%", left: "58%", rotate: "-12deg" },
    { top: "40%", left: "60%", rotate: "-10deg" },
    { top: "20%", left: "66%", rotate: "-9deg" },
    { top: "60%", left: "72%", rotate: "-11deg" },
  ];

  // Per-region custom scroll positions
  // Note: current defaults are for "nui-tan-vien". Others can be tuned visually later.
  const phuTayHoScrollPositions = [
    { top: "18%", left: "18%", rotate: "-8deg" },
    { top: "52%", left: "20%", rotate: "-6deg" },
    { top: "6%", left: "28%", rotate: "-10deg" },
    { top: "30%", left: "28%", rotate: "-7deg" },
    { top: "70%", left: "30%", rotate: "-8deg" },
    { top: "18%", left: "38%", rotate: "-6deg" },
    { top: "44%", left: "44%", rotate: "-9deg" },
    { top: "66%", left: "40%", rotate: "-7deg" },
    { top: "22%", left: "50%", rotate: "-6deg" },
    { top: "66%", left: "54%", rotate: "-8deg" },
    { top: "4%", left: "56%", rotate: "-9deg" },
    { top: "36%", left: "58%", rotate: "-7deg" },
    { top: "18%", left: "64%", rotate: "-6deg" },
    { top: "56%", left: "70%", rotate: "-8deg" },
  ];

  const kyLinhVietHoaScrollPositions = [
    { top: "22%", left: "24%", rotate: "-10deg" },
    { top: "60%", left: "24%", rotate: "-7deg" },
    { top: "10%", left: "34%", rotate: "-12deg" },
    { top: "36%", left: "32%", rotate: "-9deg" },
    { top: "76%", left: "34%", rotate: "-10deg" },
    { top: "24%", left: "43%", rotate: "-8deg" },
    { top: "50%", left: "48%", rotate: "-11deg" },
    { top: "72%", left: "44%", rotate: "-9deg" },
    { top: "28%", left: "54%", rotate: "-7deg" },
    { top: "72%", left: "57%", rotate: "-10deg" },
    { top: "6%", left: "60%", rotate: "-10deg" },
    { top: "42%", left: "62%", rotate: "-8deg" },
    { top: "22%", left: "68%", rotate: "-7deg" },
    { top: "62%", left: "74%", rotate: "-9deg" },
  ];

  const damDaTrachScrollPositions = [
    { top: "29%", left: "6%", rotate: "-9deg" },
    { top: "4%", left: "18%", rotate: "-7deg" },
    { top: "34%", left: "20%", rotate: "-11deg" },
    { top: "10%", left: "30%", rotate: "-8deg" },
    { top: "44%", left: "28%", rotate: "-9deg" },
    { top: "20%", left: "40%", rotate: "-7deg" },
    { top: "50%", left: "48%", rotate: "-10deg" },
    { top: "14%", left: "54%", rotate: "-8deg" },
    { top: "52%", left: "62%", rotate: "-7deg" },
    { top: "30%", left: "68%", rotate: "-9deg" },
    { top: "20%", left: "84%", rotate: "-9deg" },
    { top: "48%", left: "78%", rotate: "-8deg" },
  ];

  const langPhuDongScrollPositions = [
    { top: "24%", left: "26%", rotate: "-11deg" },
    { top: "62%", left: "26%", rotate: "-8deg" },
    { top: "7%", left: "36%", rotate: "-13deg" },
    { top: "32%", left: "34%", rotate: "-9deg" },
    { top: "72%", left: "36%", rotate: "-11deg" },
    { top: "24%", left: "45%", rotate: "-8deg" },
    { top: "50%", left: "50%", rotate: "-12deg" },
    { top: "68%", left: "46%", rotate: "-10deg" },
    { top: "28%", left: "56%", rotate: "-8deg" },
    { top: "68%", left: "59%", rotate: "-11deg" },
    { top: "3%", left: "62%", rotate: "-11deg" },
    { top: "38%", left: "64%", rotate: "-9deg" },
    { top: "18%", left: "70%", rotate: "-8deg" },
    { top: "58%", left: "76%", rotate: "-10deg" },
  ];

  // Per-region scroll positions (customize later as needed)
  const regionScrollPositions: Record<string, typeof defaultScrollPositions> = {
    "phu-tay-ho": phuTayHoScrollPositions,
    "nui-tan-vien": defaultScrollPositions,
    "ky-linh-viet-hoa": kyLinhVietHoaScrollPositions,
    "dam-da-trach": damDaTrachScrollPositions,
    "lang-phu-dong": langPhuDongScrollPositions,
  };

  const scrollPositions =
    regionScrollPositions[region.id] ?? defaultScrollPositions;

  // Xác định câu hỏi đã trả lời dựa trên userAnswerLogs với isCorrect: true
  const answeredQuestionIds =
    questionsWithUser.data?.questions
      ?.filter(
        (question: any) =>
          question.userAnswerLogs &&
          question.userAnswerLogs.length > 0 &&
          question.userAnswerLogs.some((log: any) => log.isCorrect === true)
      )
      .map((question: any) => question.id) ?? [];

  return (
    <MapRegionDetail
      backgroundImage={region.backgroundImage}
      scrollPositions={scrollPositions}
      questions={questionsWithUser.data?.questions ?? []}
      answeredQuestionIds={answeredQuestionIds}
    />
  );
}

// Generate static params for all regions
export async function generateStaticParams() {
  return Object.keys(regionSlugs).map((slug) => ({
    slug,
  }));
}
