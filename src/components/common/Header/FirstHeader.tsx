"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Contact } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function TopHeader() {
  return (
    <div className="w-full bg-white py-4 px-4 border-b">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-6">
        
        {/* LEFT SECTION */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center ">
            <FontAwesomeIcon icon={faPhone} className="text-lg text-black" />
          </div>
          <div className="text-sm font-dm">
            <p className="text-black">+91 858 999 6642 </p>
            <p className="text-black">+91 994 500 4857</p>
          </div>
        </div>

        {/* CENTER LOGO */}
        <div className="text-center w-full md:max-w-96">
          <h1 className="text-[28px] text-black tracking-widest  font-semibold uppercase">
           M.S. Enclave
          </h1>
          <p className="text-[8px] uppercase  tracking-[0.25em] text-black">
            Heritage Home stay
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-3 text-right">
          <div className="text-right text-sm font-dm">
            <p className="text-black">Mannuparambil, Paruthipully</p>
            <p className="text-black">Palakkad, Kerala</p>
          </div>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center text-yellow-100">
            <FontAwesomeIcon icon={faLocationDot} className="text-lg text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
