"use client"

import { useEffect, useState } from "react"

export const useLandscapeMobile = () => {
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false)

  useEffect(() => {
    const checkLandscape = () => {
      const isLandscape = window.innerHeight < window.innerWidth
      const isMobile = window.innerWidth < 1024 // lg breakpoint
      setIsLandscapeMobile(isLandscape && isMobile)
    }

    checkLandscape()
    window.addEventListener("resize", checkLandscape)
    return () => window.removeEventListener("resize", checkLandscape)
  }, [])

  return isLandscapeMobile
}
