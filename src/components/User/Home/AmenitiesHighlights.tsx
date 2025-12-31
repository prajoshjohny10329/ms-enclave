"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const amenities = [
  { imageUrl: "/images/common/ms-enclave-24.webp", title: "Well-Furnished Rooms" },
  { imageUrl: "/images/common/ms-enclave-13.webp", title: "party Hall" },
  { imageUrl: "/images/common/ms-enclave-17.webp", title: "Swimming Pool" },
  { imageUrl: "/images/common/ms-enclave-20.webp", title: "Kids Play Area" },
  { imageUrl: "/images/common/ms-enclave-7.webp", title: "Fishing Zone" },
  { imageUrl: "/images/common/ms-enclave-23.webp", title: "Walking Track" },
  { imageUrl: "/images/common/ms-enclave-24.webp", title: "Well-Furnished Rooms" },
  { imageUrl: "/images/common/ms-enclave-13.webp", title: "party Hall" },
  { imageUrl: "/images/common/ms-enclave-17.webp", title: "Swimming Pool" },
  { imageUrl: "/images/common/ms-enclave-20.webp", title: "Kids Play Area" },
  { imageUrl: "/images/common/ms-enclave-7.webp", title: "Fishing Zone" },
  { imageUrl: "/images/common/ms-enclave-23.webp", title: "Walking Track" },
];

export default function AmenitiesSlider() {
  return (
    <section className="py-15 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight text-shadow-sm">
          Discover Our World-Class Amenities
        </h2>
        <p className="text-gray-950 font-medium text-sm leading-relaxed font-dm mb-12 mt-3">
          At M.S. Enclave Heritage Resort, we offer thoughtfully curated amenities to make your stay unforgettable.
From luxurious rooms and a sparkling swimming pool to kids’ play areas and serene walking tracks, our resort ensures that every guest experiences comfort, leisure, and adventure all in one place.
        </p>
      </div>

      <div className="mx-auto px-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 5 },
          }}
        >
          {amenities.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href="/amenities" className="block">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                  <div className="w-full h-70 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <h3 className="text-white text-shadow-sm bottom-0 absolute font-semibold text-center p-4">
                    {item.title}
                  </h3>
                  </div>
                  
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <Link href="/amenities">
            <button className="px-8 py-3 cursor-pointer bg-black text-white font-semibold hover:bg-gray-950  transition">
              View All Amenities
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
