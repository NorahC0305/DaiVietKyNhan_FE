"use client";

import React from "react";
import { Button } from "@/components/Atoms/ui/button";

const CommunitySupport = () => {
  return (
    <div className="rounded-xl bg-gray-200/25 p-5 sm:p-6 border border-white/10 text-white">
      <h2 className="text-xl sm:text-2xl font-semibold">Hỗ trợ cộng đồng</h2>
      <p className="mt-2 text-sm text-gray-200">
        Tham gia cộng đồng của chúng tôi để được hỗ trợ và thảo luận nhanh hơn
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium w-80 mx-auto">
          <a href="#">
            Nhóm Facebook <span>→</span>
          </a>
        </Button>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium w-80 mx-auto">
          <a href="#">
            Discord DVKN <span>→</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CommunitySupport;
