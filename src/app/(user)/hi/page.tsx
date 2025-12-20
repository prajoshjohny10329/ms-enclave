"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const amenities = [
  {
    id: 1,
    title: "Fully Furnished Rooms",
    description:
      "Spacious, air-conditioned rooms designed with comfort and elegance, offering a relaxing stay.",
    image: "/images/common/ms-enclave-24.webp",
    thumbs: [
      "/images/common/ms-enclave-24.webp",
      "/images/common/ms-enclave-25.webp",
      "/images/common/ms-enclave-26.webp",
      "/images/common/ms-enclave-27.webp",
    ],
  },
  {
    id: 2,
    title: "Swimming Pool",
    description:
      "Enjoy a refreshing swim surrounded by greenery in our well-maintained pool.",
    image: "/images/common/ms-enclave-17.webp",
    thumbs: [
      "/images/common/ms-enclave-17.webp",
      "/images/common/ms-enclave-18.webp",
      "/images/common/ms-enclave-19.webp",
      "/images/common/ms-enclave-20.webp",
    ],
  },
  {
    id: 3,
    title: "Traditional Dining",
    description:
      "Experience authentic Kerala cuisine served in a peaceful heritage setting.",
    image: "/images/common/ms-enclave-13.webp",
    thumbs: [
      "/images/common/ms-enclave-13.webp",
      "/images/common/ms-enclave-14.webp",
      "/images/common/ms-enclave-15.webp",
      "/images/common/ms-enclave-16.webp",
    ],
  },
];

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeAmenity = amenities[activeIndex];

  /* Auto slide */
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % amenities.length);
    }, 7000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isPaused]);

  /* Pause when user interacts */
  const handleUserSelect = (index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
  };

  return (
    <section className="py-28 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="px-6 lg:px-24 flex flex-col justify-center space-y-6">

          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Discover Our Amenities
          </h2>

          <p className="text-gray-900 font-medium text-md leading-relaxed">
            {activeAmenity.description}
          </p>

          {/* THUMBNAILS */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {activeAmenity.thumbs.map((thumb, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleUserSelect(activeIndex)}
                className={`relative min-w-[80px] h-16 overflow-hidden rounded-md border transition
                  ${
                    index === 0
                      ? "border-black ring-1 ring-black"
                      : "border-gray-300"
                  }`}
              >
                <Image
                  src={thumb}
                  alt="Amenity thumbnail"
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold text-center px-2">
                  {activeAmenity.title}
                </div>
              </motion.button>
            ))}
          </div>

          {/* AMENITIES LIST */}
          <ul className="space-y-3 pt-4">
            {amenities.map((amenity, index) => (
              <li key={amenity.id}>
                <button
                  onClick={() => handleUserSelect(index)}
                  className={`text-left text-lg transition-all duration-300 ${
                    index === activeIndex
                      ? "text-black font-semibold pl-3 border-l-4 border-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {amenity.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[450px] lg:h-[520px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAmenity.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={activeAmenity.image}
                alt={activeAmenity.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay Title */}
              <div className="absolute bottom-6 left-6 bg-black/60 text-white px-5 py-3 rounded-md text-2xl font-bold">
                {activeAmenity.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
