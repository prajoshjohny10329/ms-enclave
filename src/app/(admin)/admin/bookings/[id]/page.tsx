"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/admin/bookings/${id}`)
      .then((res) => setBooking(res.data))
      .catch(() => {
        alert("Failed to fetch booking");
        router.push("/admin/bookings");
      })
      .finally(() => setLoading(false));
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

  if (loading) {
    return <p className="text-center mt-10">Loading booking details...</p>;
  }

  if (!booking) {
    return <p className="text-center mt-10">Booking not found</p>;
  }

  const isUserBooking = Boolean(booking.userId);

  const customerName = isUserBooking
    ? booking.userId.name
    : booking.clientName;

  const customerEmail = isUserBooking
    ? booking.userId.email
    : "Admin Manual Booking";

  const customerPhone =
    booking.phone || booking.userId?.phone || "N/A";

  const statusColor =
    booking.status === "paid"
      ? "bg-green-100 text-green-700"
      : booking.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-black font-dm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Booking Details</h1>
        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
          {booking.status.toUpperCase()}
        </span>
      </div>

      {/* Package Card */}
      <div className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-6">
        <Image
          src={booking.package.image}
          alt={booking.package.packageName}
          width={500}
          height={350}
          className="rounded-lg object-cover"
        />

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            {booking.package.packageName}
          </h2>
          <p className="text-gray-500 text-sm">
            {booking.package.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toDateString()}</p>
            <p><strong>Nights:</strong> {booking.nights}</p>
            <p><strong>Rooms:</strong> {booking.roomsNeeded}</p>
            <p><strong>Adults:</strong> {booking.adults}</p>
            <p><strong>Children:</strong> {booking.children}</p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Customer Details</h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><strong>Name:</strong> {booking.user?.name}</p>
          <p><strong>Email:</strong> {booking.user?.email}</p>
          <p><strong>Phone:</strong> {booking.user?.phone}</p>
          {isUserBooking && (
            <>
              <p><strong>Nationality:</strong> {booking.user?.nationality}</p>
              <p><strong>Address:</strong> {booking.user?.address}</p>
            </>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Booking Type: {isUserBooking ? "User Booking" : "Admin Manual Booking"}
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">Payment Details</h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
          <p><strong>Payment Method:</strong> {booking.paymentMethod || "Online"}</p>
          <p><strong>razorpayOrderId:</strong> {booking.razorpayOrderId || ""}</p>
          <p><strong>razorpayPaymentId:</strong> {booking.razorpayPaymentId || ""}</p>
          <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Print Invoice
        </button>

        <button
          onClick={() => router.push(`/admin/bookings/${id}/invoice`)}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          View Invoice
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          {deleting ? "Deleting..." : "Delete Booking"}
        </button>
      </div>
    </div>
  );
}
