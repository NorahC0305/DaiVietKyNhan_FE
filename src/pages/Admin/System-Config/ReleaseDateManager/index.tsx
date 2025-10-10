"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { format, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import { AntdDateTimePicker } from "@atoms/ui/antd-datetime-picker";
import systemService from "@services/system";
import {
  IGetReleaseDateResponse,
  ISetReleaseDateResponse,
} from "@models/system/response";
import { motion, AnimatePresence } from "framer-motion";

// --- START: HELPER & DASHBOARD COMPONENTS ---

// Component hiển thị số với hiệu ứng "tick"
const AnimatedNumber = ({ value }: { value: string }) => {
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
};

// Component khối đếm ngược với hiệu ứng Glassmorphism
const CountdownBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg w-24 h-24 border border-white/40 shadow-lg flex items-center justify-center">
      <AnimatedNumber value={value} />
    </div>
    <span className="mt-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

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
  const [startDate] = useState(new Date());

  useEffect(() => {
    if (!releaseDate || !isValid(releaseDate)) {
      setIsLaunched(false);
      return;
    }
    const interval = setInterval(() => {
      const now = new Date();
      const distance = releaseDate.getTime() - now.getTime();
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
              <span className="font-semibold">Thời gian hệ thống:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-gray-800">
                {format(currentTime, "HH:mm:ss", { locale: vi })}
              </span>
            </div>
          </div>
          <div className="flex justify-end text-sm text-gray-600 mt-1">
            <span>
              {format(currentTime, "EEEE, dd/MM/yyyy", { locale: vi })}
            </span>
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

interface ReleaseDateData {
  date: Date | undefined;
  description: string;
  isActive: boolean;
}

const ReleaseDateManager: React.FC = () => {
  const [releaseDate, setReleaseDate] = useState<ReleaseDateData>({
    date: undefined,
    description: "",
    isActive: false,
  });
  const [currentReleaseSetting, setCurrentReleaseSetting] =
    useState<ReleaseDateData>({
      date: undefined,
      description: "",
      isActive: false,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    loadCurrentReleaseDate();
  }, []);

  const loadCurrentReleaseDate = async () => {
    try {
      const response =
        (await systemService.getReleaseDate()) as IGetReleaseDateResponse;

      if (response.data) {
        const releaseDateData = response.data;
        const dateTime = new Date(releaseDateData.launchDate);
        const data = {
          date: dateTime,
          description: releaseDateData.description || "",
          isActive: releaseDateData.isActive || false,
        };
        setReleaseDate(data);
        setCurrentReleaseSetting(data);
      }
    } catch (error) {
      console.error("Error loading release date:", error);
      const emptyState = { date: undefined, description: "", isActive: false };
      setReleaseDate(emptyState);
      setCurrentReleaseSetting(emptyState);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      if (!releaseDate.date || !isValid(releaseDate.date)) {
        throw new Error("Vui lòng chọn ngày và giờ hợp lệ");
      }
      if (releaseDate.date <= new Date()) {
        throw new Error("Ngày ra mắt phải là một thời điểm trong tương lai");
      }
      const payload = {
        launchDate: releaseDate.date.toISOString(),
      };

      const response = (await systemService.setReleaseDate(
        payload
      )) as ISetReleaseDateResponse;

      if (response.success) {
        setMessage({
          type: "success",
          text: "Cập nhật ngày ra mắt thành công!",
        });
        await loadCurrentReleaseDate();
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
  };

  const handleReset = () => {
    setReleaseDate(currentReleaseSetting);
    setMessage(null);
  };

  const formatDateTime = (date: Date) => {
    return format(date, "dd/MM/yyyy HH:mm:ss", { locale: vi });
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Thiết Lập Mốc Thời Gian
            </CardTitle>
            <CardDescription>
              Chọn ngày giờ, thêm mô tả và kích hoạt thông báo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AntdDateTimePicker
              date={releaseDate.date}
              onDateChange={(date) =>
                setReleaseDate((prev) => ({ ...prev, date }))
              }
              placeholder="Chọn ngày và giờ ra mắt"
              minDate={new Date()}
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
                disabled={isLoading || !releaseDate.date}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isLoading ? (
                  "Đang lưu..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Lưu Cài Đặt
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                Hủy thay đổi
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-white shadow-md">
  <CardHeader>
    <CardTitle className="flex items-center gap-3">
      <div className="bg-orange-100 p-2 rounded-lg">
        <CalendarCheck className="h-5 w-5 text-orange-600" />
      </div>
      <span className="text-lg">Tóm Tắt Cài Đặt</span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    {currentReleaseSetting.date && isValid(currentReleaseSetting.date) ? (
      <div className="space-y-5">
        {/* Release Date */}
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <Label className="text-gray-500">Thời gian ra mắt</Label>
            <p className="font-mono text-lg font-semibold text-gray-800">
              {format(currentReleaseSetting.date, "HH:mm, dd/MM/yyyy", { locale: vi })}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-start gap-4">
          <div
            className={`p-2 rounded-full ${
              currentReleaseSetting.isActive ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            {currentReleaseSetting.isActive ? (
              <ToggleRight className="h-5 w-5 text-green-600" />
            ) : (
              <ToggleLeft className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <div>
            <Label className="text-gray-500">Trạng thái thông báo</Label>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full text-xs font-medium ${
                currentReleaseSetting.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  currentReleaseSetting.isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              {currentReleaseSetting.isActive ? "Đã kích hoạt" : "Chưa kích hoạt"}
            </div>
          </div>
        </div>

        {/* Description */}
        {currentReleaseSetting.description && (
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <Label className="text-gray-500">Mô tả</Label>
              <blockquote className="mt-1 border-l-4 border-gray-200 pl-4 text-sm text-gray-600 italic">
                {currentReleaseSetting.description}
              </blockquote>
            </div>
          </div>
        )}
      </div>
    ) : (
      // "Not Set" State
      <div className="flex flex-col items-center justify-center text-center text-gray-500 h-40 bg-gray-50 rounded-lg">
        <Info className="h-8 w-8 text-gray-400 mb-2" />
        <p className="font-medium">Chưa có cài đặt</p>
        <p className="text-sm">Vui lòng thiết lập ngày ra mắt để xem thông tin.</p>
      </div>
    )}
  </CardContent>
</Card>
      </div>
    </div>
  );
};

export default ReleaseDateManager;
