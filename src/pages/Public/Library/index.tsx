"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useLandscapeMobile } from "@/hooks/useLandscapeMobile";
import kynhanService from "@/services/kynhan";
import type { IKyNhanUserListResponseModel } from "@/models/ky-nhan/response";
import type { IKyNhanUser } from "@/models/ky-nhan/entity";
import EmblaCarouselWithCards from "./Components/InfiniteCardCarousel";

interface CardData {
  id: number;
  unlocked: boolean;
  imageSrc?: string;
  backContent?: {
    backgroundSrc?: string;
    name?: string;
    thoiKy?: string;
    chienCong?: string;
    ctaText?: string;
    ctaHref?: string;
  };
}

const LibraryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDailyCheckinOpen, setIsDailyCheckinOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenSearchId, setHiddenSearchId] = useState<string | null>(null);
  const [scrollToIndex, setScrollToIndex] = useState<number | undefined>(
    undefined
  );
  const [highlightQuery, setHighlightQuery] = useState<string>("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isLandscapeMobile = useLandscapeMobile();

  // Handle CTA button click - navigate to library detail page
  const handleCtaClick = (cardId: number) => {
    router.push(`/library/${cardId}`);
  };

  // Convert API data to CardData format
  const convertToCardData = (kynhanData: IKyNhanUser): CardData => ({
    id: kynhanData.id,
    unlocked: kynhanData.unlocked,
    imageSrc: kynhanData.imgUrl || undefined,
    backContent: {
      backgroundSrc: "/revealedBG.svg",
      name: kynhanData.name,
      thoiKy: kynhanData.thoiKy,
      chienCong: kynhanData.chienCong,
      ctaText: "Xem Thêm",
      ctaHref: undefined, // Remove href since we're using onClick handler
    },
  });

  // Handle URL search parameter - store ID but don't show in input
  useEffect(() => {
    const searchParam = searchParams?.get("search");
    if (searchParam) {
      setHiddenSearchId(searchParam);
      // Clear URL parameter after reading it and prevent back navigation to map
      router.replace("/library", { scroll: false });

      // Add a new history entry to prevent back to map page
      window.history.pushState(null, "", "/library");
    }
  }, [searchParams, router]);

  // Prevent back navigation to map when coming from map
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If user tries to go back, push current state again
      window.history.pushState(null, "", "/library");
    };

    // Only add listener if we came from map with search parameter
    if (hiddenSearchId !== null) {
      // Push current state to history to establish new base
      window.history.pushState(null, "", "/library");
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hiddenSearchId]);

  // Fetch kynhan data from API
  useEffect(() => {
    const fetchKynhanList = async () => {
      try {
        setIsLoading(true);
        const response =
          (await kynhanService.getUserKyNhanList()) as IKyNhanUserListResponseModel;
        if (response.data) {
          const cardData = response.data.map(convertToCardData);
          setCards(cardData);
        }
      } catch (error) {
        console.error("Error fetching kynhan list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKynhanList();
  }, []);

  const normalizeText = (text?: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "")
      .replace(/\s+/g, " ")
      .trim();

  const triggerSearchScroll = useCallback(
    (searchValue?: string) => {
      const q = normalizeText(searchValue || searchQuery);
      if (!q) return;

      // Try numeric id match first
      const asNumber = Number(q);
      let index = -1;
      if (!Number.isNaN(asNumber)) {
        index = cards.findIndex((c) => c.id === asNumber);
      }

      if (index === -1) {
        index = cards.findIndex((c) => {
          const haystack = [
            normalizeText(c.backContent?.name),
            normalizeText(c.backContent?.thoiKy),
            normalizeText(c.backContent?.chienCong),
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
    },
    [searchQuery, cards]
  );

  // Auto trigger search when hiddenSearchId is set from URL and cards are loaded
  useEffect(() => {
    if (hiddenSearchId && cards.length > 0 && !isLoading) {
      triggerSearchScroll(hiddenSearchId);
      // Clear hiddenSearchId after using it
      setHiddenSearchId(null);
    }
  }, [hiddenSearchId, cards, isLoading, triggerSearchScroll]);

  // Wrapper function for search button clicks
  const handleSearchClick = () => {
    triggerSearchScroll();
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden pt-8 sm:pt-12 lg:pt-0">
      {/* Thanh tìm kiếm (mobile landscape only) */}
      {isLandscapeMobile && (
        <div className="lg:hidden absolute top-2 right-2 sm:top-4 sm:right-4 translate-x-0 z-10 w-[35%] sm:w-[30%]">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") triggerSearchScroll();
              }}
              type="text"
              placeholder="Tìm kiếm kỳ nhân"
              className="w-full h-8 sm:h-10 pl-3 sm:pl-4 pr-10 sm:pr-12 rounded-full bg-white/90 backdrop-blur text-black placeholder-gray-500 text-xs sm:text-sm shadow-[0_8px_24px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
            />
            <button
              aria-label="Tìm kiếm"
              onClick={handleSearchClick}
              className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4 text-gray-600"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 0 1 5.276 10.917l4.279 4.278a.75.75 0 1 1-1.06 1.06l-4.279-4.278A6.75 6.75 0 1 1 10.5 3.75Zm0 1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z"
                  clipRule="evenodd"
                />
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
            onClick={handleSearchClick}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 0 1 5.276 10.917l4.279 4.278a.75.75 0 1 1-1.06 1.06l-4.279-4.278A6.75 6.75 0 1 1 10.5 3.75Zm0 1.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen w-full flex items-center justify-center py-4 sm:py-6 md:py-10 lg:py-12 mt-12 sm:mt-16 lg:mt-0">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="text-white text-lg">Đang tải...</div>
          </div>
        ) : (
          <EmblaCarouselWithCards
            cards={cards}
            options={{ loop: true, align: "center" }}
            scrollToIndex={scrollToIndex}
            highlightQuery={highlightQuery}
            onCtaClick={handleCtaClick}
          />
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
