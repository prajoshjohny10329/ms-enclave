"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  FreeMode,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Link from "next/link";

export default function RoomsPreviewSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = [
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
  ];

  return (
    <section className="py-20 px-0 md:px-25 bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex items-center">
          <div className="px-6 mb-5">
            <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight text-shadow-sm">
            Comfortable  Spacious Rooms
          </h2>
          <p className="text-gray-950 font-medium text-md leading-relaxed font-dm">
            Experience comfort in our thoughtfully designed rooms that reflect Kerala’s heritage style while offering modern amenities for a relaxing stay.
          </p>
          <Link
            href="/rooms"
            className="mt-6 inline-block px-6 py-3 bg-gray-950 text-white "
          >
            View All Rooms
          </Link>
          </div>
        </div>
        <div className="lg:max-w-5xl lg:mx-auto px-4">
          {/* Main Slider */}
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Pagination, Thumbs, Autoplay]}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  width={1200}
                  height={700}
                  alt="Gallery Image"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Slider */}
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={6}
            freeMode
            watchSlidesProgress
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Thumbs, Autoplay]}
            className="mt-5"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  width={200}
                  height={120}
                  alt="Thumbnail"
                  className="h-20 w-full object-cover rounded cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
