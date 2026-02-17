"use client";

import { useState } from "react";
import { Menu, X, User, CalendarCheck, LogOut } from "lucide-react";

import UserProfile from "@/components/User/Profile/UserProfile";
import MyBookings from "@/components/User/Profile/MyBookings";
import { signOut } from "next-auth/react";
import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"profile" | "bookings">("profile");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  const handleTabChange = (tab: "profile" | "bookings") => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      <Breadcrumb
        heading="My Profile"
        bgImage="/images/common/ms-enclave-41.webp"
        items={[{ label: "Your Profile", href: "/profile" }]}
      />
      <PatternSection />
      <section className="py-10">
        {/* ================= MOBILE HEADER ================= */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 text-black bg-transparent sticky top-0 z-40">
          <button
            onClick={() => setMobileOpen(true)}
            className="bg-blue-600 p-2 text-white rounded shadow "
          >
            <Menu size={30} />
          </button>
          <div />
        </div>

        <div className="mx-auto grid grid-cols-1 lg:grid-cols-10">
          {/* ================= DESKTOP SIDEBAR ================= */}
          <aside className="hidden ml-2 shadow-2xl lg:flex lg:col-span-2 px-6 py-10 flex-col justify-between">
            <ul className="space-y-3 font-dm">
              <li>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                  ${
                    activeTab === "profile"
                      ? "bg-yellow-100 text-black font-bold text-shadow-2xl shadow-lg"
                      : "bg-white text-black font-bold text-shadow-2xl shadow-lg hover:bg-yellow-100 hover:text-black hover:animate-bounce"
                  }`}
                >
                  <User size={20} />
                  My Profile
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition
                  ${
                    activeTab === "bookings"
                      ? "bg-yellow-100 text-black font-bold text-shadow-2xl shadow-lg"
                      : "bg-white text-black font-bold text-shadow-2xl shadow-lg hover:bg-yellow-100 hover:text-black hover:animate-bounce"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CalendarCheck size={20} />
                    My Bookings
                  </div>

                  {bookingCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {bookingCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>

            <button
              onClick={() => {
                signOut();
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-black  hover:animate-bounce hover:bg-yellow-100 font-dm font-semibold"
            >
              <LogOut size={20} />
              Logout
            </button>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="col-span-1 max-w-6xl md:col-span-8 px-4 md:px-6 py-6 h-[78vh] overflow-scroll">
            {activeTab === "profile" && <UserProfile />}
            {activeTab === "bookings" && (
              <MyBookings onCountChange={setBookingCount} />
            )}
          </main>
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
        {mobileOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <aside className="fixed top-0 left-0 h-full w-72 z-50 p-6 text-black flex flex-col justify-between animate-slideIn">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button onClick={() => setMobileOpen(false)}>
                    <X size={22} />
                  </button>
                </div>

                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => handleTabChange("profile")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                      ${
                        activeTab === "profile"
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <User size={18} />
                      Your Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => handleTabChange("bookings")}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium
                      ${
                        activeTab === "bookings"
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CalendarCheck size={18} />
                        Your Bookings
                      </div>

                      {bookingCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {bookingCount}
                        </span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  signOut();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-black  hover:animate-bounce hover:bg-yellow-100 font-dm font-semibold"
              >
                <LogOut size={20} />
                Logout
              </button>
            </aside>
          </>
        )}
      </section>
    </>
  );
}
