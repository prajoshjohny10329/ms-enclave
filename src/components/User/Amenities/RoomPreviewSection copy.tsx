"use client";

import { useState, useRef } from "react";
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
import { motion, useInView } from "framer-motion";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const MotionLink = motion(Link);

export default function RoomPreviewSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const contentRef = useRef(null);
  const sliderRef = useRef(null);

  const contentInView = useInView(contentRef, { amount: 0.3 });
  const sliderInView = useInView(sliderRef, { amount: 0.3 });

  const images = [
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-59.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/new/ms-enclave-room-1.webp",
    "/images/new/ms-enclave-room-2.webp",
    "/images/new/ms-enclave-room-3.webp",
  ];

  return (
    <section className=" bg-white py-10">
      <div className="max-w-7xl p-8 mx-auto">
        <div className="grid md:grid-cols-10 gap-2 select-none">
          {/* LEFT CONTENT */}
          <motion.div
            ref={contentRef}
            variants={fadeLeft}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="flex items-center col-span-10 md:col-span-4"
          >
            <div className="px-6 mb-5">
              <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight text-shadow-sm ">
                Well-Furnished Rooms
              </h2>

              <p className="text-gray-950 font-medium text-md leading-relaxed font-dm ">
                Spacious rooms designed with a blend of heritage style and
                modern comfort. Equipped with comfortable beds and clean
                interiors for a relaxing stay. Thoughtfully arranged to provide
                privacy and peaceful rest. Ideal for families, couples, and
                leisure travelers.
              </p>

              <MotionLink
                href="/amenities/rooms"
                initial="hidden"
                animate={contentInView ? "visible" : "hidden"}
                transition={{ duration: 1.3 }}
                className="mt-6 inline-block px-6 py-3 bg-gray-950 text-white"
              >
                Explore Our Rooms
              </MotionLink>
            </div>
          </motion.div>

          {/* RIGHT SLIDER */}
          <motion.div
            ref={sliderRef}
            variants={fadeRight}
            initial="hidden"
            animate={sliderInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="px-4 col-span-10 md:col-span-6"
          >
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
                    className="w-full h-[500px] object-cover rounded-2xl"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
