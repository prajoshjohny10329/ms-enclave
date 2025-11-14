"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function AdminBookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/admin/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch booking");
        router.push("/admin/bookings");
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
      await axios.delete(`/api/admin/bookings/${id}`);
      alert("Booking deleted successfully");
      router.push("/admin/bookings");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10">Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-xl text-black">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>

      {/* Room Details */}
      <section className="mb-4">
        <h2 className="font-semibold text-lg">Room Details</h2>
        <Image
          src={booking.room?.images?.[0] || "/default-room.jpg"}
          alt={booking.room?.name || "Room"}
          width={600}
          height={400}
          className="rounded-lg mt-2"
        />
        <p className="mt-2"><strong>Name:</strong> {booking.room?.name}</p>
        <p><strong>Price per night:</strong> ₹{booking.room?.price}</p>
      </section>

      {/* User Details */}
      <section className="mb-4">
        <h2 className="font-semibold text-lg">User Details</h2>
        <p><strong>Name:</strong> {booking.user?.name}</p>
        <p><strong>Email:</strong> {booking.user?.email}</p>
        <p><strong>Phone:</strong> {booking.user?.phone || "Not provided"}</p>
        <p><strong>Nationality:</strong> {booking.user?.nationality || "Not provided"}</p>
      </section>

      {/* Booking Info */}
      <section className="mb-4">
        <h2 className="font-semibold text-lg">Booking Info</h2>
        <p><strong>From:</strong> {new Date(booking.fromDate).toLocaleDateString()}</p>
        <p><strong>To:</strong> {new Date(booking.toDate).toLocaleDateString()}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
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
        <p><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</p>
        {booking.paymentMethod === "razorpay" && (
          <>
            <p><strong>Razorpay Payment ID:</strong> {booking.razorpayPaymentId}</p>
            <p><strong>Razorpay Order ID:</strong> {booking.razorpayOrderId}</p>
          </>
        )}
        {booking.paymentMethod === "stripe" && (
          <>
            <p><strong>Stripe Payment ID:</strong> {booking.stripePaymentId}</p>
            <p><strong>Stripe Session ID:</strong> {booking.stripeSessionId}</p>
          </>
        )}
      </section>

      {/* Actions */}
      <section className="mb-4">
        <h2 className="font-semibold text-lg">Actions</h2>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Booking"}
        </button>
      </section>
    </div>
  );
}
