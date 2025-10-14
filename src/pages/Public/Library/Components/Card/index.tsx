import { cn } from "@utils/CN";
import Image from "next/image";

export default function Card({
  isLocked,
  isCenter,
  cardNumber,
  imageSrc,
  backContent,
  isFlipped,
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
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "relative p-1 shadow-2xl",
          isCenter && !isLocked && "group"
        )}
      >
        <div className="relative aspect-[3/5] w-36 sm:w-44 md:w-56 lg:w-64 [perspective:1200px]">
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
                    src="/HiddenCard.svg"
                    alt="Hidden framed card"
                    fill
                    sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                    className="object-contain"
                    priority={isCenter}
                  />
                  <div className="absolute inset-0">
                    <Image
                      src="/LockWhiteBG.png"
                      alt="Locked"
                      fill
                      sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                      className={cn(
                        "object-contain w-full h-full transition-all duration-300",
                        isCenter ? "scale-90" : "scale-85"
                      )}
                    />
                  </div>
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
                  src={backContent?.backgroundSrc || "/revealedBG.png"}
                  alt="Revealed background"
                  fill
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 18vw"
                  className="object-contain"
                  priority={isCenter}
                />
                <div className="absolute inset-0 px-4 sm:px-5 py-6 flex flex-col justify-between">
                  {backContent?.description && (
                    <div className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-black/90 whitespace-pre-line">
                      {backContent.description}
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
