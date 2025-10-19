"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import { Input } from "@/components/Atoms/ui/input";
import { Button } from "@/components/Atoms/ui/button";
import { Badge } from "@/components/Atoms/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Atoms/ui/dialog";
import { Label } from "@/components/Atoms/ui/label";
import { Textarea } from "@/components/Atoms/ui/textarea";
import { Search, Filter, Eye, EyeOff, Edit, Trash2, RefreshCw, X, Upload, Image } from "lucide-react";
import kynhanService from "@services/kynhan";
import { IKyNhan } from "@models/ky-nhan/entity";
import { IUpdateKyNhanRequest } from "@models/ky-nhan/request";
import { IBackendResponse } from "@models/backend";
import { ILandEntity } from "@models/land/entity";
import { toast } from "react-toastify";

const KyNhanListPage = ({
  kyNhanList,
  landList: initialLandList,
}: {
  kyNhanList: IKyNhan[];
  landList: ILandEntity[];
}) => {
  const [kyNhans, setKyNhans] = useState<IKyNhan[]>(kyNhanList);
  const [filteredKyNhans, setFilteredKyNhans] = useState<IKyNhan[]>(kyNhanList);
  const [landList, setLandList] = useState<ILandEntity[]>(initialLandList);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingKyNhan, setEditingKyNhan] = useState<IKyNhan | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    thoiKy: "",
    chienCong: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);


  // Fetch ky-nhan data
  const fetchKyNhans = async () => {
    setIsLoading(true);
    try {
      const kyNhanResponse =
        (await kynhanService.getKyNhan()) as IBackendResponse<any>;

      if (kyNhanResponse.statusCode === 200 && kyNhanResponse.data?.results) {
        setKyNhans(kyNhanResponse.data.results);
        setFilteredKyNhans(kyNhanResponse.data.results);
      } else {
        throw new Error(
          kyNhanResponse.message || "Failed to fetch ky-nhan data"
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Không thể tải danh sách kỳ nhân");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKyNhans();
  }, []);

  // Update landList when prop changes
  useEffect(() => {
    setLandList(initialLandList);
  }, [initialLandList]);

  // Helper function to get land name by id
  const getLandName = (landId: number) => {
    const land = landList?.find((land) => land.id === landId);
    return land ? land.name : `Đất ID: ${landId}`;
  };

  // Filter and search functionality
  useEffect(() => {
    let filtered = kyNhans;

    // Filter by active status
    if (activeFilter === "active") {
      filtered = filtered?.filter((kyNhan) => kyNhan.active);
    } else if (activeFilter === "inactive") {
      filtered = filtered?.filter((kyNhan) => !kyNhan.active);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered?.filter(
        (kyNhan) =>
          kyNhan.name.toLowerCase().includes(query) ||
          kyNhan.thoiKy.toLowerCase().includes(query) ||
          kyNhan.chienCong.toLowerCase().includes(query)
      );
    }

    setFilteredKyNhans(filtered);
  }, [kyNhans, searchQuery, activeFilter]);

  const handleRefresh = () => {
    fetchKyNhans();
  };

  // Edit modal functions
  const openEditModal = (kyNhan: IKyNhan) => {
    setEditingKyNhan(kyNhan);
    setEditForm({
      name: kyNhan.name,
      thoiKy: kyNhan.thoiKy,
      chienCong: kyNhan.chienCong,
    });
    setSelectedImage(null);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingKyNhan(null);
    setEditForm({
      name: "",
      thoiKy: "",
      chienCong: "",
    });
    setSelectedImage(null);
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
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleToggleStatus = async (kyNhan: IKyNhan) => {
    try {
      const formData = new FormData();
      formData.append("name", kyNhan.name);
      formData.append("thoiKy", kyNhan.thoiKy);
      formData.append("chienCong", kyNhan.chienCong);
      formData.append("active", (!kyNhan.active).toString());

      const response = (await kynhanService.updateKyNhan(
        kyNhan.id,
        formData
      )) as IBackendResponse<any>;

      if (response.statusCode === 200) {
        toast.success(`Đã ${!kyNhan.active ? "hiện" : "ẩn"} kỳ nhân "${kyNhan.name}"`);
        fetchKyNhans(); // Refresh data
      } else {
        throw new Error(response.message || "Cập nhật trạng thái thất bại");
      }
    } catch (error: any) {
      toast.error(error.message || "Không thể cập nhật trạng thái");
    }
  };

  const handleUpdateKyNhan = async () => {
    if (!editingKyNhan) return;

    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("thoiKy", editForm.thoiKy);
      formData.append("chienCong", editForm.chienCong);
      formData.append("active", editingKyNhan.active.toString()); // Giữ nguyên status hiện tại

      if (selectedImage) {
        formData.append("imgUrl", selectedImage);
      }

      const response = (await kynhanService.updateKyNhan(
        editingKyNhan.id,
        formData
      )) as IBackendResponse<any>;

      if (response.statusCode === 200) {
        toast.success("Cập nhật thông tin kỳ nhân thành công");
        closeEditModal();
        fetchKyNhans(); // Refresh data
      } else {
        throw new Error(response.message || "Cập nhật thất bại");
      }
    } catch (error: any) {
      toast.error(error.message || "Không thể cập nhật thông tin kỳ nhân");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-admin-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Danh Sách Kỳ Nhân
            </h1>
            <p className="text-gray-600">
              Quản lý và theo dõi tất cả kỳ nhân trong hệ thống
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-stone-600 hover:bg-stone-700"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Làm mới
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="border-2 border-gray-300">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm theo tên, thời kỳ, chiến công..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-4xl border-gray-300"
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  onClick={() => setActiveFilter("all")}
                  className="rounded-full"
                >
                  Tất cả ({kyNhans?.length})
                </Button>
                <Button
                  variant={activeFilter === "active" ? "default" : "outline"}
                  onClick={() => setActiveFilter("active")}
                  className="rounded-full"
                >
                  Hoạt động ({kyNhans?.filter((k) => k.active)?.length})
                </Button>
                <Button
                  variant={activeFilter === "inactive" ? "default" : "outline"}
                  onClick={() => setActiveFilter("inactive")}
                  className="rounded-full"
                >
                  Không hoạt động ({kyNhans?.filter((k) => !k.active)?.length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600"></div>
            <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
          </div>
        )}

        {/* Content */}
        {!isLoading && (
          <>
            {/* Results Summary */}
            <div className="text-sm text-gray-600">
              Hiển thị {filteredKyNhans?.length} trong tổng số {kyNhans?.length}{" "}
              kỳ nhân
            </div>

            {/* KyNhan List */}
            {filteredKyNhans?.length === 0 ? (
              <Card className="border-2 border-gray-300">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg">Không tìm thấy kỳ nhân nào</p>
                    <p className="text-sm">
                      Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKyNhans?.map((kyNhan) => (
                  <Card
                    key={kyNhan.id}
                    className="border-2 border-gray-300 hover:shadow-lg transition-shadow"
                  >
                    {/* Image - Now larger and moved to top */}
                    <div className="relative">
                      <div className="w-full h-48 rounded-t-lg overflow-hidden border-b border-gray-200 bg-gray-50 flex items-center justify-center">
                        {kyNhan.imgUrl ? (
                          <img
                            src={kyNhan.imgUrl}
                            alt={kyNhan.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-sm">Không có ảnh</span>
                          </div>
                        )}
                      </div>
                      {/* Status badge over image */}
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant={kyNhan.active ? "default" : "secondary"}
                          className={
                            kyNhan.active
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {kyNhan.active ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {kyNhan.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Info */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Thời kỳ
                          </label>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {kyNhan.thoiKy}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Chiến công
                          </label>
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {kyNhan.chienCong}
                          </p>
                        </div>
                      </div>

                      {/* Metadata - Only show land name and creation date */}
                      <div className="pt-2 border-t border-gray-100">
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            <span className="font-medium">Đất:</span>{" "}
                            {getLandName(kyNhan.landId)}
                          </p>
                          <p>
                            Tạo lúc:{" "}
                            {new Date(kyNhan.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`rounded-full ${
                            kyNhan.active
                              ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                              : "text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                          title={kyNhan.active ? "Ẩn" : "Hiện"}
                          onClick={() => handleToggleStatus(kyNhan)}
                        >
                          {kyNhan.active ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          title="Chỉnh sửa"
                          onClick={() => openEditModal(kyNhan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Chỉnh sửa thông tin kỳ nhân</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Image Upload */}
            <div className="space-y-3">
              <Label htmlFor="image">Ảnh đại diện</Label>
              <div className="flex items-start gap-6">
                {/* Preview */}
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : editingKyNhan?.imgUrl ? (
                    <img
                      src={editingKyNhan.imgUrl}
                      alt={editingKyNhan.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Image className="w-8 h-8 mb-2" />
                      <span className="text-xs">Không có ảnh</span>
                    </div>
                  )}
                </div>

                {/* Upload Area */}
                <div className="flex-1">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-blue-600 hover:text-blue-700">
                        Nhấp để chọn ảnh
                      </span>{" "}
                      hoặc kéo thả vào đây
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {selectedImage && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm text-green-600 font-medium">
                        ✓ {selectedImage.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                        }}
                        className="h-6 px-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Để trống nếu không muốn thay đổi ảnh
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Tên kỳ nhân *</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Nhập tên kỳ nhân"
                color="black"
              />
            </div>

            {/* Thời kỳ */}
            <div className="space-y-2">
              <Label htmlFor="thoiKy">Thời kỳ *</Label>
              <Textarea
                id="thoiKy"
                value={editForm.thoiKy}
                onChange={(e) =>
                  setEditForm({ ...editForm, thoiKy: e.target.value })
                }
                placeholder="Nhập thông tin thời kỳ"
                rows={2}
                color="black"
              />
            </div>

            {/* Chiến công */}
            <div className="space-y-2">
              <Label htmlFor="chienCong">Chiến công *</Label>
              <Textarea
                id="chienCong"
                value={editForm.chienCong}
                onChange={(e) =>
                  setEditForm({ ...editForm, chienCong: e.target.value })
                }
                placeholder="Nhập thông tin chiến công"
                rows={4}
                color="black"
              />
            </div>

          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={closeEditModal}
              disabled={isUpdating}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateKyNhan}
              disabled={
                isUpdating ||
                !editForm.name.trim() ||
                !editForm.thoiKy.trim() ||
                !editForm.chienCong.trim()
              }
              className="bg-stone-600 hover:bg-stone-700"
            >
              {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KyNhanListPage;
