import { notFound } from "next/navigation";
import MapRegionDetail from "@pages/Map/Components/MapRegionDetail";
import { mockQuestions } from "@constants/mockdata/questions";

// Mapping từ slug đến region data
const regionSlugs = {
  "phu-tay-ho": {
    id: "phu-tay-ho",
    backgroundImage: "/Thánh Gióng 1.png",
  },
  "nui-tan-vien": {
    id: "nui-tan-vien",
    backgroundImage: "/Map Sơn Tinh 2.svg",
  },
  "ky-linh-viet-hoa": {
    id: "ky-linh-viet-hoa",
    backgroundImage: "/Chử Đồng Tử 1.png",
  },
  "dam-da-trach": {
    id: "dam-da-trach",
    backgroundImage: "/Map Chử Đồng Tử 1.svg", // Sử dụng ảnh Thánh Gióng cho Đầm Dạ Trạch
  },
  "lang-phu-dong": {
    id: "lang-phu-dong",
    backgroundImage: "/Map Thánh Gióng 1.svg", // Sử dụng ảnh Sơn Tinh cho Làng Phù Đổng
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MapRegionPage({ params }: PageProps) {
  const { slug } = await params;
  const region = regionSlugs[slug as keyof typeof regionSlugs];

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

  // Mock data until BE is ready
  const questions: ICOMPONENTS.Question[] = mockQuestions.map((question, idx) => {
    const id = idx + 1;
    return {
      id,
      title: question.title,
      content: question.content,
      category: question.category,
    };
  });

  // Optionally mark some as already answered
  const answeredQuestionIds: number[] = [];

  return (
    <MapRegionDetail
      backgroundImage={region.backgroundImage}
      scrollPositions={scrollPositions}
      questions={questions}
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
