"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";

interface SummaryCardsProps {
  totalQuestions: number;
  activeQuestions: number;
  draftQuestions: number;
  averageCorrectRate: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalQuestions,
  activeQuestions,
  draftQuestions,
  averageCorrectRate,
}) => {
  const cards = [
    {
      title: "Tổng câu hỏi",
      value: totalQuestions,
      icon: "📊",
    },
    {
      title: "Đang hoạt động",
      value: activeQuestions,
      icon: "✅",
    },
    {
      title: "Bản nháp",
      value: draftQuestions,
      icon: "📝",
    },
    {
      title: "Tỷ lệ đúng TB",
      value: `${averageCorrectRate}%`,
      icon: "📈",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="bg-admin-primary shadow-sm border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <span className="text-2xl">{card.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
