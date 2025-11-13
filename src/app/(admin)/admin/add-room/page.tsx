"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AddRoomPage() {
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    amenities: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Auto-upload when user selects image
  useEffect(() => {
    if (imageFile) handleImageUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", imageFile!);

    try {
      const res = await axios.post("/api/upload", formData);
      setImageUrl(res.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
      setMessage("❌ Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/rooms", {
        ...roomData,
        price: Number(roomData.price),
        maxGuests: Number(roomData.maxGuests),
        images: [imageUrl],
        amenities: roomData.amenities.split(","),
      });

      if (res.data.success) {
        setMessage("✅ Room added successfully!");
        setRoomData({
          name: "",
          description: "",
          price: "",
          maxGuests: "",
          amenities: "",
        });
        setImageFile(null);
        setImageUrl("");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add room.");
    }
  };

  // ✅ Enable submit only when all fields + image uploaded
  const isFormComplete =
    roomData.name &&
    roomData.description &&
    roomData.price &&
    roomData.maxGuests &&
    imageUrl;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
        Add New Room
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {/* Room Name */}
        <input
          name="name"
          value={roomData.name}
          onChange={handleChange}
          placeholder="Room Name"
          className="w-full p-2 border rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={roomData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />

        {/* Price */}
        <input
          name="price"
          type="number"
          value={roomData.price}
          onChange={handleChange}
          placeholder="Price per night"
          className="w-full p-2 border rounded"
          required
        />

        {/* Max Guests */}
        <input
          name="maxGuests"
          type="number"
          value={roomData.maxGuests}
          onChange={handleChange}
          placeholder="Maximum Guests"
          className="w-full p-2 border rounded"
          required
        />

        {/* Amenities */}
        <input
          name="amenities"
          value={roomData.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
          className="w-full p-2 border rounded"
        />

        {/* Image Upload */}
        <div className="border rounded p-3">
          <label className="block font-medium mb-2">Room Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border rounded p-2"
          />

          {/* Loader Animation */}
          {uploading && (
            <div className="flex items-center justify-center mt-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="ml-3 text-blue-600">Uploading...</p>
            </div>
          )}

          {/* Image Preview */}
          {imageUrl && !uploading && (
            <img
              src={imageUrl}
              alt="Uploaded room"
              className="mt-3 rounded-md shadow-md w-full"
            />
          )}
        </div>

        {/* Add Room Button */}
        <button
          type="submit"
          disabled={!isFormComplete || uploading}
          className={`w-full py-2 rounded transition ${
            isFormComplete && !uploading
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Add Room
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
