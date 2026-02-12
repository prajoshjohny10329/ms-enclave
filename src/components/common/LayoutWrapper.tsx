"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { AdminHeader } from "./AdminHeader";
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
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-right" />

      {isAdmin ? <AdminHeader /> : <Header />}
      <SplashCursor />
      <WhatsAppFixed />

      {children}

      <Footer />
    </>
  );
}