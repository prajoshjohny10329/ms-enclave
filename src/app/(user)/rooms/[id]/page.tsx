"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RoomDetails({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookNow = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={`https://res.cloudinary.com/your-cloud/image/upload/sample.jpg`}
        alt="room"
        className="w-full h-96 object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Deluxe Room</h1>
      <p className="text-gray-600 mb-4">
        Enjoy your stay in our luxury resort with modern amenities.
      </p>
      <button
        onClick={handleBookNow}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Book Now
      </button>
    </div>
  );
}
