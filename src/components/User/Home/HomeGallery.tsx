"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { motion, useInView } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Link from "next/link";

const images = [
  "/images/home/ms-slider-0.webp",
  "/images/home/ms-slider-1.webp",
  "/images/home/ms-slider-2.webp",
  "/images/home/ms-slider-0.webp",
  "/images/home/ms-slider-1.webp",
  "/images/home/ms-slider-2.webp",
];

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function HomeGallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const headerInView = useInView(headerRef, { amount: 0.3 });
  const sliderInView = useInView(sliderRef, { amount: 0.2 });

  useEffect(() => {
    setShuffledImages([...images].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <section className="py-10 relative">

      {/* HEADER */}
      <motion.div
        ref={headerRef}
        variants={fadeUp}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 text-center relative"
      >
        <h2 className="text-5xl font-semibold text-yellow-100 leading-tight text-shadow-xl">
          Explore Our Resort
        </h2>
        <p className="text-gray-50 font-medium text-lg leading-relaxed font-dm text-shadow-xl">
          A glimpse into the beauty and serenity of M.S. Enclave Heritage Resort.
        </p>
        <Link
          href="/gallery"
          className="mt-6 inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce  "
        >
          Explore Our Gallery
        </Link>
      </motion.div>

      {/* GALLERY */}
      <motion.div
        ref={sliderRef}
        variants={fadeUp}
        initial="hidden"
        animate={sliderInView ? "visible" : "hidden"}
        transition={{ duration: 1.1, delay: 0.15 }}
        className="mt-14 relative"
      >
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          centeredSlides
          grabCursor
          loop
          slideToClickedSlide
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 90,
            depth: 260,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto overflow-visible"
        >
          {shuffledImages.map((src, i) => (
            <SwiperSlide
              key={i}
              className="flex justify-center overflow-visible pointer-events-auto"
            >
              <div
                onClick={() => setLightbox(src)}
                className="relative cursor-pointer"
              >
                <Image
                  src={src}
                  alt="Gallery image"
                  width={600}
                  height={400}
                  className="
                    rounded-2xl
                    object-cover
                    shadow-xl
                    transition-transform
                    duration-300
                    hover:scale-[1.009]
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
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

      {/* SEO (Hidden) */}
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
