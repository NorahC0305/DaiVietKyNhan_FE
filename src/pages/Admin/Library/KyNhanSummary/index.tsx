"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import { Button } from "@/components/Atoms/ui/button";
import { Label } from "@/components/Atoms/ui/label";
import { Textarea } from "@/components/Atoms/ui/textarea";
import { Input } from "@/components/Atoms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Atoms/ui/select";
import { Upload, Image, Plus, X, Search } from "lucide-react";
import { IKyNhan } from "@models/ky-nhan/entity";
import { IKyNhanResponseModel } from "@models/ky-nhan/response";
import kyNhanSummaryService from "@services/ky-nhan-summary";
import kynhanService from "@services/kynhan";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useDebounce";

interface KyNhanSummaryPageProps {
  kyNhanList: IKyNhan[];
}

const KyNhanSummaryPage: React.FC<KyNhanSummaryPageProps> = ({
  kyNhanList: initialKyNhanList,
}) => {
  const [formData, setFormData] = useState({
    kyNhanId: "",
    summary: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search related states
  const [searchQuery, setSearchQuery] = useState("");
  const [kyNhanList, setKyNhanList] = useState<IKyNhan[]>(initialKyNhanList);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Search function
  const searchKyNhan = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setKyNhanList(initialKyNhanList);
        return;
      }

      setIsSearching(true);
      try {
        const qs = `name:like=${encodeURIComponent(query)}`;
        const response = (await kynhanService.getKyNhan(
          qs
        )) as IKyNhanResponseModel;
        setKyNhanList(response.data?.results || []);
      } catch (error) {
        console.error("Error searching kỳ nhân:", error);
        toast.error("Không thể tìm kiếm kỳ nhân");
        setKyNhanList(initialKyNhanList);
      } finally {
        setIsSearching(false);
      }
    },
    [initialKyNhanList]
  );

  // Effect to handle debounced search
  useEffect(() => {
    searchKyNhan(debouncedSearchQuery);
  }, [debouncedSearchQuery, searchKyNhan]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      toast.error("Vui lòng chọn ảnh");
      return;
    }

    if (!formData.kyNhanId) {
      toast.error("Vui lòng chọn kỳ nhân");
      return;
    }

    if (!formData.summary.trim()) {
      toast.error("Vui lòng nhập tóm tắt");
      return;
    }

    setIsSubmitting(true);

    try {
      // Kiểm tra file trước khi tạo FormData
      if (!selectedImage) {
        throw new Error("File không hợp lệ");
      }

      // Tạo FormData để gửi file
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("imgUrl", selectedImage);
      formDataToSubmit.append("kyNhanId", parseInt(formData.kyNhanId).toString());
      formDataToSubmit.append("summary", formData.summary.trim());

      const response = await kyNhanSummaryService.createKyNhanSummary(
        formDataToSubmit
      );

      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success("Thêm tóm tắt kỳ nhân thành công!");
        // Reset form
        setSearchQuery("");
        setFormData({
          kyNhanId: "",
          summary: "",
        });
        setSelectedImage(null);
        // Reset file input
        const fileInput = document.getElementById(
          "image-upload"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        throw new Error(response.message || "Có lỗi xảy ra");
      }
    } catch (error: any) {
      console.error("Error creating kỳ nhân summary:", error);
      toast.error(error.message || "Không thể thêm tóm tắt kỳ nhân");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-admin-primary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Tóm Tắt Kỳ Nhân
            </h1>
            <p className="text-gray-600">
              Thêm tóm tắt mới cho kỳ nhân trong hệ thống
            </p>
          </div>
        </div>

        {/* Form Section */}
        <Card className="border-2 border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              Thêm Tóm Tắt Kỳ Nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  Ảnh đại diện *
                </Label>

                {/* Upload and Preview Container */}
                <div className="relative">
                  {selectedImage ? (
                    /* Preview with X button */
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-center">
                        <div className="relative max-w-md">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className="max-h-64 object-contain rounded-lg"
                          />
                          {/* Close button in top right */}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(null);
                              // Reset file input
                              const fileInput = document.getElementById(
                                "image-upload"
                              ) as HTMLInputElement;
                              if (fileInput) fileInput.value = "";
                            }}
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black text-white hover:bg-gray-800 p-0 flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-sm text-green-600 font-medium">
                          ✓ {selectedImage.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Upload Area */
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium text-blue-600 hover:text-blue-700">
                          Nhấp để chọn ảnh
                        </span>{" "}
                        hoặc kéo thả vào đây
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}

                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Ky Nhan Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Kỳ Nhân *
                </Label>

                {formData.kyNhanId ? (
                  /* Selected Ky Nhan Display */
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const selectedKyNhan = kyNhanList.find(
                            (k) => k.id.toString() === formData.kyNhanId
                          );
                          return selectedKyNhan?.imgUrl ? (
                            <img
                              src={selectedKyNhan.imgUrl}
                              alt={selectedKyNhan.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Image className="w-6 h-6 text-gray-400" />
                          );
                        })()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {
                            kyNhanList.find(
                              (k) => k.id.toString() === formData.kyNhanId
                            )?.name
                          }
                        </h3>
                        <p className="text-sm text-gray-600">
                          {
                            kyNhanList.find(
                              (k) => k.id.toString() === formData.kyNhanId
                            )?.thoiKy
                          }
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange("kyNhanId", "")}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Thay đổi
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Ky Nhan Grid Selection */
                  <div className="space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Tìm kiếm kỳ nhân theo tên..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        color="black"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                      {kyNhanList.length > 0 ? (
                        kyNhanList.map((kyNhan) => (
                          <div
                            key={kyNhan.id}
                            onClick={() =>
                              handleInputChange(
                                "kyNhanId",
                                kyNhan.id.toString()
                              )
                            }
                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                              {kyNhan.imgUrl ? (
                                <img
                                  src={kyNhan.imgUrl}
                                  alt={kyNhan.name}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <Image className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {kyNhan.name}
                              </h4>
                              <p className="text-xs text-gray-600 truncate">
                                {kyNhan.thoiKy}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm">Không có kỳ nhân nào</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <Label
                  htmlFor="summary"
                  className="text-sm font-medium text-gray-700"
                >
                  Tóm tắt *
                </Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Nhập tóm tắt kỳ nhân..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !selectedImage ||
                    !formData.kyNhanId ||
                    !formData.summary.trim()
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang thêm...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Tóm Tắt
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KyNhanSummaryPage;
