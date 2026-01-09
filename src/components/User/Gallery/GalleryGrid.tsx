"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { galleryImages } from "./galleryList";


const IMAGES_PER_LOAD = 6;

export default function GalleryGrid() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);

  // Unique categories
  const categories = [
    "All",
    ...new Set(galleryImages.map((img) => img.category)),
  ];

  // Filter images by category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter((img) => img.category === activeCategory)
      );
    }

    // Reset visible images on category change
    setVisibleCount(IMAGES_PER_LOAD);
  }, [activeCategory]);

  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center pb-10">
            <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight text-shadow-sm">View By Category</h2>
            <p className="text-gray-950 mt-2 font-medium text-md leading-relaxed font-dm">Browse through our gallery by selecting different categories to experience every corner of M.S. Enclave Heritage Resort. From serene interiors to vibrant outdoor spaces, each section highlights the beauty and charm of our resort.</p>
        </div>

        {/* 🔘 Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition shadow text-black
                ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🖼️ Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((img, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <figcaption className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-sm font-medium">
                  {img.alt}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* 🔽 Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() =>
                setVisibleCount((prev) => prev + IMAGES_PER_LOAD)
              }
              className="px-8 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* 🔍 Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={visibleImages.map((img) => ({
          src: img.src,
          alt: img.alt,
        }))}
        styles={{
          container: { backgroundColor: "rgba(15, 15, 16, 0.95)" },
        }}
      />
    </section>
  );
}