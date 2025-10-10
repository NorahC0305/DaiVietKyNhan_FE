import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { isValid } from "date-fns";
import systemService from "@services/system";
import {
  IGetReleaseDateResponse,
  ISetReleaseDateResponse,
  IUpdateReleaseDateResponse,
  IDeleteReleaseDateResponse,
} from "@models/system/response";
import {
  getCurrentVietnamTime,
  convertUtcToVietnamTime,
  convertVietnamTimeToUtc,
  isValidFutureDate,
} from "@utils/ReleaseDateUtils";

export const useReleaseDateManager = () => {
  const [releaseDate, setReleaseDate] = useState<ICOMPONENTS.ReleaseDateData>({
    id: undefined,
    date: undefined,
    description: "",
    isActive: false,
  });
  const [currentReleaseSetting, setCurrentReleaseSetting] =
    useState<ICOMPONENTS.ReleaseDateData>({
      id: undefined,
      date: undefined,
      description: "",
      isActive: false,
    });
  const [allReleaseDates, setAllReleaseDates] = useState<
    ICOMPONENTS.ReleaseDateData[]
  >([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [activeReleaseDate, setActiveReleaseDate] = useState<Date | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<ICOMPONENTS.ReleaseDateMessage | null>(
    null
  );
  const [currentDateTime, setCurrentDateTime] = useState(
    getCurrentVietnamTime()
  );
  const [isClient, setIsClient] = useState(false);

  // Refs for debouncing
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentVietnamTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  const loadAllReleaseDates = useCallback(async () => {
    try {
      const response = (await systemService.getReleaseDate(
        "sort:-launchDate,sort:-isActive"
      )) as IGetReleaseDateResponse;

      if (response.data && response.data.results.length > 0) {
        // Chuyển đổi tất cả release dates từ UTC sang múi giờ Việt Nam
        const allDates = response.data.results.map((releaseDateData) => {
          const utcDate = new Date(releaseDateData.launchDate);
          const vietnamDate = convertUtcToVietnamTime(utcDate);

          return {
            id: releaseDateData.id,
            date: vietnamDate,
            description: releaseDateData.description || "",
            isActive: releaseDateData.isActive || false,
          };
        });

        setAllReleaseDates(allDates);

        // Tìm sự kiện có isActive = true để dùng cho countdown
        const activeEvent = allDates.find((event) => event.isActive);
        if (activeEvent && activeEvent.date) {
          setActiveReleaseDate(activeEvent.date);
        } else {
          setActiveReleaseDate(undefined);
        }

        // Chọn sự kiện gần nhất làm mặc định
        const nearestEvent = allDates[0];
        setCurrentReleaseSetting(nearestEvent);

        // Nếu đang không tạo mới, set sự kiện được chọn
        if (!isCreatingNew) {
          if (selectedEventId) {
            const selectedEvent = allDates.find(
              (d) => d.id === selectedEventId
            );
            if (selectedEvent) {
              setReleaseDate(selectedEvent);
            } else {
              setReleaseDate(nearestEvent);
              setSelectedEventId(nearestEvent.id || null);
            }
          } else {
            setReleaseDate(nearestEvent);
            setSelectedEventId(nearestEvent.id || null);
          }
        }
      } else {
        // Không có dữ liệu release date
        const emptyState = {
          id: undefined,
          date: undefined,
          description: "",
          isActive: false,
        };
        setAllReleaseDates([]);
        setReleaseDate(emptyState);
        setCurrentReleaseSetting(emptyState);
        setSelectedEventId(null);
        setActiveReleaseDate(undefined);
      }
    } catch (error) {
      console.error("Error loading release dates:", error);
      const emptyState = {
        id: undefined,
        date: undefined,
        description: "",
        isActive: false,
      };
      setAllReleaseDates([]);
      setReleaseDate(emptyState);
      setCurrentReleaseSetting(emptyState);
      setSelectedEventId(null);
      setActiveReleaseDate(undefined);
    }
  }, [isCreatingNew, selectedEventId]);

  // Load data on mount
  useEffect(() => {
    loadAllReleaseDates();
  }, [loadAllReleaseDates]);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      if (!releaseDate.date || !isValid(releaseDate.date)) {
        throw new Error("Vui lòng chọn ngày và giờ hợp lệ");
      }

      if (!isValidFutureDate(releaseDate.date)) {
        throw new Error("Ngày ra mắt phải là một thời điểm trong tương lai");
      }

      // Chuyển đổi từ múi giờ Việt Nam về UTC trước khi gửi lên server
      const utcDate = convertVietnamTimeToUtc(releaseDate.date);

      let response;
      if (releaseDate.id) {
        // Cập nhật release date hiện có
        const payload = {
          launchDate: utcDate.toISOString(),
        };
        response = (await systemService.updateReleaseDate(
          releaseDate.id,
          payload
        )) as IUpdateReleaseDateResponse;
      } else {
        // Tạo release date mới
        const payload = {
          launchDate: utcDate.toISOString(),
        };
        response = (await systemService.setReleaseDate(
          payload
        )) as ISetReleaseDateResponse;
      }

      if (response.statusCode === 200 || response.statusCode === 201) {
        setMessage({
          type: "success",
          text: releaseDate.id
            ? "Cập nhật ngày ra mắt thành công!"
            : "Tạo ngày ra mắt thành công!",
        });
        await loadAllReleaseDates();
      } else {
        throw new Error(response.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Có lỗi không xác định xảy ra",
      });
    } finally {
      setIsLoading(false);
    }
  }, [releaseDate, loadAllReleaseDates]);

  const handleReset = useCallback(() => {
    if (isCreatingNew) {
      // Reset về trạng thái tạo mới
      setReleaseDate({
        id: undefined,
        date: undefined,
        description: "",
        isActive: false,
      });
    } else {
      // Reset về sự kiện hiện tại
      setReleaseDate(currentReleaseSetting);
    }
    setMessage(null);
  }, [isCreatingNew, currentReleaseSetting]);

  const handleCreateNew = useCallback(() => {
    setIsCreatingNew(true);
    setSelectedEventId(null);
    setReleaseDate({
      id: undefined,
      date: undefined,
      description: "",
      isActive: false,
    });
    setMessage(null);
  }, []);

  const handleSelectEvent = useCallback(
    (event: ICOMPONENTS.ReleaseDateData) => {
      setIsCreatingNew(false);
      setSelectedEventId(event.id || null);
      setReleaseDate(event);
      setMessage(null);
    },
    []
  );

  const handleDelete = useCallback(async () => {
    if (!releaseDate.id) {
      setMessage({
        type: "error",
        text: "Không có dữ liệu để xóa",
      });
      return;
    }

    if (!confirm("Bạn có chắc chắn muốn xóa cài đặt ngày ra mắt này?")) {
      return;
    }

    setIsLoading(true);
    setMessage(null);
    try {
      const response = (await systemService.deleteReleaseDate(
        releaseDate.id
      )) as IDeleteReleaseDateResponse;

      if (response.statusCode === 200) {
        setMessage({
          type: "success",
          text: "Xóa ngày ra mắt thành công!",
        });

        // Reset về trạng thái rỗng
        const emptyState = {
          id: undefined,
          date: undefined,
          description: "",
          isActive: false,
        };
        setReleaseDate(emptyState);
        setCurrentReleaseSetting(emptyState);
        setSelectedEventId(null);
        setIsCreatingNew(false);
      } else {
        throw new Error(response.message || "Có lỗi xảy ra khi xóa");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Có lỗi không xác định xảy ra",
      });
    } finally {
      setIsLoading(false);
    }
  }, [releaseDate.id]);

  // Memoized computed values
  const hasValidDate: boolean = useMemo(() => {
    return !isCreatingNew && !!releaseDate.date && isValid(releaseDate.date);
  }, [isCreatingNew, releaseDate.date]);

  const canSave: boolean = useMemo(() => {
    return !isLoading && !!releaseDate.date && isValid(releaseDate.date);
  }, [isLoading, releaseDate.date]);

  const canDelete: boolean = useMemo(() => {
    return !isCreatingNew && !!releaseDate.id && !isLoading;
  }, [isCreatingNew, releaseDate.id, isLoading]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    releaseDate,
    allReleaseDates,
    selectedEventId,
    isCreatingNew,
    activeReleaseDate,
    isLoading,
    message,
    currentDateTime,
    isClient,
    hasValidDate,
    canSave,
    canDelete,

    // Actions
    setReleaseDate,
    handleSave,
    handleReset,
    handleCreateNew,
    handleSelectEvent,
    handleDelete,
    loadAllReleaseDates,
  };
};
