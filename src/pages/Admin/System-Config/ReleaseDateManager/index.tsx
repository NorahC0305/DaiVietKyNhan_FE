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
import { Input } from "@atoms/ui/input";
import { Label } from "@atoms/ui/label";
import { Alert, AlertDescription } from "@atoms/ui/alert";
import { Checkbox } from "@atoms/ui/checkbox";
import { Textarea } from "@atoms/ui/textarea";
import { Separator } from "@atoms/ui/separator";
import { Calendar, Clock, Save, CheckCircle, AlertCircle } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import { AntdDateTimePicker } from "@atoms/ui/antd-datetime-picker";
import systemService from "@services/system";
import {
  IGetReleaseDateResponse,
  ISetReleaseDateResponse,
} from "@models/system/response";

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

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cập nhật thời gian hiện tại mỗi giây (chỉ trên client)
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  // Load dữ liệu hiện tại khi component mount
  useEffect(() => {
    loadCurrentReleaseDate();
  }, []);

  const loadCurrentReleaseDate = async () => {
    try {
      const response =
        (await systemService.getReleaseDate()) as IGetReleaseDateResponse;

      if (response.data) {
        const releaseDateData = response.data;
        // Parse the datetime string back to Date object
        const dateTime = new Date(releaseDateData.launchDate);
        setReleaseDate({
          date: dateTime,
          description: releaseDateData.description || "",
          isActive: releaseDateData.isActive || false,
        });
      }
    } catch (error) {
      console.error("Error loading release date:", error);
      // Fallback to empty state if API fails
      setReleaseDate({
        date: undefined,
        description: "",
        isActive: false,
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Validate form
      if (!releaseDate.date) {
        throw new Error("Vui lòng chọn ngày và giờ");
      }

      // Validate date
      if (!isValid(releaseDate.date)) {
        throw new Error("Ngày giờ không hợp lệ");
      }

      if (releaseDate.date <= new Date()) {
        throw new Error("Ngày ra mắt phải là thời gian trong tương lai");
      }

      // Call API to set release date
      const response = (await systemService.setReleaseDate({
        launchDate: releaseDate.date.toISOString(), // Format: "2025-10-09T14:08:43.374Z"
      })) as ISetReleaseDateResponse;

      if (response.success) {
        setMessage({
          type: "success",
          text: "Cập nhật ngày ra mắt thành công!",
        });
      } else {
        throw new Error(response.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Có lỗi xảy ra khi cập nhật",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReleaseDate({
      date: undefined,
      description: "",
      isActive: false,
    });
    setMessage(null);
  };

  const formatDateTime = (date: Date) => {
    return format(date, "dd/MM/yyyy HH:mm:ss", { locale: vi });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý Ngày Ra Mắt
          </h1>
          <p className="text-gray-600">
            Thiết lập thời gian ra mắt chính thức của hệ thống
          </p>
        </div>
      </div>

      {/* Current Time Display */}
      <Card className="bg-gradient-to-r from-gradient-start to-gradient-end border-2 border-orange-300 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Thời gian hiện tại
                </h3>
                <p className="text-sm text-gray-600">
                  Cập nhật theo thời gian thực
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-gray-900 mb-1">
                {isClient ? format(currentDateTime, "HH:mm:ss") : "00:00:00"}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {isClient ? format(currentDateTime, "dd/MM/yyyy") : "01/01/2024"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Thông tin Ngày Ra Mắt
          </CardTitle>
          <CardDescription>
            Thiết lập ngày và giờ ra mắt chính thức của hệ thống Đại Việt Kỳ
            Nhân
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* DateTime Picker */}
          <AntdDateTimePicker
            date={releaseDate.date}
            onDateChange={(date) =>
              setReleaseDate((prev) => ({ ...prev, date }))
            }
            placeholder="Chọn ngày và giờ ra mắt"
            minDate={new Date()}
          />

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={releaseDate.description}
              onChange={(e) =>
                setReleaseDate((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Nhập mô tả về ngày ra mắt..."
              className="w-full min-h-[80px] bg-white text-black border-gray-300 hover:border-gray-400 focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-500"
              rows={3}
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
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
            <Label htmlFor="is-active" className="text-sm font-medium">
              Kích hoạt thông báo ngày ra mắt
            </Label>
          </div>

          {/* Preview */}
          {releaseDate.date && (
            <>
              <Separator className="my-4" />
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      Xem trước:
                    </span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Hệ thống sẽ ra mắt vào:{" "}
                    <strong>{formatDateTime(releaseDate.date)}</strong>
                  </p>
                  {releaseDate.description && (
                    <p className="text-sm text-orange-600 mt-1">
                      {releaseDate.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Message */}
          {message && (
            <Alert
              className={
                message.type === "success"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }
            >
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription
                className={
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <Separator className="my-6" />
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={isLoading || !releaseDate.date}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu cài đặt
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
            >
              Đặt lại
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Cài đặt hiện tại
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <Label className="font-medium text-gray-600">Ngày ra mắt:</Label>
              <p className="text-gray-900 font-mono">
                {releaseDate.date
                  ? format(releaseDate.date, "dd/MM/yyyy", { locale: vi })
                  : "Chưa thiết lập"}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="font-medium text-gray-600">Giờ ra mắt:</Label>
              <p className="text-gray-900 font-mono">
                {releaseDate.date
                  ? format(releaseDate.date, "HH:mm", { locale: vi })
                  : "Chưa thiết lập"}
              </p>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="font-medium text-gray-600">Trạng thái:</Label>
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  releaseDate.isActive
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                {releaseDate.isActive ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Đã kích hoạt
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    Chưa kích hoạt
                  </>
                )}
              </div>
            </div>
            {releaseDate.description && (
              <div className="md:col-span-2 space-y-1">
                <Label className="font-medium text-gray-600">Mô tả:</Label>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {releaseDate.description}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseDateManager;
