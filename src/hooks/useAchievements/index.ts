import { useState, useEffect, useCallback } from "react";
import userAchievementService from "@services/user-achievement";
import { IUserAchievement, IMyAchievementsResponse } from "@models/user-achievement";

export type Achievement = {
  id: string;
  title: string;
  description?: string;
  canClaim: boolean;
  status: "PENDING" | "COMPLETED" | "CLAIMED";
  // Back-compat fields (old API)
  rewardLabel?: string;
  // Preferred BE/FE schema
  reward?: { unit: "COIN"; amount: number } | { unit: "TEXT"; label: string };
};

// Function to map API response to component format
function mapApiResponseToAchievements(apiData: IUserAchievement[]): Achievement[] {
  return apiData.map((userAchievement) => {
    // Determine the status based on the conditions
    let status: "PENDING" | "COMPLETED" | "CLAIMED";
    if (userAchievement.rewardClaimed) {
      status = "CLAIMED";
    } else if (userAchievement.status === "COMPLETED") {
      status = "COMPLETED";
    } else {
      status = "PENDING";
    }

    // According to requirement: PENDING status means can claim
    // Only can claim if not already claimed and status is PENDING
    const canClaim = userAchievement.status === "PENDING" && !userAchievement.rewardClaimed;

    return {
      id: userAchievement.id.toString(),
      title: userAchievement.achievement.name,
      description: userAchievement.achievement.description,
      canClaim: canClaim,
      status: status,
      rewardLabel: `${userAchievement.achievement.reward} xu`,
      reward: {
        unit: "COIN" as const,
        amount: userAchievement.achievement.reward,
      },
    };
  });
}

export const useAchievements = (isOpen: boolean) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAchievementService.getMyAchievements();

      if (response.statusCode === 200 && response.data && Array.isArray(response.data)) {
        const mappedAchievements = mapApiResponseToAchievements(response.data as IUserAchievement[]);
        setAchievements(mappedAchievements);
      } else {
        setError(response.message || "Failed to fetch achievements");
      }
    } catch (err) {
      setError("An error occurred while fetching achievements");
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch achievements data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchAchievements();
    }
  }, [isOpen, fetchAchievements]);

  return {
    achievements,
    loading,
    error,
    fetchAchievements,
  };
};
