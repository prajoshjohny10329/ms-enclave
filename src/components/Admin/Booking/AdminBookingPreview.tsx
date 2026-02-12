"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Link from "next/link";

export default function AdminBookingPreview() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


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

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-6 shadow-lg text-black font-dm rounded-2xl bg-white">
      <div className="flex justify-between">

        <h1 className="text-2xl font-bold mb-6">Bookings</h1>
        <Link href={'/admin/bookings/'}
         className="bg-red-700 text-white px-7 py-2 rounded-md text-sm h-8 hover:bg-red-600" >View All</Link>
      </div>


      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-red-700 text-white">
            <tr>
              <th className="p-3">Guest</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
  {filteredBookings.map((b) => (
    <tr
      key={b._id}
      onClick={() => router.push(`/admin/bookings/${b._id}`)}
      className="border-t hover:bg-red-700/10 text-center capitalize cursor-pointer transition"
    >
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
