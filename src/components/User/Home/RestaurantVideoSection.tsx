"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function RestaurantVideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Background Section */}
      <section
        className="relative h-[60vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/home/ms-slider.jpeg')" }} // <-- change image
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Play Button */}
        <button
          onClick={() => setOpen(true)}
          className="relative z-10 bg-white p-6 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Play size={40} className="text-red-600" />
        </button>
      </section>

      {/* Video Popup */}
      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src="https://youtu.be/V-9kJAyMFco?si=W4Y300dmXbG-dxXZ" // <-- change video
              title="Restaurant Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
