"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { AdminHeader } from "./AdminHeader";
import { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import SplashCursor from "./SplashCursor";
import WhatsAppFixed from "./WhatsAppFixed";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // 🔄 Page loader
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // ⬅️ better UX than 3s

    return () => clearTimeout(timer);
  }, [pathname]); // ⬅️ runs on route change

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* 🔥 TOAST CONTAINER (GLOBAL) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
          },
        }}
      />

      {loading && <Preloader />}

      {!loading && (
        <>
          {isAdmin ? <AdminHeader /> : <Header />}
          <SplashCursor />
          <WhatsAppFixed />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
