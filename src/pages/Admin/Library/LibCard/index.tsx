"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/Atoms/ui/card";
import { Input } from "@/components/Atoms/ui/input";
import { Textarea } from "@/components/Atoms/ui/textarea";
import { Button } from "@/components/Atoms/ui/button";
import { Label } from "@/components/Atoms/ui/label";
import { Upload, Plus, Save, X } from "lucide-react";
import libcardService, { CreateLibCardRequest } from "@services/libcard";

const LibCardPage = () => {
  const [formData, setFormData] = useState<Partial<CreateLibCardRequest>>({
    ten: "",
    danhHieu: "",
    namSinhNamMat: "",
    queQuan: "",
    xuatThan: "",
    khoiNghia: "",
    nguoiDongHanh: "",
    phuQuan: "",
    chienCong: "",
    dinhCao: "",
    ketCuc: "",
    kyNhanId: 0,
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CreateLibCardRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Handle image upload button click
  const handleImageUpload = () => {
    const input = document.getElementById("imgUrl") as HTMLInputElement;
    input?.click();
  };

  // Handle drag and drop
  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleImageDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-blue-50", "border-blue-400");
  };

  const handleImageDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-50", "border-blue-400");
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-50", "border-blue-400");

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith("image/"));
    
    if (imageFile) {
      setSelectedFile(imageFile);
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
    }
  };

  // Clear image selection
  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    const fileInput = document.getElementById("imgUrl") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert("Vui lòng chọn hình ảnh");
      return;
    }

    if (!formData.ten || !formData.danhHieu || !formData.kyNhanId) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData: CreateLibCardRequest = {
        imgUrl: selectedFile,
        ten: formData.ten,
        danhHieu: formData.danhHieu,
        namSinhNamMat: formData.namSinhNamMat || "",
        queQuan: formData.queQuan || "",
        xuatThan: formData.xuatThan || "",
        khoiNghia: formData.khoiNghia || "",
        nguoiDongHanh: formData.nguoiDongHanh || "",
        phuQuan: formData.phuQuan || "",
        chienCong: formData.chienCong || "",
        dinhCao: formData.dinhCao || "",
        ketCuc: formData.ketCuc || "",
        kyNhanId: formData.kyNhanId || 0,
      };

      await libcardService.createLibCard(submitData);
      alert("Tạo libcard thành công!");
      
      // Reset form
      setFormData({
        ten: "",
        danhHieu: "",
        namSinhNamMat: "",
        queQuan: "",
        xuatThan: "",
        khoiNghia: "",
        nguoiDongHanh: "",
        phuQuan: "",
        chienCong: "",
        dinhCao: "",
        ketCuc: "",
        kyNhanId: 0,
      });
      clearImage();
    } catch (error) {
      console.error("Error creating libcard:", error);
      alert("Có lỗi xảy ra khi tạo libcard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-admin-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Tạo LibCard Mới
          </h1>
          <p className="text-gray-600">
            Điền thông tin để tạo mới libcard cho kỳ nhân
          </p>
        </div>

        {/* Image Upload Section */}
        <Card className="border-2 border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Thông tin hình ảnh
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={handleImageUpload}
              onDragOver={handleImageDragOver}
              onDragEnter={handleImageDragEnter}
              onDragLeave={handleImageDragLeave}
              onDrop={handleImageDrop}
              className="border-2 border-dashed border-gray-300 rounded-4xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative"
            >
              <input
                id="imgUrl"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-64 rounded-lg border border-yellow-500"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Nhấp để tải lên hoặc kéo thả hình ảnh
                  </p>
                  <Button
                    className="rounded-full border-gray-300"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm hình ảnh
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Section */}
        <Card className="border-2 border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Thông tin LibCard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tên (bắt buộc)
                  </label>
                  <Input
                    id="ten"
                    value={formData.ten || ""}
                    onChange={(e) => handleInputChange("ten", e.target.value)}
                    placeholder="Nhập tên kỳ nhân"
                    color="black"
                    className="rounded-4xl border-gray-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Ky Nhan ID (bắt buộc)
                  </label>
                  <Input
                    id="kyNhanId"
                    type="number"
                    value={formData.kyNhanId || ""}
                    onChange={(e) => handleInputChange("kyNhanId", parseInt(e.target.value) || 0)}
                    placeholder="Nhập Ky Nhan ID"
                    color="black"
                    className="rounded-4xl border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Title and Birth/Death */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Danh hiệu (bắt buộc)
                </label>
                <Input
                  id="danhHieu"
                  value={formData.danhHieu || ""}
                  onChange={(e) => handleInputChange("danhHieu", e.target.value)}
                  placeholder="Nhập danh hiệu"
                  color="black"
                  className="rounded-4xl border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Năm sinh - Năm mất
                </label>
                <Input
                  id="namSinhNamMat"
                  value={formData.namSinhNamMat || ""}
                  onChange={(e) => handleInputChange("namSinhNamMat", e.target.value)}
                  placeholder="Nhập thông tin năm sinh và năm mất"
                  color="black"
                  className="rounded-4xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Quê quán
                </label>
                <Input
                  id="queQuan"
                  value={formData.queQuan || ""}
                  onChange={(e) => handleInputChange("queQuan", e.target.value)}
                  placeholder="Nhập quê quán"
                  color="black"
                  className="rounded-4xl border-gray-300"
                />
              </div>

              {/* Background Information */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Xuất thân
                </label>
                <Textarea
                  id="xuatThan"
                  value={formData.xuatThan || ""}
                  onChange={(e) => handleInputChange("xuatThan", e.target.value)}
                  placeholder="Nhập thông tin xuất thân"
                  rows={3}
                  className="rounded-4xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Khởi nghĩa
                </label>
                <Textarea
                  id="khoiNghia"
                  value={formData.khoiNghia || ""}
                  onChange={(e) => handleInputChange("khoiNghia", e.target.value)}
                  placeholder="Nhập thông tin về cuộc khởi nghĩa"
                  rows={3}
                  className="rounded-4xl border-gray-300"
                />
              </div>

              {/* Relationships */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Người đồng hành
                  </label>
                  <Input
                    id="nguoiDongHanh"
                    value={formData.nguoiDongHanh || ""}
                    onChange={(e) => handleInputChange("nguoiDongHanh", e.target.value)}
                    placeholder="Nhập thông tin người đồng hành"
                    color="black"
                    className="rounded-4xl border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phu quân
                  </label>
                  <Input
                    id="phuQuan"
                    value={formData.phuQuan || ""}
                    onChange={(e) => handleInputChange("phuQuan", e.target.value)}
                    placeholder="Nhập thông tin phu quân"
                    color="black"
                    className="rounded-4xl border-gray-300"
                  />
                </div>
              </div>

              {/* Achievements and Events */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Chiến công
                </label>
                <Textarea
                  id="chienCong"
                  value={formData.chienCong || ""}
                  onChange={(e) => handleInputChange("chienCong", e.target.value)}
                  placeholder="Nhập thông tin về các chiến công"
                  rows={3}
                  className="rounded-4xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Đỉnh cao
                </label>
                <Textarea
                  id="dinhCao"
                  value={formData.dinhCao || ""}
                  onChange={(e) => handleInputChange("dinhCao", e.target.value)}
                  placeholder="Nhập thông tin về đỉnh cao trong sự nghiệp"
                  rows={3}
                  className="rounded-4xl border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Kết cục
                </label>
                <Textarea
                  id="ketCuc"
                  value={formData.ketCuc || ""}
                  onChange={(e) => handleInputChange("ketCuc", e.target.value)}
                  placeholder="Nhập thông tin về kết cục"
                  rows={3}
                  className="rounded-4xl border-gray-300"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pb-6">
          <Button 
            variant="outline" 
            className="bg-stone-50 border-stone-300"
            onClick={() => {
              setFormData({
                ten: "",
                danhHieu: "",
                namSinhNamMat: "",
                queQuan: "",
                xuatThan: "",
                khoiNghia: "",
                nguoiDongHanh: "",
                phuQuan: "",
                chienCong: "",
                dinhCao: "",
                ketCuc: "",
                kyNhanId: 0,
              });
              clearImage();
            }}
          >
            Hủy
          </Button>
          <Button 
            type="button" 
            disabled={isSubmitting} 
            className="bg-stone-600 hover:bg-stone-700"
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                form.requestSubmit();
              }
            }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang tạo...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Tạo LibCard
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibCardPage;
