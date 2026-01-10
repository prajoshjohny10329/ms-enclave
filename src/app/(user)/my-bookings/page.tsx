"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import toast from "react-hot-toast";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);

  const [view, setView] = useState<"card" | "list">("card");

  /* Load view preference */
  useEffect(() => {
    const savedView = localStorage.getItem("bookingView");
    if (savedView === "list" || savedView === "card") {
      setView(savedView);
    }
  }, []);

  /* Save view preference */
  useEffect(() => {
    localStorage.setItem("bookingView", view);
  }, [view]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      axios
        .get(`/api/bookings/user/${session.user.id}`)
        .then((res) => setBookings(res.data))
        .finally(() => setLoading(false));
    }
  }, [status, session?.user?.id]);

  // Handle payment for a booking
  const handlePayment = async (booking: any) => {
    if (!session?.user) return;
    setLoadingPayment(booking._id);

    try {
      const nationality = session.user.nationality;
      if (nationality) {
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
          name: "MS Enclave Resort Palakkad",
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
            setShowConfetti(true)
            toast.success("Payment successful!");
            setTimeout(() => {
              setShowConfetti(false)
            }, 4000);
            router.refresh(); // refresh to update status
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        router.push("/my-bookings");
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
      toast.error("Payment could not be initiated. Please try again.");
    } finally {
      setLoadingPayment(null);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading…</p>;

  if (bookings.length === 0)
    return <p className="text-center mt-20 text-gray-500">No bookings found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      {/* 🎉 CONFETTI */}
               {showConfetti && (
              <ConfettiOverlay show={showConfetti} />
            )}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded-md ${
              view === "card"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md ${
              view === "list"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {view === "card" ? (
        /* ---------------- CARD VIEW ---------------- */
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={booking.packageId?.image || "/default-room.jpg"}
                  alt="Room"
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                    booking.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "pending"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h2 className="font-semibold text-lg">
                  {booking.packageId?.packageName}
                </h2>

                <p className="text-sm text-gray-600">
                  {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600">
                  Guests: {booking.adults + booking.children}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <p className="text-lg font-bold">₹{booking.totalPrice}</p>

                  <div className="flex gap-2">
                    {booking.status === "pending" && (
                      <button
                        onClick={() => handlePayment(booking)}
                        disabled={loadingPayment === booking._id}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg"
                      >
                        Pay Now
                      </button>
                    )}

                    <button
                      onClick={() =>
                        router.push(`/my-bookings/${booking._id}`)
                      }
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ---------------- LIST VIEW ---------------- */
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-gray-50 text-sm font-semibold">
            <div className="col-span-4">Room</div>
            <div className="col-span-3">Dates</div>
            <div className="col-span-2">Guests</div>
            <div className="col-span-1">Total</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 border-t items-center hover:bg-gray-50"
            >
              <div className="col-span-4 flex gap-3 items-center">
                <Image
                  src={booking.packageId?.image || "/default-room.jpg"}
                  alt="Room"
                  width={60}
                  height={45}
                  className="rounded-md"
                />
                <div>
                  <p className="font-semibold">
                    {booking.packageId?.packageName}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                      booking.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="col-span-3 text-sm text-gray-600">
                {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </div>

              <div className="col-span-2 text-sm text-gray-600">
                {booking.adults + booking.children}
              </div>

              <div className="col-span-1 font-semibold">
                ₹{booking.totalPrice}
              </div>

              <div className="col-span-2 flex gap-2 justify-start md:justify-end">
                {booking.status === "pending" && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md"
                  >
                    Pay
                  </button>
                )}

                <button
                  onClick={() => router.push(`/my-bookings/${booking._id}`)}
                  className="px-3 py-1.5 border text-sm rounded-md"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
