import { useState, useEffect, useCallback } from "react";
import rewardService from "@services/reward";
import userService from "@services/user";
import {
  IReward,
  IExchangeRewardRequest,
  IUserRewardExchange,
  UserRewardExchangeListResponseSchema,
} from "@models/reward";
import { IMeResponse } from "@models/user/response";
import { toast } from "react-toastify";

export const useRewards = (isOpen: boolean) => {
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [userRewardExchanges, setUserRewardExchanges] = useState<
    IUserRewardExchange[]
  >([]);
  const [userData, setUserData] = useState<IMeResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExchanging, setIsExchanging] = useState<string | null>(null);
  const fetchUserData = useCallback(async () => {
    try {
      const response: any = await userService.getMe();
      if (response && response.statusCode === 200 && response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const fetchUserRewardExchanges = useCallback(async () => {
    try {
      const userRewardsResponse: any = await rewardService.getUserRewards({
        currentPage: 1,
        pageSize: 1000,
        sort: "sort:-id",
      });
      if (
        userRewardsResponse &&
        userRewardsResponse.statusCode === 200 &&
        userRewardsResponse.data
      ) {
        // Validate the response data using Zod schema to ensure proper parsing
        setRewards(
          userRewardsResponse.data.map(
            (item: IUserRewardExchange) => item.reward
          )
        );
        setUserRewardExchanges(userRewardsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching user reward exchanges:", error);
    }
  }, []);

  const handleExchange = useCallback(
    async (rewardId: number, onRedeem?: (tierId: string) => void) => {
      try {
        setIsExchanging(rewardId.toString());
        const exchangeRequest: IExchangeRewardRequest = { rewardId };

        const response: any = await rewardService.exchangeReward(
          exchangeRequest
        );

        if (response && response.statusCode === 200) {
          toast.success("Đổi quà thành công!");
          // Refresh user data to update points/coins
          await fetchUserData();
          // Refresh userRewardExchanges to update button status (without loading state)
          await fetchUserRewardExchanges();
          // Call the optional onRedeem callback
          onRedeem?.(rewardId.toString());
        } else {
          toast.error(response?.message || "Không thể đổi quà tặng");
        }
      } catch (error) {
        console.error("Error exchanging reward:", error);
        toast.error("Có lỗi xảy ra khi đổi quà tặng");
      } finally {
        setIsExchanging(null);
      }
    },
    [fetchUserData, fetchUserRewardExchanges]
  );

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUserRewardExchanges();
      fetchUserData();
    }
  }, [isOpen, fetchUserRewardExchanges, fetchUserData]);

  return {
    rewards,
    userRewardExchanges,
    userData,
    isLoading,
    isExchanging,
    handleExchange,
    fetchUserData,
    fetchUserRewardExchanges,
  };
};
