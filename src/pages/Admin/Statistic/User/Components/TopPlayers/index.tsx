import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Atoms/ui/card";
import { Badge } from "@/components/Atoms/ui/badge";

const players = [
  { name: "Phạm Thị D", plays: 45, rate: "92%", score: 920 },
  { name: "Nguyễn Văn A", plays: 38, rate: "89%", score: 850 },
  { name: "Trần Thị B", plays: 32, rate: "85%", score: 720 },
  { name: "Lê Văn C", plays: 28, rate: "78%", score: 650 },
];

const TopPlayers = () => {
  return (
    <Card className="border-gray-300">
      <CardHeader>
        <CardTitle className="text-base">Top người chơi</CardTitle>
        <CardDescription>
          Bảng xếp hạng người chơi xuất sắc nhất
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {players?.map((p, idx) => (
          <div
            key={p.name}
            className="flex items-center justify-between gap-4 rounded-lg border border-gray-300 p-3"
          >
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="h-6 w-6 items-center justify-center p-0 text-center bg-orange-100 text-admin-primary"
              >
                {idx + 1}
              </Badge>
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.plays} trò chơi · Tỷ lệ thắng {p.rate}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-md font-semibold">{p.score}</div>
              <div className="text-xs text-muted-foreground">điểm</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopPlayers;
