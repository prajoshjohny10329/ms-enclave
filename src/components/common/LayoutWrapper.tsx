"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { AdminHeader } from "./AdminHeader";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import SplashCursor from "./SplashCursor";
import WhatsAppFixed from "./WhatsAppFixed";
import PatternSection from "./PatternSection";
import SmoothScroll from "./SmoothScroll";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="theme-bg">
      {/* <SmoothScroll /> */}
      {isAdmin ? <AdminHeader /> : <Header />}
      <Toaster position="top-right" />
      <SplashCursor />
      <WhatsAppFixed />
      {children}
      <PatternSection />
      <Footer />
    </div>
  );
}