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

export default function IndoorGamesPreviewSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const contentRef = useRef(null);
  const sliderRef = useRef(null);

  const contentInView = useInView(contentRef, { amount: 0.3 });
  const sliderInView = useInView(sliderRef, { amount: 0.3 });

  const images = [
    "/images/new/ms-enclave-billiards.webp",
  ];

  return (
    <section className=" bg-gray-50 py-10">
      <div className="max-w-7xl p-8 mx-auto">
        <div className="grid md:grid-cols-10 gap-2 text-end select-none">

          {/* RIGHT SLIDER */}
          <motion.div
            ref={sliderRef}
            variants={fadeLeft}
            initial="hidden"
            animate={sliderInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="px-4 md:col-span-6"
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
          </motion.div>
          {/* LEFT CONTENT */}
          <motion.div
            ref={contentRef}
            variants={fadeRight}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
            className="flex items-center md:col-span-4"
          >
            <div className="px-6 mb-5">
              <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight text-shadow-sm ">
                Indoor Games (Billiards)
              </h2>

              <p className="text-gray-950 font-medium text-md leading-relaxed font-dm ">
                Enjoy leisure time with indoor games in a comfortable setting.
Play billiards with friends and family in a relaxed atmosphere.
Perfect for entertainment during leisure hours or rainy days.
A great way to unwind and enjoy quality time indoors.
              </p>

              {/* <MotionLink
                href="/amenities/party-hall"
                variants={fadeLeft}
                initial="hidden"
                animate={contentInView ? "visible" : "hidden"}
                transition={{ duration: 1.3 }}
                className="mt-6 inline-block px-6 py-3 bg-gray-950 text-white"
              >
                More About Conference Hall
              </MotionLink> */}
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
