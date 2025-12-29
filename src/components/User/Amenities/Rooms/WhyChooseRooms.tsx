"use client";

import { useState } from "react";

const reasons = [
  {
    title: "Peaceful and Natural Surroundings",
    description:
      "Enjoy a calm and refreshing environment surrounded by greenery, ideal for relaxation and rejuvenation away from city noise.",
  },
  {
    title: "Traditional Kerala Heritage Ambiance",
    description:
      "Experience authentic Kerala architecture and cultural aesthetics that reflect the region’s timeless traditions.",
  },
  {
    title: "Spacious and Hygienic Rooms",
    description:
      "Our rooms are designed with ample space, cleanliness, and comfort in mind to ensure a pleasant and healthy stay.",
  },
  {
    title: "Family-Friendly Environment",
    description:
      "A safe, welcoming, and comfortable atmosphere suitable for families, couples, and senior guests.",
  },
];

export default function WhyChooseRooms() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-white ">
      {/* Accordion */}
      <div className="space-y-3">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center p-4 text-left font-semibold hover:bg-gray-50 transition"
            >
              <span className=" text-black font-dm">{item.title}</span>
              <span className="text-xl text-black font-dm">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-900 font-dm">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
