"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";

export default function FirstVisitLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasVisited = sessionStorage.getItem("visited");

    if (!hasVisited) {
      setShowLoader(true);

      const timer = setTimeout(() => {
        sessionStorage.setItem("visited", "true");
        setShowLoader(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {showLoader && <Preloader />}
      {!showLoader && children}
    </>
  );
}