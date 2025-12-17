"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function VideoHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(true);

  // ▶️ Play / Pause based on visibility
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.5, // 50% visible
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // 🔊 Toggle Sound
  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🖼️ Fallback Image (before video loads) */}
      {!videoLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/home/ms-slider-1.webp')",
          }}
        />
      )}

      {/* 🎥 Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoLoaded(true)}
      >
        <source src="/temp/6.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ✨ Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
          Experience Timeless Luxury
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
          Discover heritage hospitality, peaceful stays, and unforgettable
          moments at M.S. Enclave Heritage Resort.
        </p>

        <a
          href="#rooms"
          className="mt-8 px-8 py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Explore Rooms
        </a>
      </div>

      {/* 🔊 Sound Toggle */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-20 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 transition"
        aria-label="Toggle Sound"
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white">
        <ChevronDown size={30} />
      </div>
    </section>
  );
}
