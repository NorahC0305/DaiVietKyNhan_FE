"use client";

import { useEffect, useState } from "react";
import godProfileService from "@services/god-profile";
import { IGodProfile } from "@models/god-profile/entity";

export type UseGodProfilePointHomeResult = {
  loading: boolean;
  error: string | null;
  data: IGodProfile[] | null;
};

export function useGodProfilePointHome(): UseGodProfilePointHomeResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IGodProfile[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const resp = await godProfileService.getPointHome();
        const success = (resp as any)?.statusCode === 200 || (resp as any)?.statusCode === 201;
        const payload = (resp as any)?.data;
        if (success && payload && isMounted) {
          // Normalize to array
          const list = Array.isArray(payload) ? payload : [payload];
          setData(list as IGodProfile[]);
        } else if (isMounted) {
          const msg = (resp as any)?.message;
          setError(typeof msg === "string" ? msg : "Không lấy được kết quả.");
        }
      } catch (e) {
        if (isMounted) setError("Không lấy được kết quả. Vui lòng thử lại.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return { loading, error, data };
}


