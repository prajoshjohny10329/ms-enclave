"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Contact } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function TopHeader() {
  return (
    <div className="w-full bg-white py-4 px-4 border-b">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-6">
        {/* LEFT SECTION */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center ">
            <FontAwesomeIcon icon={faPhone} className="text-lg text-black" />
          </div>
          <div className="text-[13px] font-dm font-semibold">
            <p className="text-black">
              <Link
                href="tel:+918589996642"
                className="text-black hover:underline"
              >
                +91 97456 66642
              </Link>
            </p>

            <p className="text-black">
              <Link
                href="tel:+919945004857"
                className="text-black hover:underline"
              >
                +91 994 500 4857
              </Link>
            </p>
          </div>
        </div>

        {/* CENTER LOGO */}
        <Link href='/' className="text-center w-full md:max-w-96">
          <h1 className="text-[28px] text-black tracking-widest  font-semibold uppercase">
            M.S. Enclave
          </h1>
          <p className="text-[8px] uppercase  tracking-[0.25em] text-black">
            Heritage Home stay
          </p>
        </Link>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-3 text-right">
          <div className="text-right text-[13px] font-dm font-semibold">
            <Link
              href="https://maps.app.goo.gl/MvrRJ2aN9SZZsFHL7"
              target="_blank"
              className="text-black hover:underline"
            >
              Mannuparambil, Paruthipully <br /> Palakkad, Kerala
            </Link>{" "}
          </div>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center text-yellow-100">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-lg text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
