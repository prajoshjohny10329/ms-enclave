"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "/images/common/ms-enclave-1.webp",
    alt: "MS Enclave Luxury Resort Palakkad exterior Sky view",
  },
  {
    src: "/images/common/ms-enclave-2.webp",
    alt: "MS Enclave Luxury Resort Palakkad exterior Sky view 2",
  },
  {
    src: "/images/common/ms-enclave-3.webp",
    alt: "MS Enclave Luxury Resort Palakkad exterior Sky view 3",
  },
  {
    src: "/images/common/ms-enclave-4.webp",
    alt: "MS Enclave Luxury Resort Palakkad exterior Sky view 4",
  },
  {
    src: "/images/common/ms-enclave-5.webp",
    alt: "MS Enclave Luxury Resort Palakkad exterior Sky view 5",
  },
  {
    src: "/images/common/ms-enclave-6.webp",
    alt: "MS Enclave Luxury Resort Palakkad exterior Sky view 6",
  },
  {
    src: "/images/common/ms-enclave-17.webp",
    alt: "MS Enclave Luxury Resort Palakkad Swimming Poll view 17",
  },
  {
    src: "/images/common/ms-enclave-7.webp",
    alt: "MS Enclave Luxury Resort Palakkad Swimming Poll view 7",
  },
  {
    src: "/images/common/ms-enclave-8.webp",
    alt: "MS Enclave Luxury Resort Palakkad Swimming Poll view 8",
  },
  {
    src: "/images/common/ms-enclave-9.webp",
    alt: "MS Enclave Luxury Resort Palakkad Swimming Poll view 9",
  },
  {
    src: "/images/common/ms-enclave-10.webp",
    alt: "MS Enclave Luxury Resort Palakkad Swimming Poll view 10",
  },
  {
    src: "/images/common/ms-enclave-11.webp",
    alt: "MS Enclave Luxury Resort Palakkad Swimming Poll view",
  },
  {
    src: "/images/common/ms-enclave-12.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-13.webp",
    alt: "MS Enclave Luxury Resort Palakkad Interior view",
  },
  {
    src: "/images/common/ms-enclave-14.webp",
    alt: "MS Enclave Luxury Resort Palakkad Interior view ",
  },
  {
    src: "/images/common/ms-enclave-15.webp",
    alt: "MS Enclave Luxury Resort Palakkad Exterior view ",
  },
  {
    src: "/images/common/ms-enclave-18.webp",
    alt: "MS Enclave Luxury Resort Palakkad Exterior view ",
  },
  {
    src: "/images/common/ms-enclave-16.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-19.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-20.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-29.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-28.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-21.webp",
    alt: "MS Enclave Luxury Resort Palakkad Interior Rain view",
  },
  {
    src: "/images/common/ms-enclave-22.webp",
    alt: "MS Enclave Luxury Resort Palakkad Interior Rain view",
  },
  {
    src: "/images/common/ms-enclave-23.webp",
    alt: "MS Enclave Luxury Resort Palakkad Garden view",
  },
  {
    src: "/images/common/ms-enclave-24.webp",
    alt: "MS Enclave Luxury Resort Palakkad Room view",
  },
  {
    src: "/images/common/ms-enclave-25.webp",
    alt: "MS Enclave Luxury Resort Palakkad Room view",
  },
  {
    src: "/images/common/ms-enclave-26.webp",
    alt: "MS Enclave Luxury Resort Palakkad Room view",
  },
  {
    src: "/images/common/ms-enclave-27.webp",
    alt: "MS Enclave Luxury Resort Palakkad Room view",
  },
];

export default function PhotoGalleryPreview() {
  return (
    <section
      className="py-20 bg-gray-50"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ================= TITLE ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="gallery-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Explore Our Resort
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            A glimpse into the beauty and serenity of{" "}
            <strong>M.S. Enclave Heritage Resort</strong>,
            where tradition meets luxury.
          </p>
        </div>

        {/* ================= GALLERY GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl shadow group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition shadow-lg"
            aria-label="View full photo gallery of M.S. Enclave Heritage Resort"
          >
            View Full Gallery
          </Link>
        </div>
      </div>

      {/* ================= SEO (Hidden) ================= */}
      <div className="sr-only">
        <h3>Luxury Resort Gallery Kerala</h3>
        <p>
          Photo gallery of rooms, swimming pool, garden, dining area,
          outdoor spaces and scenic views at M.S. Enclave Heritage Resort,
          Palakkad, Kerala.
        </p>
      </div>
    </section>
  );
}
