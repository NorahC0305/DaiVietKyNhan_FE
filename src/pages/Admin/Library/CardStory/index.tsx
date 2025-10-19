"use client";

import React, { useState } from "react";
import { Button } from "@components/Atoms/ui/button";
import { Input } from "@components/Atoms/ui/input";
import TipTapEditor from "@components/Organisms/Tiptap";
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
  shortDescription: string;
}

interface SectionInfo {
  id: string;
  title: string;
  content: string;
}

interface HistorySentence {
  id: string;
  content: string;
  source: string;
}

interface HistorySection {
  id: string;
  title: string;
  sentences: HistorySentence[];
}

interface FolkloreSection {
  id: string;
  title: string;
  content: string;
  source: string;
}

interface ReferenceSection {
  id: string;
  content: string;
}

interface ImageLibrary {
  id: string;
  file: File | null;
  preview: string;
}

const CardStoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [libraryImage, setLibraryImage] = useState<File | null>(null);
  const [backgroundRemovedImage, setBackgroundRemovedImage] =
    useState<File | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo>({
    id: "",
    title: "",
    summary: "",
    shortDescription: "",
  });
  const [basicInfo, setBasicInfo] = useState<SectionInfo[]>([
    { id: "1", title: "", content: "" },
  ]);
  const [historicalInfo, setHistoricalInfo] = useState<SectionInfo[]>([
    { id: "1", title: "", content: "" },
  ]);
  const [historySections, setHistorySections] = useState<HistorySection[]>([
    {
      id: "1",
      title: "",
      sentences: [{ id: "1", content: "", source: "" }],
    },
  ]);
  const [folkloreSections, setFolkloreSections] = useState<FolkloreSection[]>([
    { id: "1", title: "", content: "", source: "" },
  ]);
  const [referenceSections, setReferenceSections] = useState<
    ReferenceSection[]
  >([{ id: "1", content: "" }]);
  const [imageLibraries, setImageLibraries] = useState<ImageLibrary[]>([]);
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    type: "basic" | "historical" | "history" | "folklore" | "reference";
  } | null>(null);

  const handleImageUpload = (
    type: "library" | "background" | "imageLibrary",
    sectionId?: string
  ) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = type === "imageLibrary";
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        if (type === "imageLibrary") {
          processMultipleImageFiles(files, type);
        } else {
          processImageFile(files[0], type, sectionId);
        }
      }
    };
    input.click();
  };

  const processImageFile = (
    file: File,
    type: "library" | "background" | "imageLibrary",
    sectionId?: string
  ) => {
    if (file && file.type.startsWith("image/")) {
      if (type === "library") {
        setLibraryImage(file);
      } else if (type === "background") {
        setBackgroundRemovedImage(file);
      } else if (type === "imageLibrary" && sectionId) {
        setImageLibraries((prev) =>
          prev.map((img) =>
            img.id === sectionId
              ? { ...img, file, preview: URL.createObjectURL(file) }
              : img
          )
        );
      }
    }
  };

  const processMultipleImageFiles = (files: File[], type: "imageLibrary") => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > 0 && type === "imageLibrary") {
      const newImageSections = imageFiles.map((file) => ({
        id:
          Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));

      setImageLibraries((prev) => {
        // Loại bỏ item trống đầu tiên nếu có, sau đó thêm các file mới
        const nonEmptyItems = prev.filter((item) => item.file !== null);
        return [...nonEmptyItems, ...newImageSections];
      });
    }
  };

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

  const handleImageDrop = (
    e: React.DragEvent,
    type: "library" | "background" | "imageLibrary",
    sectionId?: string
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-50", "border-blue-400");

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      if (type === "imageLibrary") {
        processMultipleImageFiles(imageFiles, type);
      } else {
        processImageFile(imageFiles[0], type, sectionId);
      }
    }
  };

  const addSection = (
    type:
      | "basic"
      | "historical"
      | "history"
      | "folklore"
      | "reference"
      | "imageLibrary"
  ) => {
    const id = Date.now().toString();

    if (type === "basic") {
      const newSection: SectionInfo = { id, title: "", content: "" };
      setBasicInfo([...basicInfo, newSection]);
    } else if (type === "historical") {
      const newSection: SectionInfo = { id, title: "", content: "" };
      setHistoricalInfo([...historicalInfo, newSection]);
    } else if (type === "history") {
      const newSection: HistorySection = {
        id,
        title: "",
        sentences: [
          { id: Date.now().toString() + "_1", content: "", source: "" },
        ],
      };
      setHistorySections([...historySections, newSection]);
    } else if (type === "folklore") {
      const newSection: FolkloreSection = {
        id,
        title: "",
        content: "",
        source: "",
      };
      setFolkloreSections([...folkloreSections, newSection]);
    } else if (type === "reference") {
      const newSection: ReferenceSection = { id, content: "" };
      setReferenceSections([...referenceSections, newSection]);
    } else if (type === "imageLibrary") {
      const newSection: ImageLibrary = { id, file: null, preview: "" };
      setImageLibraries([...imageLibraries, newSection]);
    }
  };

  const addHistorySentence = (sectionId: string) => {
    const newSentence: HistorySentence = {
      id: Date.now().toString(),
      content: "",
      source: "",
    };
    setHistorySections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, sentences: [...section.sentences, newSentence] }
          : section
      )
    );
  };

  const updateSection = (
    type: "basic" | "historical" | "history" | "folklore" | "reference",
    id: string,
    field: "title" | "content" | "source",
    value: string
  ) => {
    if (type === "basic") {
      setBasicInfo(
        basicInfo.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    } else if (type === "historical") {
      setHistoricalInfo(
        historicalInfo.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    } else if (type === "history") {
      setHistorySections(
        historySections.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    } else if (type === "folklore") {
      setFolkloreSections(
        folkloreSections.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    } else if (type === "reference") {
      setReferenceSections(
        referenceSections.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    }
  };

  const updateHistorySentence = (
    sectionId: string,
    sentenceId: string,
    field: "content" | "source",
    value: string
  ) => {
    setHistorySections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              sentences: section.sentences.map((sentence) =>
                sentence.id === sentenceId
                  ? { ...sentence, [field]: value }
                  : sentence
              ),
            }
          : section
      )
    );
  };

  const removeSection = (
    type:
      | "basic"
      | "historical"
      | "history"
      | "folklore"
      | "reference"
      | "imageLibrary",
    id: string
  ) => {
    if (type === "basic") {
      setBasicInfo(basicInfo.filter((section) => section.id !== id));
    } else if (type === "historical") {
      setHistoricalInfo(historicalInfo.filter((section) => section.id !== id));
    } else if (type === "history") {
      setHistorySections(
        historySections.filter((section) => section.id !== id)
      );
    } else if (type === "folklore") {
      setFolkloreSections(
        folkloreSections.filter((section) => section.id !== id)
      );
    } else if (type === "reference") {
      setReferenceSections(
        referenceSections.filter((section) => section.id !== id)
      );
    } else if (type === "imageLibrary") {
      setImageLibraries(imageLibraries.filter((image) => image.id !== id));
    }
  };

  const removeHistorySentence = (sectionId: string, sentenceId: string) => {
    setHistorySections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              sentences: section.sentences.filter(
                (sentence) => sentence.id !== sentenceId
              ),
            }
          : section
      )
    );
  };

  const handleDragStart = (
    e: React.DragEvent,
    id: string,
    type: "basic" | "historical" | "history" | "folklore" | "reference"
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
    type: "basic" | "historical" | "history" | "folklore" | "reference"
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
    } else if (type === "historical") {
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
    } else if (type === "history") {
      const draggedIndex = historySections.findIndex(
        (section) => section.id === draggedItem.id
      );
      const targetIndex = historySections.findIndex(
        (section) => section.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newHistorySections = [...historySections];
        const [draggedSection] = newHistorySections.splice(draggedIndex, 1);
        newHistorySections.splice(targetIndex, 0, draggedSection);
        setHistorySections(newHistorySections);
      }
    } else if (type === "folklore") {
      const draggedIndex = folkloreSections.findIndex(
        (section) => section.id === draggedItem.id
      );
      const targetIndex = folkloreSections.findIndex(
        (section) => section.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newFolkloreSections = [...folkloreSections];
        const [draggedSection] = newFolkloreSections.splice(draggedIndex, 1);
        newFolkloreSections.splice(targetIndex, 0, draggedSection);
        setFolkloreSections(newFolkloreSections);
      }
    } else if (type === "reference") {
      const draggedIndex = referenceSections.findIndex(
        (section) => section.id === draggedItem.id
      );
      const targetIndex = referenceSections.findIndex(
        (section) => section.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newReferenceSections = [...referenceSections];
        const [draggedSection] = newReferenceSections.splice(draggedIndex, 1);
        newReferenceSections.splice(targetIndex, 0, draggedSection);
        setReferenceSections(newReferenceSections);
      }
    }

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <>
      {/* CSS for TipTap HTML rendering in preview */}
      <style jsx>{`
        .preview-content strong,
        .preview-content b {
          font-weight: 700;
          color: #fbbf24;
        }
        .preview-content em,
        .preview-content i {
          font-style: italic;
          color: #fcd34d;
        }
        .preview-content p {
          margin-bottom: 1rem;
        }
        .preview-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 1.5rem;
        }
        .preview-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 1rem;
        }
        .preview-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fcd34d;
          margin-bottom: 0.75rem;
        }
        .preview-content ul,
        .preview-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .preview-content li {
          margin-bottom: 0.5rem;
        }
        .preview-content blockquote {
          border-left: 4px solid #f59e0b;
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #d1d5db;
        }
        .preview-content a {
          color: #fbbf24;
          text-decoration: underline;
        }
        .preview-content a:hover {
          color: #fcd34d;
        }
        .preview-content code {
          background-color: rgba(0, 0, 0, 0.3);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: "Courier New", monospace;
          color: #fbbf24;
        }
      `}</style>

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
                  onDragOver={handleImageDragOver}
                  onDragEnter={handleImageDragEnter}
                  onDragLeave={handleImageDragLeave}
                  onDrop={(e) => handleImageDrop(e, "library")}
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
                      <Button
                        className="mt-4 rounded-full border-gray-300"
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
                  onDragOver={handleImageDragOver}
                  onDragEnter={handleImageDragEnter}
                  onDragLeave={handleImageDragLeave}
                  onDrop={(e) => handleImageDrop(e, "background")}
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
                      <Button
                        className="mt-4 rounded-full border-gray-300"
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
          </div>

          {/* Image Information Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Thông tin hình ảnh
            </h3>
            <Card
              variant="leftBorder"
              className="border-l-4 border-[#883C00] bg-amber-50"
            >
              <CardContent className="p-6">
                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm thông tin hình
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tên hình
                    </label>
                    <Input
                      placeholder="VD: Trưng Trắc"
                      value={imageInfo.title}
                      onChange={(e) =>
                        setImageInfo({ ...imageInfo, title: e.target.value })
                      }
                      color="black"
                      className="rounded-4xl border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tóm tắt hình
                    </label>
                    <Input
                      placeholder="VD: Người mở đầu truyền thống đấu tranh chống Bắc thuộc"
                      value={imageInfo.summary}
                      onChange={(e) =>
                        setImageInfo({ ...imageInfo, summary: e.target.value })
                      }
                      color="black"
                      className="rounded-4xl  border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Mô tả ngắn
                    </label>
                    <TipTapEditor
                      placeholder="VD: Hơn hai ngàn năm trước, khi đất nước chìm trong ách đô hộ nhà Hán, Trưng Trắc cùng em gái mình là Trưng Nhị đã phất cờ khởi nghĩa, lật đổ ách cai trị..."
                      value={imageInfo.shortDescription}
                      onChange={(value) =>
                        setImageInfo({
                          ...imageInfo,
                          shortDescription: value,
                        })
                      }
                      className="min-h-32 rounded-4xl border-gray-300"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className=" border-gray-500 text-gray-700 hover:bg-gray-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Lưu
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Basic Information Section */}
          <Card
            variant="leftBorder"
            className="border-2 border-[#883C00] rounded-4xl"
          >
            <CardHeader className="bg-gray-100 rounded-tl-3xl ">
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
                      updateSection(
                        "basic",
                        section.id,
                        "title",
                        e.target.value
                      )
                    }
                    color="black"
                    className="rounded-4xl border-gray-300"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nội dung
                    </label>
                    <TipTapEditor
                      placeholder="Nhập mô tả chi tiết..."
                      value={section.content}
                      onChange={(value) =>
                        updateSection("basic", section.id, "content", value)
                      }
                      className="min-h-24 rounded-4xl border-gray-300"
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
                className="w-full mt-4 rounded-full border-gray-300"
                onClick={() => addSection("basic")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phần
              </Button>
            </CardContent>
          </Card>

          {/* Historical Context Section */}
          <Card variant="leftBorder" className="border-l-4 border-[#883C00] ">
            <CardHeader className="bg-gray-100 rounded-tl-3xl">
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
                    className="rounded-4xl border-gray-300"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Đoạn văn mô tả
                    </label>
                    <TipTapEditor
                      placeholder="Nhập đoạn văn mô tả dài..."
                      value={section.content}
                      onChange={(value) =>
                        updateSection(
                          "historical",
                          section.id,
                          "content",
                          value
                        )
                      }
                      className="min-h-32 rounded-4xl border-gray-300"
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
                className="w-full mt-4 rounded-full border-gray-300"
                onClick={() => addSection("historical")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phần
              </Button>
            </CardContent>
          </Card>

          {/* Sử Sách Viết Gì Section */}
          <Card variant="leftBorder" className="border-l-4 border-[#883C00] ">
            <CardHeader className="bg-gray-100 rounded-tl-3xl">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <LucideIcon name="BookOpen" iconSize={20} />
                Sử Sách Viết Gì?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {historySections.map((section, index) => (
                <div
                  key={section.id}
                  className="space-y-4 mb-6 last:mb-0 border border-transparent hover:border-gray-200 rounded-lg p-4 transition-colors"
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, section.id, "history")}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id, "history")}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                    <label className="text-sm font-medium text-gray-700">
                      Tiêu đề phần
                    </label>
                  </div>
                  <Input
                    placeholder="VD: Đại Việt Sử Ký Toàn Thư"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(
                        "history",
                        section.id,
                        "title",
                        e.target.value
                      )
                    }
                    color="black"
                    className="rounded-4xl border-gray-300"
                  />

                  {section.sentences.map((sentence, sentenceIndex) => (
                    <div
                      key={sentence.id}
                      className="space-y-4 border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700">
                            Câu viết {sentenceIndex + 1} - Nguồn
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addHistorySentence(section.id)}
                            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm câu viết
                          </Button>
                          {section.sentences.length > 1 && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                removeHistorySentence(section.id, sentence.id)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa câu
                            </Button>
                          )}
                        </div>
                      </div>
                      <TipTapEditor
                        placeholder="Nhập đoạn câu viết dài..."
                        value={sentence.content}
                        onChange={(value) =>
                          updateHistorySentence(
                            section.id,
                            sentence.id,
                            "content",
                            value
                          )
                        }
                        className="min-h-24 rounded-4xl border-gray-300"
                      />
                      <Input
                        placeholder='VD: — Lê Văn Hưu, "Đại Việt Sử Ký Toàn Thư" - Kỳ Trưng Nữ Vương'
                        value={sentence.source}
                        onChange={(e) =>
                          updateHistorySentence(
                            section.id,
                            sentence.id,
                            "source",
                            e.target.value
                          )
                        }
                        color="black"
                        className="rounded-4xl border-gray-300"
                      />
                    </div>
                  ))}

                  {historySections.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection("history", section.id)}
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
                className="w-full mt-4 rounded-full border-gray-300"
                onClick={() => addSection("history")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phần
              </Button>
            </CardContent>
          </Card>

          {/* Giai thoại dân gian và Truyền thuyết Section */}
          <Card variant="leftBorder" className="border-l-4 border-[#883C00] ">
            <CardHeader className="bg-gray-100 rounded-tl-3xl">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <LucideIcon name="BookOpen" iconSize={20} />
                Giai thoại dân gian và Truyền thuyết
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {folkloreSections.map((section, index) => (
                <div
                  key={section.id}
                  className="space-y-4 mb-6 last:mb-0 border border-transparent hover:border-gray-200 rounded-lg p-4 transition-colors"
                  draggable={true}
                  onDragStart={(e) =>
                    handleDragStart(e, section.id, "folklore")
                  }
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id, "folklore")}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                    <label className="text-sm font-medium text-gray-700">
                      Tiêu đề phần
                    </label>
                  </div>
                  <Input
                    placeholder="VD: Cuộc hôn nhân giữa Trưng Trắc và Thi Sách:"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(
                        "folklore",
                        section.id,
                        "title",
                        e.target.value
                      )
                    }
                    color="black"
                    className="rounded-4xl border-gray-300"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nội dung
                    </label>
                    <TipTapEditor
                      placeholder="Nhập đoạn văn mô tả dài..."
                      value={section.content}
                      onChange={(value) =>
                        updateSection("folklore", section.id, "content", value)
                      }
                      className="min-h-32 rounded-4xl border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nguồn
                    </label>
                    <Input
                      placeholder='VD: — Lê Văn Hưu, "Đại Việt Sử Ký Toàn Thư" - Kỳ Trưng Nữ Vương'
                      value={section.source}
                      onChange={(e) =>
                        updateSection(
                          "folklore",
                          section.id,
                          "source",
                          e.target.value
                        )
                      }
                      color="black"
                      className="rounded-4xl border-gray-300"
                    />
                  </div>

                  {folkloreSections.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection("folklore", section.id)}
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
                className="w-full mt-4 rounded-full border-gray-300"
                onClick={() => addSection("folklore")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phần
              </Button>
            </CardContent>
          </Card>

          {/* Tham khảo Section */}
          <Card variant="leftBorder" className="border-l-4 border-[#883C00] ">
            <CardHeader className="bg-gray-100 rounded-tl-3xl">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <LucideIcon name="BookOpen" iconSize={20} />
                Tham khảo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {referenceSections.map((section, index) => (
                <div
                  key={section.id}
                  className="space-y-4 mb-6 last:mb-0 border border-transparent hover:border-gray-200 rounded-lg p-4 transition-colors"
                  draggable={true}
                  onDragStart={(e) =>
                    handleDragStart(e, section.id, "reference")
                  }
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id, "reference")}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                    <label className="text-sm font-medium text-gray-700">
                      Nguồn tham khảo
                    </label>
                  </div>
                  <TipTapEditor
                    placeholder="Nhập các nguồn tham khảo..."
                    value={section.content}
                    onChange={(value) =>
                      updateSection("reference", section.id, "content", value)
                    }
                    className="min-h-24 rounded-4xl border-gray-300"
                  />

                  {referenceSections.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSection("reference", section.id)}
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
                className="w-full mt-4 rounded-full border-gray-300"
                onClick={() => addSection("reference")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm phần
              </Button>
            </CardContent>
          </Card>

          {/* Thư viện ảnh Section */}
          <Card variant="leftBorder" className="border-l-4 border-[#883C00] ">
            <CardHeader className="bg-gray-100 rounded-tl-3xl">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <LucideIcon name="BookOpen" iconSize={20} />
                Thư viện ảnh
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Vùng drop chung cho nhiều ảnh */}
              <div
                onClick={() => handleImageUpload("imageLibrary")}
                onDragOver={handleImageDragOver}
                onDragEnter={handleImageDragEnter}
                onDragLeave={handleImageDragLeave}
                onDrop={(e) => handleImageDrop(e, "imageLibrary")}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative mb-6"
              >
                <div>
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Kéo thả nhiều hình ảnh vào đây hoặc nhấp để chọn
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Hỗ trợ nhiều file cùng lúc
                  </p>
                  <Button
                    className="rounded-full border-gray-300"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Chọn nhiều hình ảnh
                  </Button>
                </div>
              </div>

              {/* Danh sách các ảnh đã upload */}
              {imageLibraries.filter((img) => img.file).length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-700">
                    Hình ảnh đã tải lên (
                    {imageLibraries.filter((img) => img.file).length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageLibraries
                      .filter((img) => img.file)
                      .map((imageSection, index) => (
                        <div
                          key={imageSection.id}
                          className="relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-center max-h-48 overflow-hidden rounded-lg">
                            {imageSection.file && (
                              <img
                                src={imageSection.preview}
                                alt={`Library preview ${index + 1}`}
                                className="max-w-full max-h-full object-contain border border-yellow-500 rounded-lg"
                              />
                            )}
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                removeSection("imageLibrary", imageSection.id)
                              }
                              className="text-xs"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
              {/* Document-style Preview */}
              <div
                data-preview="true"
                className="relative bg-gradient-to-br from-amber-900 via-gray-800 to-amber-900 rounded-lg overflow-hidden shadow-2xl min-h-[800px]"
                style={{
                  background: `
                  linear-gradient(135deg, #451a03 0%, #1f2937 50%, #451a03 100%),
                  radial-gradient(circle at 20% 80%, rgba(120, 53, 15, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(120, 53, 15, 0.2) 0%, transparent 50%),
                  url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
                `,
                  backgroundAttachment: "fixed",
                }}
              >
                {/* Scroll-style content */}
                <div className="relative p-12 text-white max-w-4xl mx-auto">
                  {/* Main Title */}
                  <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6 text-amber-300 tracking-wide leading-tight">
                      {imageInfo.title || "BỐI CẢNH LỊCH SỬ VÀ XUẤT THÂN"}
                    </h1>
                  </div>

                  {/* Library Image Preview */}
                  {libraryImage && (
                    <div className="flex justify-center mb-12">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-lg opacity-75 blur-sm"></div>
                        <div className="relative border-4 border-amber-500 rounded-lg overflow-hidden max-w-lg shadow-2xl">
                          <img
                            src={URL.createObjectURL(libraryImage)}
                            alt="Library preview"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Summary */}
                  {imageInfo.summary && (
                    <div className="text-center mb-12 px-8">
                      <div className="inline-block border-l-4 border-r-4 border-amber-500 px-8 py-4">
                        <div
                          className="text-xl text-amber-100 leading-relaxed preview-content"
                          dangerouslySetInnerHTML={{
                            __html: imageInfo.summary,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Short Description */}
                  {imageInfo.shortDescription && (
                    <div className="mb-12">
                      <div
                        className="text-gray-200 leading-relaxed text-lg preview-content"
                        style={{
                          fontFamily: "Georgia, serif",
                          lineHeight: "1.8",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: imageInfo.shortDescription,
                        }}
                      />
                    </div>
                  )}

                  {/* Basic Information Sections */}
                  {basicInfo.filter(
                    (section) => section.title || section.content
                  ).length > 0 && (
                    <div className="space-y-8 mb-12">
                      {basicInfo
                        .filter((section) => section.title || section.content)
                        .map((section, index) => (
                          <div key={section.id} className="space-y-4">
                            {section.title && (
                              <h3 className="text-2xl font-bold text-amber-300 border-b-2 border-amber-500 pb-3 mb-6">
                                {section.title.toUpperCase()}
                              </h3>
                            )}
                            {section.content && (
                              <div
                                className="text-gray-200 leading-relaxed text-lg preview-content"
                                style={{
                                  fontFamily: "Georgia, serif",
                                  lineHeight: "1.8",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Historical Context Sections */}
                  {historicalInfo.filter(
                    (section) => section.title || section.content
                  ).length > 0 && (
                    <div className="space-y-8 mb-12">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-amber-300 mb-2 tracking-wide">
                          BỐI CẢNH LỊCH SỬ VÀ XUẤT THÂN
                        </h2>
                        <div className="w-32 h-1 bg-amber-500 mx-auto rounded"></div>
                      </div>
                      {historicalInfo
                        .filter((section) => section.title || section.content)
                        .map((section, index) => (
                          <div key={section.id} className="space-y-4">
                            {section.title && (
                              <h3 className="text-2xl font-bold text-amber-300 border-b border-amber-500 pb-3 mb-6">
                                {section.title.toUpperCase()}
                              </h3>
                            )}
                            {section.content && (
                              <div
                                className="text-gray-200 leading-relaxed text-lg preview-content"
                                style={{
                                  fontFamily: "Georgia, serif",
                                  lineHeight: "1.8",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* History Books Sections */}
                  {historySections.filter(
                    (section) =>
                      section.title || section.sentences.some((s) => s.content)
                  ).length > 0 && (
                    <div className="space-y-8 mb-12">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-amber-300 mb-2 tracking-wide">
                          SỬ SÁCH VIẾT GÌ?
                        </h2>
                        <div className="w-32 h-1 bg-amber-500 mx-auto rounded"></div>
                      </div>
                      {historySections
                        .filter(
                          (section) =>
                            section.title ||
                            section.sentences.some((s) => s.content)
                        )
                        .map((section, index) => (
                          <div key={section.id} className="space-y-6">
                            {section.title && (
                              <h3 className="text-2xl font-bold text-amber-300 border-b border-amber-500 pb-3 mb-6">
                                {section.title.toUpperCase()}
                              </h3>
                            )}

                            <div className="space-y-6">
                              {section.sentences
                                .filter(
                                  (sentence) =>
                                    sentence.content || sentence.source
                                )
                                .map((sentence, sentenceIndex) => (
                                  <div key={sentence.id} className="space-y-3">
                                    {sentence.content && (
                                      <div
                                        className="text-gray-200 leading-relaxed text-lg pl-4 preview-content"
                                        style={{
                                          fontFamily: "Georgia, serif",
                                          lineHeight: "1.8",
                                          borderLeft: "3px solid #f59e0b",
                                        }}
                                        dangerouslySetInnerHTML={{
                                          __html: sentence.content,
                                        }}
                                      />
                                    )}
                                    {sentence.source && (
                                      <div className="ml-8">
                                        <div
                                          className="text-amber-200 italic text-base font-medium preview-content"
                                          dangerouslySetInnerHTML={{
                                            __html: sentence.source,
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Folklore Sections */}
                  {folkloreSections.filter(
                    (section) => section.title || section.content
                  ).length > 0 && (
                    <div className="space-y-8 mb-12">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-amber-300 mb-2 tracking-wide">
                          GIAI THOẠI DÂN GIAN VÀ TRUYỀN THUYẾT
                        </h2>
                        <div className="w-32 h-1 bg-amber-500 mx-auto rounded"></div>
                      </div>
                      {folkloreSections
                        .filter((section) => section.title || section.content)
                        .map((section, index) => (
                          <div key={section.id} className="space-y-4">
                            {section.title && (
                              <h3 className="text-2xl font-bold text-amber-300 border-b border-amber-500 pb-3 mb-6">
                                {section.title.toUpperCase()}
                              </h3>
                            )}
                            {section.content && (
                              <div
                                className="text-gray-200 leading-relaxed text-lg preview-content"
                                style={{
                                  fontFamily: "Georgia, serif",
                                  lineHeight: "1.8",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            )}
                            {section.source && (
                              <div className="ml-8 mt-4">
                                <div
                                  className="text-amber-200 italic text-base font-medium preview-content"
                                  dangerouslySetInnerHTML={{
                                    __html: section.source,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* References */}
                  {referenceSections.filter((section) => section.content)
                    .length > 0 && (
                    <div className="space-y-6 mb-12">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-amber-300 mb-2 tracking-wide">
                          THAM KHẢO
                        </h2>
                        <div className="w-32 h-1 bg-amber-500 mx-auto rounded"></div>
                      </div>
                      <div className="space-y-4">
                        {referenceSections
                          .filter((section) => section.content)
                          .map((section, index) => (
                            <div key={section.id}>
                              <div
                                className="text-gray-200 leading-relaxed text-lg preview-content"
                                style={{
                                  fontFamily: "Georgia, serif",
                                  lineHeight: "1.8",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: section.content,
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Image Library */}
                  {imageLibraries.filter((img) => img.file).length > 0 && (
                    <div className="space-y-8 mb-12">
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-amber-300 mb-2 tracking-wide">
                          THƯ VIỆN ẢNH
                        </h2>
                        <div className="w-32 h-1 bg-amber-500 mx-auto rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {imageLibraries
                          .filter((img) => img.file)
                          .map((imageSection, index) => (
                            <div
                              key={imageSection.id}
                              className="relative group"
                            >
                              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm"></div>
                              <div className="relative border-2 border-amber-500 rounded-lg overflow-hidden bg-gray-800">
                                {imageSection.file && (
                                  <img
                                    src={imageSection.preview}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Show message if no content */}
                  {!imageInfo.title &&
                    !imageInfo.summary &&
                    !imageInfo.shortDescription &&
                    basicInfo.filter((s) => s.title || s.content).length ===
                      0 &&
                    historicalInfo.filter((s) => s.title || s.content)
                      .length === 0 &&
                    historySections.filter(
                      (s) => s.title || s.sentences.some((se) => se.content)
                    ).length === 0 &&
                    folkloreSections.filter((s) => s.title || s.content)
                      .length === 0 &&
                    referenceSections.filter((s) => s.content).length === 0 &&
                    imageLibraries.filter((img) => img.file).length === 0 && (
                      <div className="text-center text-gray-400 mt-32">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-amber-500 opacity-20 rounded-full blur-xl"></div>
                          <div className="relative bg-gray-800 bg-opacity-50 rounded-lg p-12 border border-amber-500 border-opacity-30">
                            <Eye className="h-20 w-20 mx-auto mb-6 text-amber-400 opacity-60" />
                            <p className="text-xl mb-2 font-medium">
                              Chưa có nội dung để xem trước
                            </p>
                            <p className="text-sm opacity-75">
                              Nhập thông tin ở các phần trên để xem preview
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                {/* Scroll-like decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  className="bg-stone-600 hover:bg-stone-700 text-white"
                  onClick={() => {
                    // Scroll to preview
                    const previewElement = document.querySelector(
                      '[data-preview="true"]'
                    );
                    previewElement?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
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
    </>
  );
};

export default CardStoryPage;
