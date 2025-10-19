import { useState, useEffect, useCallback } from "react";
import userAchievementService from "@services/user-achievement";
import { IUserAchievement } from "@models/user-achievement";

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

    return {
      id: userAchievement.id.toString(),
      title: userAchievement.achievement.name,
      description: userAchievement.achievement.description,
      canClaim: status === "COMPLETED", // Only COMPLETED status can be claimed
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
      const response = await userAchievementService.getUserAchievements({
        qs: "sort:-id",
        currentPage: 1,
        pageSize: 1000,
      });

      if (response.statusCode === 200 && response.data) {
        const mappedAchievements = mapApiResponseToAchievements(response.data);
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
