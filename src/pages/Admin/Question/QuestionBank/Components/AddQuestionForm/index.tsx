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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Atoms/ui/select";
import { Button } from "@/components/Atoms/ui/button";
import { Circle, CheckCircle, X } from "lucide-react";

interface AddQuestionFormProps {
  onSubmit: (questionData: QuestionData) => void;
}

interface QuestionData {
  category: string;
  difficulty: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<QuestionData>({
    category: "",
    difficulty: "",
    question: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    correctAnswer: "A",
  });

  const categories = ["Địa lý", "Văn học", "Lịch sử", "Toán học", "Khoa học"];

  const difficulties = ["Dễ", "Trung bình", "Khó"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (option: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: value,
      },
    }));
  };

  const handleCorrectAnswerChange = (answer: string) => {
    setFormData((prev) => ({
      ...prev,
      correctAnswer: answer,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      category: "",
      difficulty: "",
      question: "",
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      correctAnswer: "A",
    });
  };

  return (
    <Card className="border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Thêm câu hỏi mới
        </CardTitle>
        <CardDescription className="text-gray-600">
          Tạo câu hỏi mới cho ngân hàng câu hỏi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Danh mục
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className="bg-admin-primary">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Độ khó
              </label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  handleInputChange("difficulty", value)
                }
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Chọn độ khó" />
                </SelectTrigger>
                <SelectContent className="bg-admin-primary">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Câu hỏi
            </label>
            <Textarea
              placeholder="Nhập nội dung câu hỏi..."
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              className="min-h-[100px] border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Các lựa chọn
            </label>
            <div className="space-y-4">
              {Object.entries(formData.options).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <Input
                    placeholder={`Lựa chọn ${key}`}
                    value={value}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                    className="flex-1 border-gray-300 bg-transparent hover:bg-transparent "
                  />
                  <button
                    type="button"
                    onClick={() => handleCorrectAnswerChange(key)}
                    className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 hover:border-green-500 transition-colors"
                  >
                    {formData.correctAnswer === key ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
          >
            Tạo câu hỏi
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddQuestionForm;
