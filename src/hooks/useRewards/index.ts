import { useState, useEffect, useCallback } from "react";
import rewardService from "@services/reward";
import userService from "@services/user";
import { IReward, IExchangeRewardRequest } from "@models/reward";
import { IMeResponse } from "@models/user/response";
import { toast } from "react-toastify";

export const useRewards = (isOpen: boolean) => {
  const [rewards, setRewards] = useState<IReward[]>([]);
  const [userData, setUserData] = useState<IMeResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExchanging, setIsExchanging] = useState<string | null>(null);

  const fetchRewards = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: any = await rewardService.getRewards({
        currentPage: 1,
        pageSize: 1000,
        sort: "sort:-id",
      });

      if (response && response.statusCode === 200 && response.data) {
        setRewards(response.data);
      } else {
        toast.error("Không thể tải danh sách quà tặng");
      }
    } catch (error) {
      console.error("Error fetching rewards:", error);
      toast.error("Có lỗi xảy ra khi tải danh sách quà tặng");
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  const handleExchange = useCallback(async (rewardId: number, onRedeem?: (tierId: string) => void) => {
    try {
      setIsExchanging(rewardId.toString());
      const exchangeRequest: IExchangeRewardRequest = { rewardId };

      const response: any = await rewardService.exchangeReward(exchangeRequest);

      if (response && response.statusCode === 200) {
        toast.success("Đổi quà thành công!");
        // Refresh user data to update points/coins
        await fetchUserData();
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
  }, [fetchUserData]);

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchRewards();
      fetchUserData();
    }
  }, [isOpen, fetchRewards, fetchUserData]);

  return {
    rewards,
    userData,
    isLoading,
    isExchanging,
    handleExchange,
    fetchRewards,
    fetchUserData,
  };
};
