import { cn } from "@utils/CN";
import Image from "next/image";

export default function Card({
  isLocked,
  isCenter,
  cardNumber,
  imageSrc,
  backContent,
  isFlipped,
  highlightQuery,
}: {
  isLocked: boolean;
  isCenter: boolean;
  cardNumber: number;
  imageSrc?: string;
  backContent?: {
    backgroundSrc?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
  };
  isFlipped?: boolean;
  highlightQuery?: string;
}) {
  const renderHighlighted = (text?: string) => {
    const q = (highlightQuery || "").trim();
    if (!text || !q) return text;

    // Accent-insensitive search: build index on normalized text, map back to original
    const normalizedText = text
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "");
    const normalizedQuery = q
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "");

    const lower = normalizedText.toLowerCase();
    const start = lower.indexOf(normalizedQuery);
    if (start === -1) return text;

    // Map normalized indices back to original string indices
    const mapOriginalIndices = (s: string) => {
      const map: number[] = [];
      let origIndex = 0;
      for (const ch of s) {
        map.push(origIndex);
        origIndex += ch.length;
      }
      return map;
    };

    // Build arrays of code points for original and normalized to align
    const originalCodePoints = Array.from(text);
    const normalizedCodePoints = Array.from(
      text.normalize("NFD").replace(/\p{Diacritic}+/gu, "")
    );

    // Create mapping from normalized code point index to original code point index
    const normToOrig: number[] = [];
    let iOrig = 0;
    let iNorm = 0;
    while (iOrig < originalCodePoints.length && iNorm < normalizedCodePoints.length) {
      const origChar = originalCodePoints[iOrig];
      const folded = origChar
        .normalize("NFD")
        .replace(/\p{Diacritic}+/gu, "");
      // folded may have length 0 (for pure combining), 1 or more; advance norm by its length
      const len = Array.from(folded).length || 0;
      for (let k = 0; k < len; k += 1) {
        normToOrig[iNorm + k] = iOrig;
      }
      iNorm += len;
      iOrig += 1;
    }

    const startOrig = normToOrig[start] ?? 0;
    const endOrig = normToOrig[start + normalizedQuery.length - 1] ??
      originalCodePoints.length - 1;

    const before = originalCodePoints.slice(0, startOrig).join("");
    const match = originalCodePoints
      .slice(startOrig, endOrig + 1)
      .join("");
    const after = originalCodePoints.slice(endOrig + 1).join("");

    return (
      <>
        {before}
        <mark className="bg-yellow-300/70 px-0.5 rounded-sm">{match}</mark>
        {after}
      </>
    );
  };
  return (
    <div className="relative">
      <div
        className={cn(
          "relative p-1 shadow-2xl",
          isCenter && !isLocked && "group"
        )}
      >
        <div className="relative aspect-[3/5] w-52 sm:w-64 md:w-80 lg:w-96 [perspective:1200px]">
          <div
            className={cn(
              "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
              isCenter && !isLocked && "group-hover:[transform:rotateY(180deg)]",
              isFlipped && !isLocked && "[transform:rotateY(180deg)]"
            )}
          >
            {/* Front side */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              {isLocked ? (
                <>
                  <Image
                    src="/Group 104.svg"
                    alt="Hidden framed card"
                    fill
                    sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                    className="object-contain"
                    priority={isCenter}
                  />
                  {/* <div className="absolute inset-0">
                    <Image
                      src="/Group 104.svg"
                      alt="Locked"
                      fill
                      sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                      className={cn(
                        "object-contain w-full h-full transition-all duration-300",
                        isCenter ? "scale-90" : "scale-85"
                      )}
                    />
                  </div> */}
                </>
              ) : (
                <Image
                  src={imageSrc || "/HiddenCard.svg"}
                  alt={`Unlocked card #${cardNumber}`}
                  fill
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                  className="object-contain"
                  priority={isCenter}
                />
              )}
            </div>

            {/* Back side (shown on flip for unlocked center card) */}
            {!isLocked && (
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <Image
                  src={backContent?.backgroundSrc || "/revealedBG.svg"}
                  alt="Revealed background"
                  fill
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                  className="object-contain"
                  priority={isCenter}
                />
                <div className="absolute inset-3 sm:inset-4 md:inset-6 lg:inset-8 border border-[#be9b36]/60 rounded-md px-4 sm:px-5 py-6 flex flex-col justify-between">
                  {backContent?.description && (
                    <div className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-black/90 whitespace-pre-line break-words">
                      {renderHighlighted(backContent.description)}
                    </div>
                  )}
                  {(backContent?.ctaText || backContent?.ctaHref) && (
                    <div className="w-full flex justify-center">
                      {backContent?.ctaHref ? (
                        <a
                          href={backContent.ctaHref}
                          className="mt-3 rounded-md bg-[#be9b36] text-black px-4 py-2 text-xs sm:text-sm shadow-md"
                        >
                          {backContent?.ctaText || "Xem Thêm"}
                        </a>
                      ) : (
                        <button className="mt-3 rounded-md bg-[#be9b36] text-black px-4 py-2 text-xs sm:text-sm shadow-md">
                          {backContent?.ctaText || "Xem Thêm"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isCenter && (
        <div className="absolute inset-0 rounded-lg blur-xl -z-10" />
      )}
    </div>
  );
}
