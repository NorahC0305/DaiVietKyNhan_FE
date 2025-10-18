"use client";

import React, { useState } from "react";
import { Button } from "@components/Atoms/ui/button";
import { Input } from "@components/Atoms/ui/input";
import { Textarea } from "@components/Atoms/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/Atoms/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/Atoms/ui/select";
import LucideIcon from "@components/Atoms/LucideIcon";
import {
  Upload,
  Plus,
  Save,
  Trash2,
  Eye,
  Filter,
  GripVertical,
  FileText,
  BookOpen,
} from "lucide-react";

interface ImageInfo {
  id: string;
  title: string;
  summary: string;
}

interface SectionInfo {
  id: string;
  title: string;
  content: string;
}

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [libraryImage, setLibraryImage] = useState<File | null>(null);
  const [backgroundRemovedImage, setBackgroundRemovedImage] =
    useState<File | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo>({
    id: "",
    title: "",
    summary: "",
  });
  const [basicInfo, setBasicInfo] = useState<SectionInfo[]>([
    { id: "1", title: "", content: "" },
  ]);
  const [historicalInfo, setHistoricalInfo] = useState<SectionInfo[]>([
    { id: "1", title: "", content: "" },
  ]);
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    type: "basic" | "historical";
  } | null>(null);

  const handleImageUpload = (type: "library" | "background") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (type === "library") {
          setLibraryImage(file);
        } else {
          setBackgroundRemovedImage(file);
        }
      }
    };
    input.click();
  };

  const addSection = (type: "basic" | "historical") => {
    const newSection: SectionInfo = {
      id: Date.now().toString(),
      title: "",
      content: "",
    };
    if (type === "basic") {
      setBasicInfo([...basicInfo, newSection]);
    } else {
      setHistoricalInfo([...historicalInfo, newSection]);
    }
  };

  const updateSection = (
    type: "basic" | "historical",
    id: string,
    field: "title" | "content",
    value: string
  ) => {
    if (type === "basic") {
      setBasicInfo(
        basicInfo.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    } else {
      setHistoricalInfo(
        historicalInfo.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    }
  };

  const removeSection = (type: "basic" | "historical", id: string) => {
    if (type === "basic") {
      setBasicInfo(basicInfo.filter((section) => section.id !== id));
    } else {
      setHistoricalInfo(historicalInfo.filter((section) => section.id !== id));
    }
  };

  const handleDragStart = (
    e: React.DragEvent,
    id: string,
    type: "basic" | "historical"
  ) => {
    setDraggedItem({ id, type });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent,
    targetId: string,
    type: "basic" | "historical"
  ) => {
    e.preventDefault();

    if (
      !draggedItem ||
      draggedItem.type !== type ||
      draggedItem.id === targetId
    ) {
      setDraggedItem(null);
      return;
    }

    if (type === "basic") {
      const draggedIndex = basicInfo.findIndex(
        (section) => section.id === draggedItem.id
      );
      const targetIndex = basicInfo.findIndex(
        (section) => section.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newBasicInfo = [...basicInfo];
        const [draggedSection] = newBasicInfo.splice(draggedIndex, 1);
        newBasicInfo.splice(targetIndex, 0, draggedSection);
        setBasicInfo(newBasicInfo);
      }
    } else {
      const draggedIndex = historicalInfo.findIndex(
        (section) => section.id === draggedItem.id
      );
      const targetIndex = historicalInfo.findIndex(
        (section) => section.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newHistoricalInfo = [...historicalInfo];
        const [draggedSection] = newHistoricalInfo.splice(draggedIndex, 1);
        newHistoricalInfo.splice(targetIndex, 0, draggedSection);
        setHistoricalInfo(newHistoricalInfo);
      }
    }

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen rounded-xl bg-admin-primary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Image Upload Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Library Image Section */}
          <Card className="border-2 border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Thông tin hình ảnh thư viện
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onClick={() => handleImageUpload("library")}
                className="border-2 border-dashed border-gray-300 rounded-4xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative"
              >
                {libraryImage ? (
                  <div className="flex items-center justify-center max-h-64 overflow-hidden">
                    <img
                      src={URL.createObjectURL(libraryImage)}
                      alt="Library preview"
                      className="max-w-full max-h-full object-contain border border-yellow-500 rounded-lg"
                    />
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      Nhấp để tải lên hoặc kéo thả hình ảnh
                    </p>
                    <Button className="mt-4" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm hình ảnh
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Background Removed Image Section */}
          <Card className="border-2  border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Thông tin hình ảnh chi tiết tách nền
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onClick={() => handleImageUpload("background")}
                className="border-2 border-dashed border-gray-300 rounded-4xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative"
              >
                {backgroundRemovedImage ? (
                  <div className="flex items-center justify-center max-h-64 overflow-hidden">
                    <img
                      src={URL.createObjectURL(backgroundRemovedImage)}
                      alt="Background removed preview"
                      className="max-w-full max-h-full object-contain border border-yellow-500 rounded-lg"
                    />
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      Nhấp để tải lên hoặc kéo thả hình ảnh
                    </p>
                    <Button className="mt-4" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm hình ảnh
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Information Section */}
        <Card className="border-2 border-stone-300 bg-stone-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Thông tin hình ảnh
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Thêm thông tin hình ảnh
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tên hình
              </label>
              <Input
                placeholder='VD: "Trưng Trắc"'
                value={imageInfo.title}
                onChange={(e) =>
                  setImageInfo({ ...imageInfo, title: e.target.value })
                }
                color="black"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tóm tắt hình
              </label>
              <Textarea
                placeholder='VD: "Người nữ đầu tiên truyền thống đấu tranh chống Bắc thuộc"'
                value={imageInfo.summary}
                onChange={(e) =>
                  setImageInfo({ ...imageInfo, summary: e.target.value })
                }
                className="min-h-24"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Lưu
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="bg-error hover:bg-error/20 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information Section */}
        <Card className="border-2 border-stone-300">
          <CardHeader className="bg-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <LucideIcon name="FileText" iconSize={20} />
              Thông tin cơ bản
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {basicInfo.map((section, index) => (
              <div
                key={section.id}
                className="space-y-4 mb-6 last:mb-0 border border-transparent hover:border-gray-200 rounded-lg p-4 transition-colors"
                draggable={true}
                onDragStart={(e) => handleDragStart(e, section.id, "basic")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id, "basic")}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                  <label className="text-sm font-medium text-gray-700">
                    Tiêu đề phần
                  </label>
                </div>
                <Input
                  placeholder="VD: Năm sinh - mất, Chức vụ, Phụ quân..."
                  value={section.title}
                  onChange={(e) =>
                    updateSection("basic", section.id, "title", e.target.value)
                  }
                  color="black"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nội dung
                  </label>
                  <Textarea
                    placeholder="Nhập mô tả chi tiết..."
                    value={section.content}
                    onChange={(e) =>
                      updateSection(
                        "basic",
                        section.id,
                        "content",
                        e.target.value
                      )
                    }
                    className="min-h-24"
                    color="black"
                  />
                </div>
                {basicInfo.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSection("basic", section.id)}
                    className="self-start"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa phần
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => addSection("basic")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm phần
            </Button>
          </CardContent>
        </Card>

        {/* Historical Context Section */}
        <Card className="border-2 border-stone-300">
          <CardHeader className="bg-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <LucideIcon name="BookOpen" iconSize={20} />
              Bối cảnh Lịch sử & Xuất thân
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {historicalInfo.map((section, index) => (
              <div
                key={section.id}
                className="space-y-4 mb-6 last:mb-0 border border-transparent hover:border-gray-200 rounded-lg p-4 transition-colors"
                draggable={true}
                onDragStart={(e) =>
                  handleDragStart(e, section.id, "historical")
                }
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id, "historical")}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                  <label className="text-sm font-medium text-gray-700">
                    Tiêu đề phần
                  </label>
                </div>
                <Input
                  placeholder="Bối cảnh thời đại"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(
                      "historical",
                      section.id,
                      "title",
                      e.target.value
                    )
                  }
                  color="black"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Đoạn văn mô tả
                  </label>
                  <Textarea
                    placeholder="Nhập đoạn văn mô tả dài..."
                    value={section.content}
                    onChange={(e) =>
                      updateSection(
                        "historical",
                        section.id,
                        "content",
                        e.target.value
                      )
                    }
                    className="min-h-32"
                    color="black"
                  />
                </div>
                {historicalInfo.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSection("historical", section.id)}
                    className="self-start"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa phần
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => addSection("historical")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm phần
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="border-2 border-stone-300">
          <CardHeader className="bg-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Eye className="h-5 w-5" />
              Xem trước
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Eye className="h-12 w-12 mx-auto mb-2" />
                  <p>Hình ảnh xem trước</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {historicalInfo[0]?.title || "Bối cảnh thời đại"}
                </h3>
                <p className="text-gray-600">
                  {historicalInfo[0]?.content || "Chưa có nội dung"}
                </p>
              </div>
              <Button className="w-full bg-stone-600 hover:bg-stone-700">
                <Eye className="h-4 w-4 mr-2" />
                Xem trước dạng bài viết
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pb-6">
          <Button variant="outline" className="bg-stone-50 border-stone-300">
            Hủy
          </Button>
          <Button className="bg-stone-600 hover:bg-stone-700">
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
