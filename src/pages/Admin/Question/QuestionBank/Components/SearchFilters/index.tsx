"use client";

import React from "react";
import { Input } from "@/components/Atoms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Atoms/ui/select";
import { Button } from "@/components/Atoms/ui/button";
import { Plus } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedDifficulty: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onAddQuestion: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  selectedCategory,
  selectedDifficulty,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onAddQuestion,
}) => {
  const categories = [
    "Tất cả",
    "Địa lý",
    "Văn học",
    "Lịch sử",
    "Toán học",
    "Khoa học",
  ];

  const difficulties = ["Tất cả", "Dễ", "Trung bình", "Khó"];

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent hover:bg-transparent "
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger
              style={{ width: "200px" }}
              className="border-gray-300"
            >
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="bg-admin-primary"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger
              style={{ width: "200px" }}
              className="border-gray-300"
            >
              <SelectValue placeholder="Độ khó" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem
                  key={difficulty}
                  value={difficulty}
                  className="bg-admin-primary"
                >
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={onAddQuestion}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 ml-auto lg:ml-0"
      >
        <Plus className="w-4 h-4 mr-2" />
        Thêm câu hỏi mới
      </Button>
    </div>
  );
};

export default SearchFilters;
