"use client";

import EmblaCarouselWithCards from "./Components/InfiniteCardCarousel";

interface CardData {
  id: number;
  isLocked: boolean;
  imageSrc?: string;
  backContent?: {
    backgroundSrc?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
  };
}
const MOCK_CARDS: CardData[] = [
  { id: 1, isLocked: true },
  {
    id: 2,
    isLocked: false,
    imageSrc: "/Thiết kế chưa có tên (6) 1 (1).png",
    backContent: {
      backgroundSrc: "/revealedBG.png",
      description:
        "Mẫu Thượng Thiên – vị thần cai quản bầu trời, mưa nắng sấm chớp.\nLà một trong bốn vị Mẫu tối cao của Tứ Phủ.",
      ctaText: "Xem Thêm",
      ctaHref: "#",
    },
  },
  { id: 3, isLocked: true },
  {
    id: 4,
    isLocked: false,
    imageSrc: "/Thiết kế chưa có tên (7) 1.png",
    backContent: {
      description:
        "Tản Viên Sơn Thánh – biểu tượng của núi rừng đất Việt, che chở bản làng.",
      ctaText: "Khám phá",
    },
  },
  {
    id: 5,
    isLocked: false,
    imageSrc: "/Thiết kế chưa có tên (7) 2.png",
    backContent: {
      description:
        "Anh hùng truyền thuyết với sức mạnh chế ngự thú dữ và sơn lâm.",
      ctaText: "Chi tiết",
    },
  },
  { id: 6, isLocked: true },
  { id: 7, isLocked: true },
  {
    id: 8,
    isLocked: false,
    imageSrc: "/Thiết kế chưa có tên (8) 1.png",
    backContent: {
      description:
        "Vị tướng cưỡi Hắc Mã, băng qua lửa đỏ – khí phách và chiến công lẫy lừng.",
    },
  },
  { id: 9, isLocked: true },
  { id: 10, isLocked: true },
  { id: 11, isLocked: true },
  { id: 12, isLocked: true },
];
const LibraryPage = () => {
  return (
    <div
      className="min-h-screen w-full
     flex items-center justify-center py-12"
    >
      <EmblaCarouselWithCards
        cards={MOCK_CARDS}
        options={{ loop: true, align: "center" }}
      />
    </div>
  );
};

export default LibraryPage;
