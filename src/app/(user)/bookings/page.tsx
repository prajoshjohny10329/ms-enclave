"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
        const userId = session.user.id
      axios
        .get(`/api/bookings/user/${userId}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Failed to load bookings:", err))
        .finally(() => setLoading(false));
    }
  }, [status, session]);

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (bookings.length === 0)
    return <p className="text-center mt-10">No bookings yet.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 text-black">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-4 border rounded-xl shadow-sm bg-white flex gap-4 items-center"
          >
            <Image
              src={booking.roomId?.images?.[0] || "/default-room.jpg"}
              alt={booking.roomId?.name || "Room"}
              width={120}
              height={80}
              className="rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {booking.roomId?.name || "Room"}
              </h2>
              <p>
                {new Date(booking.fromDate).toLocaleDateString()} →{" "}
                {new Date(booking.toDate).toLocaleDateString()}
              </p>
              <p>Guests: {booking.guests}</p>
              <p className="font-semibold">Total: ₹{booking.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
