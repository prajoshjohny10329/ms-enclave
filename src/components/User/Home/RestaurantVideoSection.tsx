"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function RestaurantVideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Background Section */}
      <section
        className="relative h-[90vh] w-full bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/home/ms-slider-1.webp')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm tracking-widest text-white uppercase mb-3">
            Welcome to M.S. Enclave
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Experience the Soul of Our Heritage Stay
          </h2>

          <p className="mt-4 text-gray-200 text-base md:text-lg">
            Step inside our world of warm hospitality, peaceful surroundings,
            and unforgettable comfort.
          </p>

          {/* Play Button */}
          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center justify-center bg-white p-6 rounded-full shadow-xl hover:scale-110 transition-transform"
          >
            <Play size={42} className="text-blue-900" />
          </button>
        </div>
      </section>

      {/* Video Popup */}
      {open && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/V-9kJAyMFco?autoplay=1"
              title="M.S. Enclave Experience"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
