"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "@/components/common/Breadcrumb";
import GalleryIntroduction from "@/components/User/Gallery/GalleryIntroduction";
import GalleryGrid from "@/components/User/Gallery/GalleryGrid";

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
      <GalleryIntroduction />
      <GalleryGrid />
    </section>
  );
}
