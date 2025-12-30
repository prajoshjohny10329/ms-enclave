"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AdminBookingPage() {
    const { data: session, status } = useSession();
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);


  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/admin/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch booking");
        router.push("/my-bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/bookings/${id}`);
      alert("Booking deleted successfully");
      router.push("/admin/bookings");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  };

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
              alert("Payment successful!");
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
        console.error("Payment failed:", err);
        alert("Payment could not be initiated. Please try again.");
      } finally {
        setLoadingPayment(null);
      }
    };

  if (loading) return <p className="text-center mt-10">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10">Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-xl text-black">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>

      {/* Room Details */}
      <section className="mb-4 capitalize">
        <h2 className="font-semibold text-lg">Room Details</h2>
        <Image
          src={booking.package?.image || "/default-room.jpg"}
          alt={booking.package?.packageName || "Room"}
          width={600}
          height={400}
          className="rounded-lg mt-2"
        />
        <p className="mt-2"><strong>Name:</strong> {booking.package?.packageName}</p>
        <p><strong>Price per night:</strong> ₹{booking.package?.indianPrice}+GST</p>
      </section>

      {/* User Details */}
      <section className="mb-4 capitalize">
        <h2 className="font-semibold text-lg">User Details</h2>
        <p><strong>Name:</strong> {booking.user?.name}</p>
        <p><strong>Email:</strong> {booking.user?.email}</p>
        <p><strong>Phone:</strong> {booking.user?.phone || "Not provided"}</p>
        <p><strong>Nationality:</strong> {booking.user?.nationality || "Not provided"}</p>
      </section>

      {/* Booking Info */}
      <section className="mb-4">
        <h2 className="font-semibold text-lg">Booking Info</h2>
        <p><strong>From:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p><strong>To:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <p><strong>Night:</strong> {(booking.nights)}</p>
        <p><strong>Guests:</strong> {booking.adults+booking.children}</p>
        <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold ${
            booking.status === "pending" ? "text-orange-500" :
            booking.status === "paid" ? "text-green-500" :
            "text-red-500"
          }`}>
            {booking.status.toUpperCase()}
          </span>
        </p>
        <p className="capitalize"><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</p>
        
      </section>

      {/* Actions */}
      <section className="mb-4">
        <h2 className="font-semibold text-lg">Actions</h2>
        {booking.status === "pending" && (
                <button
                  onClick={() => handlePayment(booking)}
                  disabled={loadingPayment === booking._id}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingPayment === booking._id ? "Processing..." : "Pay Now"}
                </button>
              )}
        {/* <button
          onClick={handleDelete}
          disabled={deleting}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Booking"}
        </button> */}
      </section>
    </div>
  );
}
