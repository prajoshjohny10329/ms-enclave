"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronDown } from "lucide-react";

export default function HeroSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
  <section
    style={{
      backgroundImage: "url('/images/home/ms-slider-2.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100%",
    }}
    className="contrast-125 brightness-95 flex items-center justify-center"
  >
    <div className="px-4 mx-auto max-w-screen-xl text-center">
      
      <h1 className="mb-4 text-5xl md:text-6xl font-extrabold leading-tight text-white text-shadow-lg mt-28">
        Experience Kerala<span> ’ </span>s Timeless Heritage
      </h1>

      <p className="mb-8 text-lg text-white font-medium text-shadow-lg">
        Discover the perfect blend of tradition, nature, and comfort at
        M.S. Enclave Heritage Resort.
      </p>

      <div className="flex flex-col mb-8 md:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        
        <a
          href="#"
          className="inline-flex justify-center items-center py-3 px-6 text-base font-semibold text-black rounded-lg border border-black/20 bg-white/60 backdrop-blur-sm hover:bg-white shadow-lg shadow-gray-400/40 transition"
        >
          Book Your Stay
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>

        <a
          href="#"
          className="inline-flex justify-center items-center py-3 px-6 text-base font-semibold text-black rounded-lg border border-black/20 bg-white/60 backdrop-blur-sm hover:bg-white shadow-lg shadow-gray-400/40 transition"
        >
          <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          Watch video
        </a>
        {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white">
        <ChevronDown size={30} />
      </div>

      </div>
    </div>
  </section>
</SwiperSlide>

        
        
      </Swiper>
    </>
  );
}
