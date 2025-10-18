"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { Switch } from "@/components/Atoms/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Atoms/ui/dialog";
import { Plus, Trash2, Users, Check, X } from "lucide-react";
import { ILandEntity } from "@models/land/entity";
import { IKyNhanSummary } from "@models/ky-nhan/entity";
import Image from "next/image";
import { toast } from "react-toastify";
import questionService from "@services/question";
import { ICreateQuestionRequest } from "@models/question/request";

interface AddQuestionFormProps {
  onSubmit: (questionData: ICreateQuestionRequest) => void;
  lands: ILandEntity[];
  kyNhanSummary: IKyNhanSummary[];
}

interface FormData {
  text: string;
  questionType: "TEXT_INPUT";
  allowSimilarAnswers: boolean;
  landId: number;
  kynhanSummaries: number[];
  answers: string[];
}

interface ValidationErrors {
  text?: string;
  questionType?: string;
  landId?: string;
  kynhanSummaries?: string;
  answers?: string;
}

// Constants
const INITIAL_OPTIONS: Record<string, string> = {
  A: "",
  B: "",
  C: "",
  D: "",
};

const INITIAL_OPTION_COUNT = 4;
const MIN_OPTIONS_COUNT = 2;
const OPTION_LABEL_START = 65; // ASCII code for 'A'

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({
  onSubmit,
  lands,
  kyNhanSummary,
}) => {
  // Memoized computed values
  const defaultLandId = useMemo(() => lands && lands.length > 0 ? lands[0]?.id : 0, [lands]);

  const [formData, setFormData] = useState<FormData>({
    text: "",
    questionType: "TEXT_INPUT",
    allowSimilarAnswers: true,
    landId: defaultLandId,
    kynhanSummaries: [],
    answers: [],
  });

  const [options, setOptions] =
    useState<Record<string, string>>(INITIAL_OPTIONS);
  const [optionCount, setOptionCount] = useState(INITIAL_OPTION_COUNT);
  const [isKyNhanModalOpen, setIsKyNhanModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  // Update default land ID when lands change
  useEffect(() => {
    if (lands && lands?.length > 0 && defaultLandId !== formData?.landId) {
      setFormData((prev) => ({
        ...prev,
        landId: defaultLandId,
      }));
    }
  }, [lands, defaultLandId, formData?.landId]);

  // Memoized values
  const selectedKyNhanSummaries = useMemo(
    () =>
      kyNhanSummary?.filter((kyNhan) =>
        formData.kynhanSummaries.includes(kyNhan.id)
      ) || [],
    [kyNhanSummary, formData.kynhanSummaries]
  );

  const sortedOptions = useMemo(
    () =>
      Object.entries(options).sort(
        ([a], [b]) => a.charCodeAt(0) - b.charCodeAt(0)
      ),
    [options]
  );

  // Event handlers with useCallback for performance
  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | boolean | number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // Clear validation error when user starts typing
      if (validationErrors[field as keyof ValidationErrors]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as keyof ValidationErrors];
          return newErrors;
        });
      }
    },
    [validationErrors]
  );

  const handleQuestionChange = useCallback(
    (value: string) => {
      handleInputChange("text", value);
    },
    [handleInputChange]
  );

  const handleLandChange = useCallback(
    (landIdStr: string) => {
      const landId = parseInt(landIdStr, 10);
      if (!isNaN(landId)) {
        handleInputChange("landId", landId);
      }
    },
    [handleInputChange]
  );

  const handleOptionChange = useCallback((option: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  }, []);

  const handleAllowSimilarAnswersChange = useCallback(
    (checked: boolean) => {
      handleInputChange("allowSimilarAnswers", checked);

      if (!checked) {
        const currentAnswer = options.A || options.answer || "";
        setOptions({ answer: currentAnswer });
        setOptionCount(1);
      } else {
        const currentAnswer = options.answer || "";
        setOptions({
          A: currentAnswer,
          B: "",
          C: "",
          D: "",
        });
        setOptionCount(INITIAL_OPTION_COUNT);
      }
    },
    [options, handleInputChange]
  );

  const getOptionLabel = useCallback((index: number): string => {
    return String.fromCharCode(OPTION_LABEL_START + index);
  }, []);

  const addOption = useCallback(() => {
    const newLabel = getOptionLabel(optionCount);
    setOptions((prev) => ({
      ...prev,
      [newLabel]: "",
    }));
    setOptionCount((prev) => prev + 1);
  }, [optionCount, getOptionLabel]);

  const removeOption = useCallback(
    (optionKey: string) => {
      if (Object.keys(options).length <= MIN_OPTIONS_COUNT) return;

      setOptions((prev) => {
        const newOptions = { ...prev };
        delete newOptions[optionKey];
        return newOptions;
      });
      setOptionCount((prev) => prev - 1);
    },
    [options]
  );

  const handleToggleKyNhanSummary = useCallback((kyNhanId: number) => {
    setFormData((prev) => ({
      ...prev,
      kynhanSummaries: prev.kynhanSummaries.includes(kyNhanId)
        ? prev.kynhanSummaries.filter((id) => id !== kyNhanId)
        : [...prev.kynhanSummaries, kyNhanId],
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      text: "",
      questionType: "TEXT_INPUT",
      allowSimilarAnswers: true,
      landId: defaultLandId,
      kynhanSummaries: [],
      answers: [],
    });
    setOptions(INITIAL_OPTIONS);
    setOptionCount(INITIAL_OPTION_COUNT);
    setValidationErrors({});
  }, [defaultLandId]);

  // Validation function
  const validateForm = useCallback(
    (answers: string[]): ValidationErrors => {
      const errors: ValidationErrors = {};

      if (!formData.text.trim()) {
        errors.text = "Vui lòng nhập nội dung câu hỏi";
      }

      if (!formData.questionType) {
        errors.questionType = "Vui lòng chọn loại câu hỏi";
      }

      if (!formData.landId || formData.landId <= 0) {
        errors.landId = "Vui lòng chọn danh mục";
      }

      if (!formData.kynhanSummaries || formData.kynhanSummaries.length === 0) {
        errors.kynhanSummaries = "Vui lòng chọn ít nhất một kỳ nhân";
      }

      if (!answers || answers.length === 0) {
        errors.answers = "Vui lòng nhập ít nhất một đáp án";
      } else {
        const emptyAnswers = answers.filter((answer) => !answer.trim());
        if (emptyAnswers.length > 0) {
          errors.answers = "Đáp án không được để trống";
        }
      }

      return errors;
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        // Convert options to answers array
        const answers = Object.values(options).filter(
          (answer) => answer.trim() !== ""
        );

        // Validate form
        const errors = validateForm(answers);
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          const firstError = Object.values(errors)[0];
          if (firstError) {
            toast.error(firstError);
          }
          return;
        }

        // Clear validation errors
        setValidationErrors({});

        // Create final data for API
        const finalData: ICreateQuestionRequest = {
          text: formData.text.trim(),
          questionType: "TEXT_INPUT",
          allowSimilarAnswers: formData.allowSimilarAnswers,
          landId: formData.landId,
          kynhanSummaries: formData.kynhanSummaries,
          answers: answers.map((answer) => answer.trim()),
        };

        const response = await questionService.createQuestion(finalData);

        if (response.statusCode === 201) {
          toast.success(response.message || "Tạo câu hỏi thành công!");
          onSubmit(finalData);
          resetForm();
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi tạo câu hỏi");
        }
      } catch (error: any) {
        console.error("Error creating question:", error);
        const errorMessage =
          error?.response?.data?.message || "Có lỗi xảy ra khi tạo câu hỏi";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, options, isSubmitting, validateForm, onSubmit, resetForm]
  );

  // Memoized callback for image error handling
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = "/placeholder-avatar.png";
    },
    []
  );

  // Memoized KyNhan selection components
  const KyNhanItem = useCallback(
    ({ kyNhan }: { kyNhan: IKyNhanSummary }) => {
      const isSelected = formData.kynhanSummaries.includes(kyNhan.id);

      return (
        <div
          className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-md h-48 overflow-hidden ${
            isSelected
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => handleToggleKyNhanSummary(kyNhan.id)}
        >
          {isSelected && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 z-10">
              <Check className="w-3 h-3" />
            </div>
          )}
          <div className="w-full h-full">
            <Image
              width={300}
              height={300}
              src={kyNhan.imgUrl}
              alt={kyNhan.summary}
              className="w-full h-full object-cover rounded-md"
              onError={handleImageError}
            />
          </div>
        </div>
      );
    },
    [formData.kynhanSummaries, handleToggleKyNhanSummary, handleImageError]
  );

  const SelectedKyNhanItem = useCallback(
    ({ kyNhan }: { kyNhan: IKyNhanSummary }) => (
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-md p-2">
        <img
          src={kyNhan.imgUrl}
          alt={kyNhan.summary}
          className="w-8 h-8 object-cover rounded-full"
          onError={handleImageError}
        />
        <span className="text-xs text-gray-700 truncate flex-1">
          {kyNhan.summary.substring(0, 30)}...
        </span>
        <button
          type="button"
          onClick={() => handleToggleKyNhanSummary(kyNhan.id)}
          className="text-red-500 hover:text-red-700 ml-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    ),
    [handleToggleKyNhanSummary, handleImageError]
  );

  return (
    <Card className="border-gray-300  ">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
          Thêm câu hỏi mới
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Tạo câu hỏi mới cho ngân hàng câu hỏi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category and Type Selection - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <Select
                value={formData.landId.toString()}
                onValueChange={handleLandChange}
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {lands?.map((land) => (
                    <SelectItem key={land.id} value={land.id.toString()}>
                      {land.name}
                    </SelectItem>
                  )) || []}
                </SelectContent>
              </Select>
              {validationErrors.landId && (
                <p className="text-sm text-red-600 mt-1">
                  {validationErrors.landId}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại
              </label>
              <Select
                value={formData.questionType}
                onValueChange={(value) =>
                  handleInputChange("questionType", value)
                }
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem key="TEXT_INPUT" value="TEXT_INPUT">
                    Tự Luận
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* KyNhan Summary Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn Kỳ Nhân
            </label>
            <div className="flex flex-col space-y-2">
              {/* Nút để mở modal */}
              <Dialog
                open={isKyNhanModalOpen}
                onOpenChange={setIsKyNhanModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 justify-start h-auto p-3 border-1 border-gray-300 rounded-md"
                  >
                    <Users className="w-4 h-4" />
                    <span>
                      {selectedKyNhanSummaries.length > 0
                        ? `Đã chọn ${selectedKyNhanSummaries.length} kỳ nhân`
                        : "Chọn kỳ nhân"}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle>Chọn Kỳ Nhân</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kyNhanSummary?.map((kyNhan) => (
                      <KyNhanItem key={kyNhan.id} kyNhan={kyNhan} />
                    )) || []}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsKyNhanModalOpen(false)}
                    >
                      Đóng
                    </Button>
                    <Button onClick={() => setIsKyNhanModalOpen(false)}>
                      Xong ({selectedKyNhanSummaries.length})
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Hiển thị các kỳ nhân đã chọn */}
              {selectedKyNhanSummaries.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {selectedKyNhanSummaries.map((kyNhan) => (
                    <SelectedKyNhanItem key={kyNhan.id} kyNhan={kyNhan} />
                  ))}
                </div>
              )}
              {validationErrors.kynhanSummaries && (
                <p className="text-sm text-red-600 mt-1">
                  {validationErrors.kynhanSummaries}
                </p>
              )}
            </div>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Câu hỏi
            </label>
            <Textarea
              placeholder="Nhập nội dung câu hỏi..."
              value={formData.text}
              onChange={(e) => handleQuestionChange(e.target.value)}
              className="w-full min-h-[120px] border-gray-300 rounded-md resize-none text-black"
            />
            {validationErrors.text && (
              <p className="text-sm text-red-600 mt-1">
                {validationErrors.text}
              </p>
            )}
          </div>

          {/* Allow Similar Answers Switch */}
          <div className="flex items-center justify-between p-4 border-gray-300 border-1 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cho phép nhiều lựa chọn
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Bật để thêm nhiều lựa chọn, tắt để chỉ có 1 ô nhập đáp án
              </p>
            </div>
            <Switch
              checked={formData.allowSimilarAnswers}
              onCheckedChange={handleAllowSimilarAnswersChange}
            />
          </div>

          {/* Options Section */}
          <div>
            {formData.allowSimilarAnswers && (
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Các lựa chọn
                </label>
                <Button
                  type="button"
                  onClick={addOption}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  Thêm lựa chọn
                </Button>
              </div>
            )}
            <div className="space-y-4">
              {formData.allowSimilarAnswers ? (
                // Hiển thị nhiều options với nút thêm/xóa
                sortedOptions.map(([key, value]) => (
                  <div key={key} className="flex items-end gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lựa chọn {key}
                      </label>
                      <Input
                        placeholder={`Nhập lựa chọn ${key}...`}
                        value={value}
                        onChange={(e) =>
                          handleOptionChange(key, e.target.value)
                        }
                        className="w-full border-gray-300 border-1 rounded-md"
                        color="black"
                      />
                    </div>
                    {Object.keys(options).length > MIN_OPTIONS_COUNT && (
                      <Button
                        type="button"
                        onClick={() => removeOption(key)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md mb-2"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                // Hiển thị chỉ 1 ô nhập đáp án
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đáp án
                  </label>
                  <Input
                    placeholder="Nhập đáp án..."
                    value={options.answer || ""}
                    onChange={(e) =>
                      handleOptionChange("answer", e.target.value)
                    }
                    className="w-full border-gray-300 border-1 rounded-md"
                    color="black"
                  />
                </div>
              )}
              {validationErrors.answers && (
                <p className="text-sm text-red-600">
                  {validationErrors.answers}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium"
            >
              {isSubmitting ? "Đang tạo..." : "Tạo câu hỏi"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddQuestionForm;
