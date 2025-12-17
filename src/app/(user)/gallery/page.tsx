"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "@/components/common/Breadcrumb";

const galleryImages = [
  {
    src: "/images/common/ms-enclave-1.webp",
    alt: "MS Enclave Luxury Resort Palakad exterior Sky view",
  },
  {
    src: "/images/common/ms-enclave-2.webp",
    alt: "MS Enclave Luxury Resort Palakad exterior Sky view 2",
  },
  {
    src: "/images/common/ms-enclave-3.webp",
    alt: "MS Enclave Luxury Resort Palakad exterior Sky view 3",
  },
  {
    src: "/images/common/ms-enclave-4.webp",
    alt: "MS Enclave Luxury Resort Palakad exterior Sky view 4",
  },
  {
    src: "/images/common/ms-enclave-5.webp",
    alt: "MS Enclave Luxury Resort Palakad exterior Sky view 5",
  },
  {
    src: "/images/common/ms-enclave-6.webp",
    alt: "MS Enclave Luxury Resort Palakad exterior Sky view 6",
  },
  {
    src: "/images/common/ms-enclave-17.webp",
    alt: "MS Enclave Luxury Resort Palakad Swimming Poll view 17",
  },
  {
    src: "/images/common/ms-enclave-7.webp",
    alt: "MS Enclave Luxury Resort Palakad Swimming Poll view 7",
  },
  {
    src: "/images/common/ms-enclave-8.webp",
    alt: "MS Enclave Luxury Resort Palakad Swimming Poll view 8",
  },
  {
    src: "/images/common/ms-enclave-9.webp",
    alt: "MS Enclave Luxury Resort Palakad Swimming Poll view 9",
  },
  {
    src: "/images/common/ms-enclave-10.webp",
    alt: "MS Enclave Luxury Resort Palakad Swimming Poll view 10",
  },
  {
    src: "/images/common/ms-enclave-11.webp",
    alt: "MS Enclave Luxury Resort Palakad Swimming Poll view",
  },
  {
    src: "/images/common/ms-enclave-12.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-13.webp",
    alt: "MS Enclave Luxury Resort Palakad Interior view",
  },
  {
    src: "/images/common/ms-enclave-14.webp",
    alt: "MS Enclave Luxury Resort Palakad Interior view ",
  },
  {
    src: "/images/common/ms-enclave-15.webp",
    alt: "MS Enclave Luxury Resort Palakad Exterior view ",
  },
  {
    src: "/images/common/ms-enclave-18.webp",
    alt: "MS Enclave Luxury Resort Palakad Exterior view ",
  },
  {
    src: "/images/common/ms-enclave-16.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-19.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-20.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-29.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-28.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-21.webp",
    alt: "MS Enclave Luxury Resort Palakad Interior Rain view",
  },
  {
    src: "/images/common/ms-enclave-22.webp",
    alt: "MS Enclave Luxury Resort Palakad Interior Rain view",
  },
  {
    src: "/images/common/ms-enclave-23.webp",
    alt: "MS Enclave Luxury Resort Palakad Garden view",
  },
  {
    src: "/images/common/ms-enclave-24.webp",
    alt: "MS Enclave Luxury Resort Palakad Room view",
  },
  {
    src: "/images/common/ms-enclave-25.webp",
    alt: "MS Enclave Luxury Resort Palakad Room view",
  },
  {
    src: "/images/common/ms-enclave-26.webp",
    alt: "MS Enclave Luxury Resort Palakad Room view",
  },
  {
    src: "/images/common/ms-enclave-27.webp",
    alt: "MS Enclave Luxury Resort Palakad Room view",
  },
];

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState(galleryImages);

  // 🔀 Shuffle images on mount
  useEffect(() => {
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  return (
    <section>
      <Breadcrumb
        heading="Experiences"
        bgImage="/images/home/ms-slider-1.webp"
        items={[{ label: "Gallery", href: "/gallery" }]}
      />
      <div className="py-20 ">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Heading */}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shuffledImages.map((img, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                {/* Image */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <figcaption className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-sm font-medium">
                    {img.alt}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={galleryImages.map((img) => ({
            src: img.src,
            alt: img.alt,
          }))}
          styles={{
            container: { backgroundColor: "rgba(15, 15, 16, 0.95)" }, // 👈 change background here
          }}
        />
      </div>
    </section>
  );
}
