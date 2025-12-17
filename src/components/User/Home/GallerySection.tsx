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

export default function GalleryWithThumbs() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = [
    "/images/home/ms-slider-0.webp",
    "/images/home/ms-slider-1.webp",
    "/images/home/ms-slider-2.webp",
    "/images/home/ms-slider-0.webp",
    "/images/home/ms-slider-1.webp",
    "/images/home/ms-slider-2.webp",
    "/images/home/ms-slider-0.webp",
    "/images/home/ms-slider-1.webp",
    "/images/home/ms-slider-2.webp",
    "/images/home/ms-slider-0.webp",
    "/images/home/ms-slider-1.webp",
    "/images/home/ms-slider-2.webp",
    "/images/home/ms-slider-0.webp",
    "/images/home/ms-slider-1.webp",
    "/images/home/ms-slider-2.webp",
    "/images/home/ms-slider-0.webp",
    "/images/home/ms-slider-1.webp",
    "/images/home/ms-slider-2.webp",
  ];

  return (
    <section className="py-20 px-0 md:px-25 bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex items-center">
          <div className="px-6 mb-5">
            <h2 className="text-4xl font-bold text-blue-900 uppercase text-shadow-lg">
            Comfortable  Spacious Rooms
          </h2>
          <p className="text-black leading-relaxed mt-4">
            Experience comfort in our thoughtfully designed rooms that reflect Kerala’s heritage style while offering modern amenities for a relaxing stay.
          </p>
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
