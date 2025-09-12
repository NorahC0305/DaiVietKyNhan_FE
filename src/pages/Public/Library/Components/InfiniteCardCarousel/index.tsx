import { cn } from "@utils/CN";
import { useEffect, useMemo, useRef, useState } from "react";
import Card from "../Card";
import http from "@configs/fetch";

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

type CarouselProps = {
  fetchUrl?: string; // optional remote source for cards
  initialCards?: CardData[]; // allow server-provided data
};

export default function InfiniteCardCarousel({ fetchUrl, initialCards }: CarouselProps) {
  const [cards] = useState<CardData[]>(() => {
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

    return (initialCards && initialCards.length ? initialCards : MOCK_CARDS);
  });

  const [remoteCards, setRemoteCards] = useState<CardData[] | null>(null);

  useEffect(() => {
    if (!fetchUrl) return;
    let mounted = true;
    (async () => {
      try {
        const res = await http.get<{ data: CardData[] }>(fetchUrl);
        if (!mounted) return;
        if (Array.isArray(res?.data)) {
          setRemoteCards(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch cards", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchUrl]);

  const effectiveCards = useMemo(() => remoteCards ?? cards, [remoteCards, cards]);

  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [centerCardIndex, setCenterCardIndex] = useState(2); // Always middle of 5
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [accumulatedDrag, setAccumulatedDrag] = useState(0);
  const [dragVelocity, setDragVelocity] = useState(0);
  const [lastDragTime, setLastDragTime] = useState(0);
  const [lastDragX, setLastDragX] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getVisibleCards = () => {
    const visibleCards: Array<CardData & { originalIndex: number }> = [];
    for (let i = 0; i < 5; i++) {
      const cardIndex = (currentStartIndex + i) % effectiveCards.length;
      visibleCards.push({ ...effectiveCards[cardIndex], originalIndex: cardIndex });
    }
    return visibleCards;
  };

  const scrollNext = () => {
    if (isSliding || isDragging) return;
    setIsSliding(true);
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentStartIndex((prev) => (prev + 1) % effectiveCards.length);
      setIsSliding(false);
    }, 150);
  };

  const scrollPrev = () => {
    if (isSliding || isDragging) return;
    setIsSliding(true);
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentStartIndex((prev) => (prev - 1 + effectiveCards.length) % effectiveCards.length);
      setIsSliding(false);
    }, 150);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSliding) return;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
    setAccumulatedDrag(0);
    setDragVelocity(0);
    setLastDragTime(Date.now());
    setLastDragX(clientX);
    e.preventDefault();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const offset = clientX - dragStartX;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastDragTime;
    if (timeDelta > 0) {
      const velocity = (clientX - lastDragX) / timeDelta;
      setDragVelocity(velocity);
    }
    setDragOffset(offset);
    const cardWidth = 200;
    const threshold = cardWidth * 0.6;
    const newAccumulated = accumulatedDrag + (clientX - lastDragX);
    if (Math.abs(newAccumulated) >= threshold) {
      if (newAccumulated > 0) {
        setCurrentStartIndex(
          (prev) => (prev - 1 + effectiveCards.length) % effectiveCards.length
        );
        setAccumulatedDrag(0);
        setDragStartX(clientX);
      } else {
        setCurrentStartIndex((prev) => (prev + 1) % effectiveCards.length);
        setAccumulatedDrag(0);
        setDragStartX(clientX);
      }
    } else {
      setAccumulatedDrag(newAccumulated);
    }
    setLastDragTime(currentTime);
    setLastDragX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset(0);
    setAccumulatedDrag(0);
    const velocityThreshold = 0.5;
    if (Math.abs(dragVelocity) > velocityThreshold) {
      setTimeout(() => {
        if (dragVelocity < 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
      }, 50);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDragMove(e as any);
    };
    const handleGlobalMouseUp = () => {
      if (isDragging) handleDragEnd();
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleDragMove(e as any);
      }
    };
    const handleGlobalTouchEnd = () => {
      if (isDragging) handleDragEnd();
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleGlobalTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove as any);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, dragStartX, lastDragTime, lastDragX]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDragging) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDragging]);

  const visibleCards = getVisibleCards();
  const centerCard = visibleCards[centerCardIndex];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex items-center justify-center gap-6 py-8 px-4 transition-transform duration-300 ease-out",
            isDragging ? "cursor-grabbing" : "cursor-grab",
            isSliding && slideDirection === "left" && "-translate-x-4",
            isSliding && slideDirection === "right" && "translate-x-4"
          )}
          style={{
            transform: isDragging
              ? `translateX(${dragOffset * 0.2}px)`
              : undefined,
            transition: isDragging ? "none" : undefined,
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {visibleCards.map((card, index) => {
            const isCenterCard = index === centerCardIndex;
            const distanceFromCenter = Math.abs(index - centerCardIndex);

            return (
              <div
                key={`${card.originalIndex}-${currentStartIndex}`}
                className={cn(
                  "relative transition-all duration-500 ease-out cursor-pointer select-none",
                  "hover:scale-105 transform-gpu",
                  isDragging && "hover:scale-100",
                  isSliding &&
                    slideDirection === "left" &&
                    "animate-slide-left",
                  isSliding &&
                    slideDirection === "right" &&
                    "animate-slide-right",
                  isCenterCard
                    ? "scale-110 z-10"
                    : distanceFromCenter === 1
                    ? "scale-95 opacity-90"
                    : "scale-85 opacity-70"
                )}
                onClick={() => {
                  if (isSliding || isDragging) return;
                  const stepsToCenter = index - centerCardIndex;
                  if (stepsToCenter > 0) {
                    for (let i = 0; i < stepsToCenter; i++) {
                      setTimeout(() => scrollNext(), i * 200);
                    }
                  } else if (stepsToCenter < 0) {
                    for (let i = 0; i < Math.abs(stepsToCenter); i++) {
                      setTimeout(() => scrollPrev(), i * 200);
                    }
                  }
                }}
              >
                <Card
                  isLocked={card.isLocked}
                  isCenter={isCenterCard}
                  cardNumber={card.id}
                  imageSrc={card.imageSrc}
                  backContent={card.backContent}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
