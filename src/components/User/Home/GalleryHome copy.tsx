"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const images = [
  "/images/home/ms-slider-0.webp",
  "/images/home/ms-slider-1.webp",
  "/images/home/ms-slider-2.webp",
  "/images/home/ms-slider-0.webp",
  "/images/home/ms-slider-1.webp",
  "/images/home/ms-slider-2.webp",
];

export default function GalleryHome() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  // 🔀 Shuffle once
  useEffect(() => {
    setShuffledImages([...images].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <section className="py-24 bg-white overflow-visible">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          My Visual Diary
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          A curated collection of moments, places, and experiences.
        </p>
      </div>

      {/* GALLERY */}
      <div className="mt-14 relative">
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          centeredSlides
          grabCursor
          loop
          navigation
          slideToClickedSlide
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // ✅ IMPORTANT
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 120,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto !overflow-visible"
        >
          {shuffledImages.map((src, i) => (
            <SwiperSlide
              key={i}
              className="!overflow-visible flex justify-center"
            >
              <div
                onClick={() => setLightbox(src)}
                className="
                  relative
                  cursor-pointer
                  transition-transform
                  duration-300
                  hover:scale-105
                  hover:z-30
                "
              >
                <Image
                  src={src}
                  alt="Gallery image"
                  width={600}
                  height={400}
                  className="
                    rounded-2xl
                    object-cover
                    w-[320px]
                    h-[360px]
                    md:w-[380px]
                    md:h-[420px]
                    shadow-xl
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white text-4xl"
            >
              ✕
            </button>

            <Image
              src={lightbox}
              alt="Preview"
              width={1200}
              height={800}
              className="rounded-xl max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
