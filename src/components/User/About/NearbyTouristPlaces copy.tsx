"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  Parallax,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Image from "next/image";

type Place = {
  title: string;
  description: string;
  image: string;
  distance: string;
  mapUrl: string;
};

const places: Place[] = [
  {
    title: "Silent Valley National Park",
    description:
      "One of India’s most pristine tropical rainforests, Silent Valley National Park is a paradise for nature lovers and wildlife enthusiasts. Home to rare flora and fauna, this UNESCO-recognized biosphere offers guided treks, bird watching, and an unforgettable experience of untouched wilderness.",
    image: "/images/tourist/silent-valley.jpg",
    distance: "45 km",
    mapUrl: "https://maps.google.com/?q=Silent+Valley+National+Park",
  },
  {
    title: "Nelliyampathy Hills",
    description:
      "Nestled in the Western Ghats, Nelliyampathy is a picturesque hill station known for its cool climate, tea and coffee plantations, dense forests, and breathtaking viewpoints. Ideal for a peaceful day trip, the hills offer stunning sunrise and sunset views.",
    image: "/images/tourist/nelliyampathy.jpg",
    distance: "38 km",
    mapUrl: "https://maps.google.com/?q=Nelliyampathy+Hills",
  },
];

export default function NearbyTouristPlaces1() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-5 text-center text-black">
          Nearby Tourist Places
        </h2>
        <p className="text-gray-950 text-center mb-12 font-medium text-md leading-relaxed font-dm">Explore the Natural Beauty, Heritage, and Attractions Around M.S. Enclave Heritage Resort</p>

        {/* SWIPER */}
        <Swiper
          modules={[
            Autoplay,
            Navigation,
            Pagination,
            EffectFade,
            Parallax,
          ]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // ✅ Pause on hover
          }}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          parallax
          className="relative"
        >
          {/* PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-10">
            <div className="swiper-progress-bar h-full bg-black" />
          </div>

          {places.map((place, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* IMAGE */}
                <div className="relative h-[350px] lg:h-[450px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover scale-110"
                    data-swiper-parallax="-20%" // ✅ Parallax
                    priority={index === 0}
                  />

                  {/* DISTANCE BADGE */}
                  <span className="absolute top-4 left-4 bg-black/70 text-white text-sm px-4 py-1 rounded-full">
                    {place.distance} from resort
                  </span>
                </div>

                {/* TEXT */}
                <div data-swiper-parallax="-100">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                    {place.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-md md:text-lg mb-6">
                    {place.description}
                  </p>

                  {/* GOOGLE MAP BUTTON */}
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* PROGRESS BAR ANIMATION */}
      <style jsx global>{`
        .swiper-progress-bar {
          animation: progress 2.5s linear infinite;
        }

        .swiper:hover .swiper-progress-bar {
          animation-play-state: paused;
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
