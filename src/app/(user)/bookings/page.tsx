"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);

  // Fetch user bookings
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const userId = session.user.id;
      axios
        .get(`/api/bookings/user/${userId}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Failed to load bookings:", err))
        .finally(() => setLoading(false));
    }
  }, []);

  // Handle payment for a booking
  const handlePayment = async (booking: any) => {
    if (!session?.user) return;
    setLoadingPayment(booking._id);

    try {
      const nationality = session.user.nationality?.toLowerCase();
      if (nationality === "indian") {
        // Razorpay flow
        const res = await axios.post("/api/payments/razorpay", {
          amount: booking.totalPrice,
          currency: "INR",
          bookingId: booking._id,
          user: {
            name: session.user.name,
            email: session.user.email,
            contact: session.user.phone || "",
          },
        });

        const order = res.data;

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Your Hotel Name",
          description: `Booking #${booking._id}`,
          order_id: order.id,
          prefill: {
            name: session.user.name,
            email: session.user.email,
            contact: session.user.phone || "",
          },
          handler: async function (response: any) {
            // Confirm payment backend
            await axios.post("/api/bookings/confirm-payment", {
              bookingId: booking._id,
              paymentMethod: "razorpay",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert("Payment successful!");
            router.refresh(); // refresh to update status
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Stripe flow
        const res = await axios.post("/api/payments/stripe", {
          amount: booking.totalPrice,
          currency: "USD",
          bookingId: booking._id,
        });

        if (res.data.url) window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment could not be initiated. Please try again.");
    } finally {
      setLoadingPayment(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (bookings.length === 0) return <p className="text-center mt-10">No bookings yet.</p>;

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
              <p className="mt-1">
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

              {booking.status === "pending" && (
                <button
                  onClick={() => handlePayment(booking)}
                  disabled={loadingPayment === booking._id}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingPayment === booking._id ? "Processing..." : "Pay Now"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
