"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface FormState {
  fromDate: string;
  toDate: string;
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
    fromDate: "",
    toDate: "",
    guests: 1,
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // Calculate total price
  useEffect(() => {
    if (form.fromDate && form.toDate && room?.price) {
      const from = new Date(form.fromDate);
      const to = new Date(form.toDate);
      const nights = Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
      setTotal(nights > 0 ? nights * room.price : 0);
    }
  }, [form, room]);

  // Handle input change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const from = updatedForm.fromDate ? new Date(updatedForm.fromDate) : null;
    const to = updatedForm.toDate ? new Date(updatedForm.toDate) : null;

    const newErrors: ErrorState = {};

    if (from && from < today) newErrors.fromDate = "Check-in cannot be in the past.";
    if (to && to < today) newErrors.toDate = "Check-out cannot be in the past.";
    if (from && to && from.getTime() === to.getTime()) newErrors.toDate = "Check-in and check-out cannot be the same.";
    if (from && to && to <= from) newErrors.toDate = "Check-out must be after check-in.";

    setErrors(newErrors);
  };

  // Check availability with backend
  const checkAvailability = async () => {
    try {
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

  // Handle booking submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return router.push("/login");

    // Validate availability before booking
    const available = await checkAvailability();
    if (!available) return;

    try {
      const res = await axios.post("/api/bookings", {
        roomId,
        userId: session.user.id,
        ...form,
        totalPrice: total,
        status: "pending",
      });

      router.push(`/payment?bookingId=${res.data._id}`);
    } catch (err) {
      console.error("Booking failed:", err);
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
        <div>
          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
        </div>

        <div>
          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
        </div>

        {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}

        <input
          type="number"
          name="guests"
          value={form.guests}
          onChange={handleChange}
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
