"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormState {
  fromDate: Date | null;
  toDate: Date | null;
  guests: number;
}

interface ErrorState {
  fromDate?: string;
  toDate?: string;
  availability?: string;
}

export default function BookRoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { roomId } = useParams();

  const [room, setRoom] = useState<any>(null);
  const [form, setForm] = useState<FormState>({
    fromDate: null,
    toDate: null,
    guests: 1,
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  // Load Razorpay script dynamically
  useEffect(() => {
    if (!(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Fetch room details
  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/rooms/${roomId}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // Fetch booked dates
  useEffect(() => {
    if (!roomId) return;

    const fetchBookedDates = async () => {
      try {
        const res = await axios.get(`/api/bookings/room/${roomId}`);
        const dates: Date[] = res.data.map((d: string) => new Date(d));
        setBookedDates(dates);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookedDates();
  }, [roomId]);

  // Calculate total price
  useEffect(() => {
    if (form.fromDate && form.toDate && room?.price) {
      const nights = Math.ceil(
        (form.toDate.getTime() - form.fromDate.getTime()) / (1000 * 3600 * 24)
      );
      setTotal(nights > 0 ? nights * room.price : 0);
    }
  }, [form, room]);

  // Helper: check if a day is booked
  const isBooked = (date: Date) => {
    return bookedDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  };

  // Validate form
  const validateForm = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newErrors: ErrorState = {};
    const { fromDate, toDate } = form;

    if (!fromDate) newErrors.fromDate = "Please select check-in date.";
    if (!toDate) newErrors.toDate = "Please select check-out date.";
    if (fromDate && fromDate < today) newErrors.fromDate = "Check-in cannot be in the past.";
    if (toDate && toDate < today) newErrors.toDate = "Check-out cannot be in the past.";
    if (fromDate && toDate && fromDate.getTime() === toDate.getTime())
      newErrors.toDate = "Check-in and check-out cannot be the same.";
    if (fromDate && toDate && toDate <= fromDate) newErrors.toDate = "Check-out must be after check-in.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check availability
  const checkAvailability = async (): Promise<boolean> => {
    try {
      if (!form.fromDate || !form.toDate) return false;
      const res = await axios.post("/api/bookings/check-availability", {
        roomId,
        fromDate: form.fromDate,
        toDate: form.toDate,
      });
      if (!res.data.available) {
        setErrors((prev) => ({ ...prev, availability: res.data.message }));
        return false;
      }
      setErrors((prev) => ({ ...prev, availability: "" }));
      return true;
    } catch (err) {
      console.error("Availability check failed:", err);
      setErrors((prev) => ({ ...prev, availability: "Could not check availability." }));
      return false;
    }
  };

  // Razorpay payment function
  const handleRazorpayPayment = async (booking: any) => {
    try {
      const res = await axios.post("/api/payments/razorpay", {
        amount: booking.totalPrice,
        currency: "INR",
        bookingId: booking._id,
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: session?.user?.phone,
        },
      });

      const order = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Your Hotel Name",
        description: `Booking #${booking._id}`,
        order_id: order.id,
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: session?.user?.phone || "",
        },
        handler: async function (response: any) {
          // Confirm payment
          await axios.post("/api/bookings/confirm-payment", {
              bookingId: booking._id,
              paymentMethod: "razorpay",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
          alert("Payment successful!");
          router.push("/bookings"); // redirect to bookings page
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment.");
    }
  };

  // tripe payment function
  const handleStripePayment = async (booking: any) => {
  try {
    const res = await axios.post("/api/payments/stripe", {
      amount: booking.totalPrice,
      currency: "USD",
      bookingId: booking._id,
    });

    if (res.data.url) {
      window.location.href = res.data.url; // redirect to Stripe checkout
    }
  } catch (err) {
    console.error("Stripe payment failed:", err);
    alert("Failed to initiate Stripe payment");
  }
  };

  // Handle booking submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return router.push("/login");

    if (!validateForm()) return;

    const available = await checkAvailability();
    if (!available) return;

    try {
      const res = await axios.post("/api/bookings", {
        roomId,
        userId: session.user.id,
        fromDate: form.fromDate,
        toDate: form.toDate,
        guests: form.guests,
        totalPrice: total,
        status: "pending",
      });

      const booking = res.data;

      // Decide payment method
      if (session.user.nationality?.toLowerCase() === "indian") {
        await handleRazorpayPayment(booking);
      } else {
        // Stripe logic
        await handleStripePayment(booking);
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading room details...</p>;
  if (!room) return <p className="text-center mt-10">Room not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl text-black mt-10">
      <h1 className="text-2xl font-semibold mb-4">Book {room.name}</h1>

      <div className="mb-4">
        <Image
          src={room.images?.[0] || "/default-room.jpg"}
          alt={room.name}
          width={600}
          height={400}
          className="rounded-xl"
        />
        <p className="mt-2 text-gray-700">{room.description}</p>
        <p className="mt-1 font-medium">Price per night: ₹{room.price}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DatePicker
          selected={form.fromDate}
          onChange={(date) => setForm({ ...form, fromDate: date })}
          minDate={new Date()}
          excludeDates={bookedDates}
          placeholderText="Select check-in"
          className="border p-2 rounded w-full"
          dayClassName={(date) => (isBooked(date) ? "bg-red-200 text-red-800" : "")}
        />
        {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}

        <DatePicker
          selected={form.toDate}
          onChange={(date) => setForm({ ...form, toDate: date })}
          minDate={form.fromDate || new Date()}
          excludeDates={bookedDates}
          placeholderText="Select check-out"
          className="border p-2 rounded w-full"
          dayClassName={(date) => (isBooked(date) ? "bg-red-200 text-red-800" : "")}
        />
        {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}

        {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}

        <input
          type="number"
          name="guests"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
          min={1}
          max={room.maxGuests}
          required
          className="border p-2 rounded"
        />

        <div className="text-lg font-semibold">Total Price: ₹{total || 0}</div>

        <div className="bg-gray-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Your Details</h2>
          <p><strong>Name:</strong> {session?.user?.name}</p>
          <p><strong>Email:</strong> {session?.user?.email}</p>
          <p><strong>Phone:</strong> {session?.user?.phone || "Not provided"}</p>
          <p><strong>Nationality:</strong> {session?.user?.nationality || "Not provided"}</p>
        </div>

        <button
          type="submit"
          disabled={!total || !!errors.fromDate || !!errors.toDate || !!errors.availability}
          className={`p-2 rounded mt-4 text-white ${
            !total || !!errors.fromDate || !!errors.toDate || !!errors.availability
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
