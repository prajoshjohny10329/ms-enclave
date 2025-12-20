"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const amenities = [
  {
    id: 1,
    title: "Fully Furnished Rooms",
    description:
      "Spacious, air-conditioned rooms designed with comfort and elegance, offering a relaxing stay.",
    images: [
      "/images/common/ms-enclave-24.webp",
      "/images/common/ms-enclave-25.webp",
      "/images/common/ms-enclave-26.webp",
      "/images/common/ms-enclave-24.webp",
      "/images/common/ms-enclave-25.webp",
      "/images/common/ms-enclave-26.webp",
    ],
  },
  {
    id: 2,
    title: "Swimming Pool",
    description:
      "Enjoy a refreshing swim surrounded by greenery in our well-maintained pool.",
    images: [
      "/images/common/ms-enclave-17.webp",
      "/images/common/ms-enclave-18.webp",
      "/images/common/ms-enclave-19.webp",
      "/images/common/ms-enclave-17.webp",
      "/images/common/ms-enclave-18.webp",
      "/images/common/ms-enclave-19.webp",
    ],
  },
  {
    id: 3,
    title: "Traditional Dining",
    description:
      "Experience authentic Kerala cuisine served in a peaceful heritage setting.",
    images: [
      "/images/common/ms-enclave-13.webp",
      "/images/common/ms-enclave-14.webp",
      "/images/common/ms-enclave-15.webp",
      "/images/common/ms-enclave-13.webp",
      "/images/common/ms-enclave-14.webp",
      "/images/common/ms-enclave-15.webp",
    ],
  },
];

export default function AmenitiesSection() {
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeAmenity = amenities[activeAmenityIndex];

  /* AUTO SLIDE (amenities) */
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setActiveAmenityIndex((prev) => (prev + 1) % amenities.length);
      setActiveImageIndex(0); // reset image
    }, 5000);

    // return () => {
    //   if (intervalRef.current) clearInterval(intervalRef.current);
    // };
  }, [paused]);

  const selectAmenity = (index: number) => {
    setPaused(true);
    setActiveAmenityIndex(index);
    setActiveImageIndex(0);
  };

  const selectImage = (index: number) => {
    setPaused(true);
    setActiveImageIndex(index);
  };

  return (
    <section className="py-20 bg-white">

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="px-6 lg:px-24 flex flex-col justify-center gap-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Discover Our Amenities
          </h2>

          <p className="text-gray-950 font-medium text-md leading-relaxed font-dm">
            {activeAmenity.description}
          </p>

          {/* THUMBNAILS */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {activeAmenity.images.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => selectImage(index)}
                whileHover={{ scale: 1.05 }}
                className={`relative min-w-[90px] h-[60px] rounded-md overflow-hidden border
                  ${
                    index === activeImageIndex
                      ? "border-black ring-2 ring-black"
                      : "border-gray-300"
                  }`}
              >
                <Image
                  src={img}
                  alt="Amenity thumbnail"
                  fill
                  className="object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
                </div>
              </motion.button>
            ))}
          </div>

          {/* AMENITY TITLES */}
          <div>
            <ul className="space-y-4 pt-4 flex gap-5">
              {amenities.map((amenity, index) => (
                <li key={amenity.id}>
                  <button
                    onClick={() => selectAmenity(index)}
                    className={`text-left text-md transition border-b-2 pb-1 font-dm
                    ${
                      index === activeAmenityIndex
                        ? "text-black border-black font-semibold"
                        : "text-gray-400 border-transparent hover:text-black"
                    }`}
                  >
                    {amenity.title}
                  </button>
                </li>
              ))}
            </ul>
            <Link
              href="/amenities"
              className="mt-6 inline-block px-6 py-3 bg-gray-950 text-white "
            >
              Know More Amenities
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[450px] lg:h-[520px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeAmenityIndex}-${activeImageIndex}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={activeAmenity.images[activeImageIndex]}
                alt={activeAmenity.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay Title */}
              <div className="absolute font-dm bottom-6 left-6  text-shadow-lg text-white px-5 py-3 text-2xl font-bold rounded-md">
                {activeAmenity.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
