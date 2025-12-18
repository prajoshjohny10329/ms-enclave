"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { AdminHeader } from "./AdminHeader";
import { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {loading && <Preloader />}

      {!loading && (
        <>
          {isAdmin ? <AdminHeader /> : <Header />}
          {children}
        </>
      )}
    </>
  );
}
