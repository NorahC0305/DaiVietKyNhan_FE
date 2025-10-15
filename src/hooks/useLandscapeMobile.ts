import { useEffect, useState } from "react";

export const useLandscapeMobile = () => {
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  useEffect(() => {
    const detect = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const landscape = w > h;
      setIsLandscapeMobile(landscape && h <= 480);
    };
    detect();
    window.addEventListener("resize", detect);
    window.addEventListener("orientationchange", detect as any);
    return () => {
      window.removeEventListener("resize", detect);
      window.removeEventListener("orientationchange", detect as any);
    };
  }, []);
  return isLandscapeMobile;
};


