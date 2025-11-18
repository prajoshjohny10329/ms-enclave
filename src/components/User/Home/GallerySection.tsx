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
    <section className="py-20 px-25 bg-white">
      <div className="flex ">
        <div className="flex items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
            PERFECT PLACE <br /> FOR PRIVATE EVENTS
          </h2>
          <p className="text-gray-800 leading-relaxed mt-4">
            Whether you're hosting a corporate event, cocktail party, luncheon,
            wedding reception, or rehearsal dinner — we offer beautiful private
            spaces that can accommodate up to 180 guests.
          </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4">
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
