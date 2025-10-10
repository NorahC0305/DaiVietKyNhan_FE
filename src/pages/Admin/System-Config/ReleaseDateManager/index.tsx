"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Button } from "@atoms/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@atoms/ui/card";
import { Label } from "@atoms/ui/label";
import { Alert, AlertDescription } from "@atoms/ui/alert";
import { Checkbox } from "@atoms/ui/checkbox";
import { Textarea } from "@atoms/ui/textarea";
import { Separator } from "@atoms/ui/separator";
import {
  Calendar,
  Clock,
  Save,
  CheckCircle,
  AlertCircle,
  Rocket,
  Timer,
  CalendarCheck,
  Info,
  ToggleRight,
  ToggleLeft,
  FileText,
  Trash2,
  Plus,
  Edit,
  List,
} from "lucide-react";
import { format, isValid, addHours } from "date-fns";
import { vi } from "date-fns/locale";
import { AntdDateTimePicker } from "@atoms/ui/antd-datetime-picker";
import systemService from "@services/system";
import {
  IGetReleaseDateResponse,
  ISetReleaseDateResponse,
  IUpdateReleaseDateResponse,
  IDeleteReleaseDateResponse,
} from "@models/system/response";
import { motion, AnimatePresence } from "framer-motion";

// --- START: HELPER & DASHBOARD COMPONENTS ---

// Timezone constants
const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";
const UTC_OFFSET = 7; // UTC+7 for Vietnam

// Helper functions for Vietnam timezone
const getCurrentVietnamTime = () => {
  // Get current time - JavaScript Date already gives local time
  return new Date();
};

const convertUtcToVietnamTime = (utcDate: string | Date) => {
  const date = typeof utcDate === "string" ? new Date(utcDate) : utcDate;
  // If server returns UTC time, convert to Vietnam time (UTC+7)
  return addHours(date, UTC_OFFSET);
};

const convertVietnamTimeToUtc = (vietnamDate: Date) => {
  // Convert from Vietnam time (UTC+7) to UTC for server
  return addHours(vietnamDate, -UTC_OFFSET);
};

const formatVietnamTime = (
  date: Date,
  formatStr: string = "dd/MM/yyyy HH:mm:ss"
) => {
  return format(date, formatStr, { locale: vi });
};

// Component hiển thị số với hiệu ứng "tick"
const AnimatedNumber = React.memo(({ value }: { value: string }) => {
  return (
    <div className="relative h-12 w-10 overflow-hidden">
      <AnimatePresence>
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-800 tracking-tighter"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});
AnimatedNumber.displayName = "AnimatedNumber";

// Component khối đếm ngược với hiệu ứng Glassmorphism
const CountdownBlock = React.memo(
  ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg w-24 h-24 border border-white/40 shadow-lg flex items-center justify-center">
        <AnimatedNumber value={value} />
      </div>
      <span className="mt-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
);
CountdownBlock.displayName = "CountdownBlock";

// Component Thanh tiến trình
const LaunchProgressBar = ({
  releaseDate,
  startDate,
}: {
  releaseDate: Date;
  startDate: Date;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = releaseDate.getTime() - startDate.getTime();
    if (totalDuration <= 0) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startDate.getTime();
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseDate, startDate]);

  return (
    <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-green-400 to-teal-500 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </div>
  );
};

// Component Bảng điều khiển trạng thái (Phiên bản hoàn chỉnh)
const SystemStatusDashboard = ({
  currentTime,
  releaseDate,
}: {
  currentTime: Date;
  releaseDate: Date | undefined;
}) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [startDate] = useState(getCurrentVietnamTime());

  useEffect(() => {
    if (!releaseDate || !isValid(releaseDate)) {
      setIsLaunched(false);
      return;
    }

    const interval = setInterval(() => {
      // Lấy thời gian hiện tại (đã là múi giờ Việt Nam)
      const nowVietnam = getCurrentVietnamTime();
      const releaseDateVietnam = convertUtcToVietnamTime(releaseDate);

      const distance = releaseDateVietnam.getTime() - nowVietnam.getTime();

      if (distance < 0) {
        setIsLaunched(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setIsLaunched(false);
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [releaseDate]);

  const padZero = (num: number) => num.toString().padStart(2, "0");

  return (
    <Card className="animated-gradient shadow-xl overflow-hidden">
      <CardContent className="p-6 space-y-5">
        {/* Re-integrated Current Time Display */}
        <div>
          <div className="flex justify-between items-center text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Thời gian hệ thống (GMT+7):</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-gray-800">
                {formatVietnamTime(currentTime, "HH:mm:ss")}
              </span>
            </div>
          </div>
          <div className="flex justify-end text-sm text-gray-600 mt-1">
            <span>{formatVietnamTime(currentTime, "EEEE, dd/MM/yyyy")}</span>
          </div>
        </div>

        <Separator className="bg-white/50" />

        {/* Countdown Section */}
        <AnimatePresence>
          {releaseDate && isValid(releaseDate) ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center mb-2">
                <span className="font-semibold text-gray-700">
                  Đếm ngược đến ngày ra mắt
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 md:gap-6">
                {isLaunched ? (
                  <div className="text-2xl font-bold text-green-700 flex items-center gap-2 py-10">
                    <CheckCircle />
                    <span>Hệ Thống Đã Ra Mắt!</span>
                  </div>
                ) : (
                  <>
                    <CountdownBlock
                      value={padZero(countdown.days)}
                      label="Ngày"
                    />
                    <CountdownBlock
                      value={padZero(countdown.hours)}
                      label="Giờ"
                    />
                    <CountdownBlock
                      value={padZero(countdown.minutes)}
                      label="Phút"
                    />
                    <CountdownBlock
                      value={padZero(countdown.seconds)}
                      label="Giây"
                    />
                  </>
                )}
              </div>
              <LaunchProgressBar
                releaseDate={releaseDate}
                startDate={startDate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 h-40 flex items-center justify-center bg-black/5 rounded-lg"
            >
              <p>Vui lòng thiết lập ngày ra mắt để bắt đầu đếm ngược</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// --- END: HELPER & DASHBOARD COMPONENTS ---

// Memoized Event List Item Component
const EventListItem = React.memo(
  ({
    event,
    isSelected,
    onSelect,
  }: {
    event: ReleaseDateData;
    isSelected: boolean;
    onSelect: (event: ReleaseDateData) => void;
  }) => (
    <div
      className={`py-4 p-2 cursor-pointer border-l-4 transition-colors bg-gray-200 rounded-xl ${
        isSelected
          ? "bg-orange-50 border-orange-500"
          : "hover:bg-gray-50 border-transparent"
      }`}
      onClick={() => onSelect(event)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {event.description || "Sự kiện không có mô tả"}
          </p>
          <p className="text-xs text-gray-500">
            {event.date
              ? formatVietnamTime(event.date, "dd/MM/yyyy HH:mm")
              : "Chưa có ngày"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {event.isActive && (
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          )}
          <Edit className="h-3 w-3 text-gray-400" />
        </div>
      </div>
    </div>
  )
);
EventListItem.displayName = "EventListItem";

interface ReleaseDateData {
  id?: number;
  date: Date | undefined;
  description: string;
  isActive: boolean;
}

const ReleaseDateManager: React.FC = () => {
  const [releaseDate, setReleaseDate] = useState<ReleaseDateData>({
    id: undefined,
    date: undefined,
    description: "",
    isActive: false,
  });
  const [currentReleaseSetting, setCurrentReleaseSetting] =
    useState<ReleaseDateData>({
      id: undefined,
      date: undefined,
      description: "",
      isActive: false,
    });
  const [allReleaseDates, setAllReleaseDates] = useState<ReleaseDateData[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
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

  // Move useEffect after loadAllReleaseDates definition

  const loadAllReleaseDates = useCallback(async () => {
    try {
      const response = (await systemService.getReleaseDate(
        "sort:-launchDate"
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

      // So sánh với thời gian hiện tại theo múi giờ Việt Nam
      const nowVietnam = getCurrentVietnamTime();
      if (releaseDate.date <= nowVietnam) {
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

  const handleSelectEvent = useCallback((event: ReleaseDateData) => {
    setIsCreatingNew(false);
    setSelectedEventId(event.id || null);
    setReleaseDate(event);
    setMessage(null);
  }, []);

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

  const formatDateTime = useCallback((date: Date) => {
    return formatVietnamTime(date, "dd/MM/yyyy HH:mm:ss");
  }, []);

  // Memoized computed values
  const hasValidDate = useMemo(() => {
    return !isCreatingNew && releaseDate.date && isValid(releaseDate.date);
  }, [isCreatingNew, releaseDate.date]);

  const canSave = useMemo(() => {
    return !isLoading && releaseDate.date && isValid(releaseDate.date);
  }, [isLoading, releaseDate.date]);

  const canDelete = useMemo(() => {
    return !isCreatingNew && releaseDate.id && !isLoading;
  }, [isCreatingNew, releaseDate.id, isLoading]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý Ngày Ra Mắt
          </h1>
          <p className="text-gray-600">
            Thiết lập và theo dõi thời gian ra mắt chính thức của hệ thống
          </p>
        </div>
      </div>

      {isClient && (
        <SystemStatusDashboard
          currentTime={currentDateTime}
          releaseDate={currentReleaseSetting.date}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Danh sách sự kiện */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Danh sách sự kiện
              </div>
              <Button
                size="sm"
                onClick={handleCreateNew}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Mới
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {allReleaseDates.length > 0 ? (
                <div className="space-y-1">
                  {allReleaseDates.map((event) => (
                    <EventListItem
                      key={event.id}
                      event={event}
                      isSelected={selectedEventId === event.id}
                      onSelect={handleSelectEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Chưa có sự kiện nào</p>
                  <p className="text-xs">Nhấn "Mới" để tạo sự kiện đầu tiên</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form chỉnh sửa */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              {isCreatingNew ? "Tạo Sự Kiện Mới" : "Chỉnh Sửa Sự Kiện"}
            </CardTitle>
            <CardDescription>
              {isCreatingNew
                ? "Tạo sự kiện mới với ngày giờ, mô tả và trạng thái."
                : "Chỉnh sửa thông tin sự kiện đã chọn."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AntdDateTimePicker
              date={releaseDate.date}
              onDateChange={(date) =>
                setReleaseDate((prev) => ({ ...prev, date }))
              }
              placeholder="Chọn ngày và giờ ra mắt (GMT+7)"
              minDate={getCurrentVietnamTime()}
            />
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={releaseDate.description}
                onChange={(e) =>
                  setReleaseDate((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Ví dụ: Sự kiện ra mắt phiên bản 1.0..."
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="is-active"
                checked={releaseDate.isActive}
                onCheckedChange={(checked) =>
                  setReleaseDate((prev) => ({
                    ...prev,
                    isActive: checked as boolean,
                  }))
                }
              />
              <Label htmlFor="is-active" className="cursor-pointer">
                Kích hoạt thông báo ngày ra mắt
              </Label>
            </div>
            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className={message.type === "success" ? "bg-green-50" : ""}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            <Separator />
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={!canSave}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isLoading ? (
                  "Đang lưu..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isCreatingNew ? "Tạo Mới" : "Cập Nhật"}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                {isCreatingNew ? "Hủy tạo mới" : "Hủy thay đổi"}
              </Button>
              {canDelete && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="ml-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tóm tắt sự kiện hiện tại */}
        <Card className="lg:col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <CalendarCheck className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-lg">
                {isCreatingNew ? "Sự Kiện Mới" : "Sự Kiện Đang Chọn"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasValidDate ? (
              <div className="space-y-5">
                {/* Release Date */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label className="text-gray-500">Thời gian ra mắt</Label>
                    <p className="font-mono text-lg font-semibold text-gray-800">
                      {releaseDate.date
                        ? formatVietnamTime(
                            releaseDate.date,
                            "HH:mm, dd/MM/yyyy"
                          )
                        : "Chưa có ngày"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      releaseDate.isActive ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {releaseDate.isActive ? (
                      <ToggleRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-500">
                      Trạng thái thông báo
                    </Label>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full text-xs font-medium ${
                        releaseDate.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          releaseDate.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {releaseDate.isActive ? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {releaseDate.description && (
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <Label className="text-gray-500">Mô tả</Label>
                      <blockquote className="mt-1 border-l-4 border-gray-200 pl-4 text-sm text-gray-600 italic">
                        {releaseDate.description}
                      </blockquote>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // "Not Set" State
              <div className="flex flex-col items-center justify-center text-center text-gray-500 h-40 bg-gray-50 rounded-lg">
                <Info className="h-8 w-8 text-gray-400 mb-2" />
                <p className="font-medium">
                  {isCreatingNew ? "Đang tạo sự kiện mới" : "Chưa chọn sự kiện"}
                </p>
                <p className="text-sm">
                  {isCreatingNew
                    ? "Điền thông tin và nhấn 'Tạo Mới' để lưu."
                    : "Chọn một sự kiện từ danh sách bên trái để xem chi tiết."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReleaseDateManager;
