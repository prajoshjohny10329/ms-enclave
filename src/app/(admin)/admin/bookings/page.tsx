"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/admin/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (bookings.length === 0)
    return <p className="text-center mt-10">No bookings found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 text-black">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-4 border rounded-xl shadow-sm bg-white flex gap-4"
          >
            <Image
              src={booking.packageId?.image || "/default-room.jpg"}
              alt={booking.packageId?.packageName || "Room"}
              width={120}
              height={80}
              className="rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {booking.packageId?.packageName || "Room"}
              </h2>
              <p>
                {new Date(booking.fromDate).toLocaleDateString()} →{" "}
                {new Date(booking.toDate).toLocaleDateString()}
              </p>
              <p>Guests: {booking.guests}</p>
              <p>Total: ₹{booking.totalPrice}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-orange-500"
                      : booking.status === "paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </p>
              <p>
                User: {booking.userId?.name || booking.userId} | Email:{" "}
                {booking.userId?.email}
              </p>
              <p>
                Payment Method:{" "}
                {booking.razorpayPaymentId
                  ? "Razorpay"
                  : booking.stripeSessionId
                  ? "Stripe"
                  : "N/A"}
              </p>
              <Link
                href={`/admin/bookings/${booking._id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
