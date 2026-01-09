"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function AdminBookingInvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/admin/bookings/${id}`);
        setBooking(res.data);
      console.log(res.data);

      } catch (err) {
        console.error(err);
        alert("Failed to load invoice");
        router.push("/admin/bookings");
      } finally {
        setLoading(false);
      }
      
    };

    fetchBooking();
  }, [id, router]);

  if (loading) return <p className="text-center mt-10">Loading invoice...</p>;
  if (!booking) return <p className="text-center mt-10">Invoice not found.</p>;

  const totalGuests = booking.adults + booking.children;

  return (
    <div className="invoice-page bg-gray-100 min-h-screen py-10 font-dm">
      <div
        id="invoice-print"
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow text-black"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Booking Invoice</h1>
            <p className="text-sm text-gray-500">
              Invoice ID: #{booking._id}
            </p>
            <p className="text-sm text-gray-500">
              Date: {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Image
            src="/ms-heritage-resort-palakkad-logo1.PNG"
            alt="M.S. Enclave Heritage Resort  Palakkad Resort Logo"
            width={120}
            height={60}
          />
        </div>

        {/* Customer */}
        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Customer Details</h2>
          <p><strong>Name:</strong> {booking.user?.name || booking.clientName}</p>
          <p><strong>Email:</strong> {booking.user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Nationality:</strong> {booking.user?.nationality || "N/A"}</p>
        </section>

        {/* Room */}
        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Booking Details</h2>

          <div className="flex gap-4">

            <div>
              <p><strong>Package:</strong> {booking.package?.packageName}</p>
              <p><strong>Price:</strong> {booking.package?.indianPrice}/Night + GST(18%)</p>
              <p>
                <strong>Stay:</strong>{" "}
                {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
              <p><strong>Rooms:</strong> {booking.roomsNeeded}</p>
              <p><strong>Guests:</strong> {totalGuests}</p>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Payment Summary</h2>
          <div className="border rounded-lg p-4">
            <p><strong>Total Amount:</strong> ₹{booking.totalPrice}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  booking.status === "paid"
                    ? "text-green-600"
                    : booking.status === "pending"
                    ? "text-orange-500"
                    : "text-red-500"
                }`}
              >
                {booking.status.toUpperCase()}
              </span>
            </p>
            <p><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</p>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t pt-4 text-center text-sm text-gray-500">
          Thank you for choosing our resort 🌿
        </div>

        {/* Print */}
        <div className="mt-6 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
