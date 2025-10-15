import { notFound } from "next/navigation";
import MapRegionDetail from "@pages/Map/Components/MapRegionDetail";

// Mapping từ slug đến region data
const regionSlugs = {
  "phu-tay-ho": {
    id: "phu-tay-ho",
    name: "Phủ Tây Hồ",
    imageSrc: "/Phủ Tây Hồ 1.svg",
    description: "Phủ Tây Hồ là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  "nui-tan-vien": {
    id: "nui-tan-vien", 
    name: "Núi Tản Viên",
    imageSrc: "/Núi Tản Viên 1.svg",
    description: "Núi Tản Viên là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  "ky-linh-viet-hoa": {
    id: "ky-linh-viet-hoa",
    name: "Kỳ Linh Việt Hỏa", 
    imageSrc: "/Kỳ Linh Việt Hỏa 1.svg",
    description: "Kỳ Linh Việt Hỏa là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  "dam-da-trach": {
    id: "dam-da-trach",
    name: "Đầm Dạ Trạch",
    imageSrc: "/Đầm Dạ Trạch 1.svg", 
    description: "Đầm Dạ Trạch là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
  },
  "lang-phu-dong": {
    id: "lang-phu-dong",
    name: "Làng Phù Đổng",
    imageSrc: "/Làng Phù Đổng 1.svg",
    description: "Làng Phù Đổng là nơi linh thiêng, nơi thờ Tứ Pháp - bốn vị thần phù hộ cho vùng đất này. Đây là vùng đất đầu tiên trong hành trình khám phá Kỳ Giới.",
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

  return <MapRegionDetail region={region} />;
}

// Generate static params for all regions
export async function generateStaticParams() {
  return Object.keys(regionSlugs).map((slug) => ({
    slug,
  }));
}
