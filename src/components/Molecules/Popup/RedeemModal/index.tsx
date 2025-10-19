"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { IReward } from "@models/reward";
import { IMeResponse } from "@models/user/response";
import { useRewards } from "@hooks/useRewards";

type LeftDisplay = { type: "points" | "coins"; amount: number };
type RightDisplay =
  | { type: "coins"; amount: number }
  | { type: "text"; label: string };

type RedeemTierDisplay = {
  left: LeftDisplay;
  right: RightDisplay;
};

type RedeemTier = {
  id: string;
  canRedeem: boolean;
  // Back-compat fields (old API)
  points?: number;
  rewardLabel?: string;
  // New flexible display config (preferred)
  display?: RedeemTierDisplay;
  // Preferred BE/FE schema
  cost?: { unit: "POINT" | "COIN"; amount: number };
  reward?: { unit: "COIN"; amount: number } | { unit: "TEXT"; label: string };
};

type RedeemTierWithData = {
  tier: RedeemTier;
  display: RedeemTierDisplay;
  rewardData?: IReward;
};

export type RedeemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRedeem?: (tierId: string) => void;
  tiers?: RedeemTier[];
};

export default function RedeemModal({
  isOpen,
  onClose,
  onRedeem,
  tiers,
}: RedeemModalProps) {
  const { rewards, userData, isLoading, isExchanging, handleExchange } = useRewards(isOpen);

  // Convert API reward data to component format
  const convertRewardToTier = (
    reward: IReward,
    user: IMeResponse["data"] | null
  ): RedeemTier => {
    const left: LeftDisplay = {
      type: reward.type === "COIN" ? "coins" : "points",
      amount: reward.requireValue,
    };

    const right: RightDisplay = {
      type: "text",
      label: reward.gift,
    };

    // Check if user can afford this reward
    const canAfford = user
      ? reward.type === "COIN"
        ? user.coin >= reward.requireValue
        : user.point >= reward.requireValue
      : false;

    // Check if reward is active and within date range
    const now = new Date();
    const startDate = new Date(reward.startDate);
    const endDate = reward.endDate ? new Date(reward.endDate) : null;
    const isWithinDateRange = now >= startDate && (!endDate || now <= endDate);

    return {
      id: reward.id.toString(),
      canRedeem: reward.isActive && canAfford && isWithinDateRange,
      display: { left, right },
    };
  };

  const normalizeDisplay = (tier: RedeemTier): RedeemTierDisplay => {
    if (tier.display) return tier.display;

    if (tier.cost && tier.reward) {
      const left: LeftDisplay =
        tier.cost.unit === "COIN"
          ? { type: "coins", amount: tier.cost.amount }
          : { type: "points", amount: tier.cost.amount };

      const right: RightDisplay =
        tier.reward.unit === "COIN"
          ? { type: "coins", amount: tier.reward.amount }
          : { type: "text", label: tier.reward.label };

      return { left, right };
    }

    const left: LeftDisplay = {
      type: "points",
      amount: typeof tier.points === "number" ? tier.points : 0,
    };

    const raw = tier.rewardLabel ?? "";
    const normalized = raw.trim().toLowerCase();
    const xuIndex = normalized.indexOf("xu");
    if (xuIndex !== -1) {
      // Extract number before "xu"
      const numberText = normalized.slice(0, xuIndex).replace(/[^0-9]/g, "");
      const amount = Number(numberText);
      if (!Number.isNaN(amount) && amount > 0) {
        return { left, right: { type: "coins", amount } };
      }
    }

    return { left, right: { type: "text", label: raw } };
  };

  const displayTiers = useMemo((): RedeemTierWithData[] => {
    // Use API data if available, otherwise fallback to provided tiers or default data
    if (rewards.length > 0 && userData) {
      return rewards.map((reward) => {
        const tier = convertRewardToTier(reward, userData);
        return {
          tier,
          display: tier.display || normalizeDisplay(tier),
          rewardData: reward,
        };
      });
    }

    // Fallback to provided tiers or default data
    const fallbackTiers = tiers ?? [
      { id: "t1", points: 300, rewardLabel: "150 xu", canRedeem: false },
      { id: "t2", points: 500, rewardLabel: "250 xu", canRedeem: false },
      {
        id: "t3",
        points: 6000,
        rewardLabel: "Combo quà tặng đặc biệt",
        canRedeem: false,
      },
    ];

    return fallbackTiers.map((t) => ({
      tier: t,
      display: normalizeDisplay(t),
    }));
  }, [rewards, userData, tiers]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl sm:max-w-5xl mx-2 sm:mx-4"
          >
            <div className="relative w-full overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/frame1.png"
                  alt="Khung giấy"
                  fill
                  priority
                  sizes="(max-width: 768px) 95vw, (max-width: 1280px) 100vw, 1280px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div
                className="absolute flex flex-col items-center justify-between py-2 sm:py-6"
                style={{ top: "14%", right: "10%", bottom: "14%", left: "10%" }}
              >
                <div className="w-full max-w-3xl mx-auto text-center space-y-2 sm:space-y-4 px-2 sm:px-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#835D26] font-bd-street-sign leading-tight">
                    ĐỔI QUÀ
                  </h2>
                  <button
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 cursor-pointer p-1 sm:p-2"
                    onClick={onClose}
                    aria-label="Đóng"
                  >
                    <span className="block relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                      <Image
                        src="https://res.cloudinary.com/dznt9yias/image/upload/v1760721841/X_lqpgdp.svg"
                        alt="Đóng"
                        fill
                        sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                  </button>
                </div>

                <div className="w-full flex flex-col items-stretch gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-4 lg:mt-6 px-2 sm:px-4 lg:px-6 max-w-2xl lg:max-w-3xl overflow-y-auto custom-scrollbar flex-1">
                  {isLoading ? (
                    <div className="flex flex-col justify-center items-center py-8 gap-3">
                      <Loader2 className="h-8 w-8 text-amber-700 animate-spin" />
                      <span className="text-lg text-amber-700">
                        Đang tải danh sách quà tặng...
                      </span>
                    </div>
                  ) : (
                    displayTiers.map(({ tier, display, rewardData }) => (
                      <div
                        key={tier.id}
                        className="rounded-xl bg-[#F7E6BB] shadow-sm flex items-center justify-between px-3 py-2 sm:px-4 sm:py- lg:px-6"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                          <span className="text-lg sm:text-xl lg:text-2xl text-amber-700">
                            •
                          </span>
                          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 text-black">
                            {display.left.type === "points" ? (
                              <span className="text-sm sm:text-base lg:text-xl font-semibold">
                                {display.left.amount} ĐIỂM
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-sm sm:text-base lg:text-xl font-semibold">
                                  {display.left.amount}
                                </span>
                                <Image
                                  src="/DVKN coin.svg"
                                  alt="coin"
                                  width={28}
                                  height={20}
                                  className="hidden sm:block w-5 h-4 sm:w-7 sm:h-5 lg:w-8 lg:h-6"
                                />
                              </div>
                            )}
                            <span className="text-black">=</span>
                            {display.right.type === "coins" ? (
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-sm sm:text-base lg:text-xl font-semibold">
                                  {display.right.amount}
                                </span>
                                <Image
                                  src="/DVKN coin.svg"
                                  alt="coin"
                                  width={28}
                                  height={20}
                                  className="hidden sm:block w-5 h-4 sm:w-7 sm:h-5 lg:w-8 lg:h-6"
                                />
                              </div>
                            ) : (
                              <span className="text-sm sm:text-base lg:text-xl font-semibold">
                                {display.right.label}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (tier.canRedeem && rewardData) {
                              handleExchange(rewardData.id, onRedeem);
                            } else if (tier.canRedeem) {
                              onRedeem?.(tier.id);
                            }
                          }}
                          disabled={!tier.canRedeem || isExchanging === tier.id}
                          className="relative cursor-pointer px-4 sm:px-5 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-sm sm:text-base lg:text-lg transition-colors disabled:cursor-not-allowed text-white hover:opacity-90 min-w-[60px] min-h-[40px] sm:min-w-[80px] sm:min-h-[50px] lg:min-w-[100px] lg:min-h-[60px] overflow-hidden"
                        >
                          <Image
                            src={
                              tier.canRedeem
                                ? "/Property 1=Đủ để đổi.svg"
                                : "/Property 1=Chưa đủ để đổi.svg"
                            }
                            alt="Button background"
                            fill
                            className="absolute inset-0 object-cover transition-all duration-300"
                            sizes="(max-width: 640px) 60px, (max-width: 1024px) 80px, 100px"
                          />
                          {/* <span className="relative z-10 text-black">{tier.canRedeem ? "Đổi" : "Không thể đổi"}</span> */}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
