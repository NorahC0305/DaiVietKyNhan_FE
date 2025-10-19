"use client";

import React, { useCallback, useEffect, useRef } from "react";
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Card from "../Card";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

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

type PropType = {
  cards: CardData[];
  options?: EmblaOptionsType;
  scrollToIndex?: number;
  highlightQuery?: string;
};

const PrevButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => (
  <button
    className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer disabled:text-white/40 disabled:cursor-not-allowed hover:border-white/50 hover:bg-white/20 transition-all duration-200 text-white"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    <svg className="w-1/3 h-1/3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  </button>
);

const NextButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => (
  <button
    className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer disabled:text-white/40 disabled:cursor-not-allowed hover:border-white/50 hover:bg-white/20 transition-all duration-200 text-white"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    <svg className="w-1/3 h-1/3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
    </svg>
  </button>
);

const DotButton: React.FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className }) => (
  <button
    className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${className}`}
    type="button"
    onClick={onClick}
  >
    <div
      className={`w-3 h-3 rounded-full transition-all duration-200 ${
        className?.includes("embla__dot--selected")
          ? "bg-white scale-125"
          : "bg-white/40 hover:bg-white/60"
      }`}
    />
  </button>
);

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const EmblaCarouselWithCards: React.FC<PropType> = (props) => {
  const { cards, options, scrollToIndex, highlightQuery } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [flippedIndex, setFlippedIndex] = React.useState<number | null>(null);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes()?.map((slideNode) => {
      return slideNode.querySelector(".card-container") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList()?.length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0.7, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale)
      .on("select", () => {
        // Reset flip when changing selected slide
        setFlippedIndex(null);
      });
  }, [emblaApi, tweenScale]);

  // Programmatic scroll when search requests a specific index
  useEffect(() => {
    if (!emblaApi) return;
    if (typeof scrollToIndex === "number" && !Number.isNaN(scrollToIndex)) {
      const boundedIndex = numberWithinRange(
        scrollToIndex,
        0,
        cards?.length - 1
      );
      emblaApi.scrollTo(boundedIndex);
    }
  }, [emblaApi, scrollToIndex, cards?.length]);

  return (
    <div className="w-full max-w-none px-2 sm:px-4 md:px-6 lg:px-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-1 sm:-ml-2 md:-ml-3 lg:-ml-4">
          {cards?.map((card, index) => (
            <div
              className="transform-gpu flex-none w-[200px] sm:w-[240px] md:w-[300px] lg:w-[380px] xl:w-[460px] min-w-0 pl-2 sm:pl-4 md:pl-6 lg:pl-8 cursor-pointer"
              key={card.id}
              onClick={() => {
                if (!emblaApi) return;
                const isCenter = index === selectedIndex;
                if (isCenter && card.unlocked) {
                  setFlippedIndex((prev) => (prev === index ? null : index));
                } else {
                  emblaApi.scrollTo(index);
                }
              }}
            >
              <div className="card-container transition-transform duration-200 ease-out">
                <Card
                  {...card}
                  isCenter={index === selectedIndex}
                  cardNumber={index}
                  isFlipped={flippedIndex === index}
                  highlightQuery={highlightQuery}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselWithCards;
