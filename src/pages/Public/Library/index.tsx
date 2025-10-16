"use client";

import { useState } from "react";
import EmblaCarouselWithCards from "./Components/InfiniteCardCarousel";
import DailyCheckin from "@/components/Molecules/DailyCheckin";
import { useLandscapeMobile } from "@/hooks/useLandscapeMobile";

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
      backgroundSrc: "/revealedBG.svg",
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
  const [isDailyCheckinOpen, setIsDailyCheckinOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollToIndex, setScrollToIndex] = useState<number | undefined>(
    undefined
  );
  const [highlightQuery, setHighlightQuery] = useState<string>("");
  const isLandscapeMobile = useLandscapeMobile();

  const normalizeText = (text?: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "")
      .replace(/\s+/g, " ")
      .trim();

  const triggerSearchScroll = () => {
    const q = normalizeText(searchQuery);
    if (!q) return;

    // Try numeric id match first
    const asNumber = Number(q);
    let index = -1;
    if (!Number.isNaN(asNumber)) {
      index = MOCK_CARDS.findIndex((c) => c.id === asNumber);
    }

    if (index === -1) {
      index = MOCK_CARDS.findIndex((c) => {
        const haystack = [
          normalizeText(c.backContent?.description),
          normalizeText(c.backContent?.ctaText),
          normalizeText(c.imageSrc),
        ]
          .filter(Boolean)
          .join(" ");
        return haystack.includes(q);
      });
    }

    if (index >= 0) {
      setScrollToIndex(index);
      setHighlightQuery(q);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden pt-12 sm:pt-0">
      {/* Thanh tìm kiếm (mobile landscape only) */}
      {isLandscapeMobile && (
        <div className="lg:hidden absolute top-4 right-4 translate-x-0 z-10 w-[30%]">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") triggerSearchScroll();
              }}
              type="text"
              placeholder="Tìm kiếm kỳ nhân"
              className="w-full h-10 pl-4 pr-12 rounded-full bg-white/90 backdrop-blur text-black placeholder-gray-500 shadow-[0_8px_24px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
            />
            <button
              aria-label="Tìm kiếm"
              onClick={triggerSearchScroll}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600"
              type="button"
            >
              {/* Icon tìm kiếm */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 0 1 5.276 10.917l4.279 4.278a.75.75 0 1 1-1.06 1.06l-4.279-4.278A6.75 6.75 0 1 1 10.5 3.75Zm0 1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Thanh tìm kiếm (desktop giữ nguyên) */}
      <div className="hidden lg:block absolute top-6 right-auto left-1/2 -translate-x-1/2 z-10 w-[45%] md:w-[32%] lg:w-[24%]">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") triggerSearchScroll();
            }}
            type="text"
            placeholder="Tìm kiếm kỳ nhân"
            className="w-full h-11 md:h-12 pl-4 pr-12 rounded-full bg-white/90 backdrop-blur text-black placeholder-gray-500 shadow-[0_8px_24px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
          />
          <button
            aria-label="Tìm kiếm"
            onClick={triggerSearchScroll}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600"
            type="button"
          >
            {/* Icon tìm kiếm */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 0 1 5.276 10.917l4.279 4.278a.75.75 0 1 1-1.06 1.06l-4.279-4.278A6.75 6.75 0 1 1 10.5 3.75Zm0 1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen w-full flex items-center justify-center py-6 sm:py-10 md:py-12 mt-16 sm:mt-0">
        <EmblaCarouselWithCards
          cards={MOCK_CARDS}
          options={{ loop: true, align: "center" }}
          scrollToIndex={scrollToIndex}
          highlightQuery={highlightQuery}
        />
      </div>

      {/* Daily Checkin Modal */}
      <DailyCheckin
        isModal={true}
        isOpen={isDailyCheckinOpen}
        onClose={() => setIsDailyCheckinOpen(false)}
      />
    </div>
  );
};

export default LibraryPage;
