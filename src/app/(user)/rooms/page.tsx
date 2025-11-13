"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  maxGuests: number;
  amenities: string[];
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await axios.get("/api/rooms");
        if (res.data.success) {
          setRooms(res.data.rooms);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading rooms...</p>;
  }

  if (rooms.length === 0) {
    return <p className="text-center mt-20 text-gray-500">No rooms available yet.</p>;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Our Rooms
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {room.images?.[0] && (
              <Image
                src={room.images[0]}
                alt={room.name}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {room.name}
              </h2>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {room.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-700 font-bold">
                  ₹{room.price.toLocaleString()}/night
                </span>
                <Link
                  href={`/book/${room._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
