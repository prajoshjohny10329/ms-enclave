"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";

const STATUS_TABS = ["all", "paid", "pending", "cancelled"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get("/api/admin/bookings");
      setBookings(res.data);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  // ================= FILTER LOGIC =================
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const userName =
        b.userId?.name || b.clientName || "";
      const phone =
        b.phone || b.userId?.phone || "";

      const matchSearch =
        userName.toLowerCase().includes(search.toLowerCase()) ||
        phone.includes(search);

      const matchStatus =
        status === "all" ? true : b.status === status;

      const bookingDate = new Date(b.createdAt).getTime();
      const matchFrom =
        !fromDate || bookingDate >= new Date(fromDate).getTime();
      const matchTo =
        !toDate || bookingDate <= new Date(toDate).getTime();

      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [bookings, search, status, fromDate, toDate]);

  // ================= STATUS UPDATE =================
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`/api/admin/bookings/${id}/status`, {
        status: newStatus,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="p-10">Loading…</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid md:grid-cols-4 gap-4">
        <input
          placeholder="Search name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={() => {
            setSearch("");
            setFromDate("");
            setToDate("");
            setStatus("all");
          }}
          className="bg-gray-100 rounded px-3 py-2"
        >
          Clear Filters
        </button>
      </div>

      {/* ================= STATUS TABS ================= */}
      <div className="flex gap-3 mb-4">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatus(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              status === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Package</th>
              <th className="p-3">Guest</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr
                key={b._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {b.packageId?.packageName}
                </td>

                <td className="p-3">
                  <p>{b.userId?.name || b.clientName || "Guest"}</p>
                  <p className="text-xs text-gray-500">{b.phone}</p>
                </td>

                <td className="p-3">
                  {new Date(b.checkInDate).toLocaleDateString()} →{" "}
                  {new Date(b.checkOutDate).toLocaleDateString()}
                </td>

                <td className="p-3 font-semibold">
                  ₹{b.totalPrice}
                </td>

                {/* STATUS BADGE */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      b.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : b.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                </td>

                <td className="p-3">
                  {b.paymentMethod ||
                    (b.razorpayPaymentId
                      ? "Razorpay"
                      : "N/A")}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      updateStatus(b._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <Link
                    href={`/admin/bookings/${b._id}`}
                    className="text-blue-600 text-xs underline"
                  >
                    View
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No bookings found
          </p>
        )}
      </div>
    </div>
  );
}
