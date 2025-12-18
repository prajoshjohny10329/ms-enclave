"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface CrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  heading: string;          // Main page heading
  items: CrumbItem[];       // Breadcrumb list
  bgImage: string;          // Background image URL
}

export default function Breadcrumb({ heading, items, bgImage }: BreadcrumbProps) {
  return (
    <div className="relative w-full h-64 md:h-80 flex items-center">

      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Breadcrumb Background"
        fill
        priority
        className="object-cover brightness-75 rounded-[0_0_15px_15px] drop-shadow-xl"
      />

      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl text-center font-bold text-white text-shadow-lg font-playfair">
          {heading}
        </h1>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-200 flex items-center justify-center mt-3 space-x-1 mb-3">
          <Link href="/" className="hover:text-white ">Home</Link>

          {items.map((item, index) => (
            <span key={index} className="flex items-center space-x-1">
              <ChevronRight className="w-4 h-4 text-gray-300" />

              {index === items.length - 1 ? (
                <span className="text-white font-semibold">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
