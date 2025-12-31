"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import WhyChooseRooms from "./WhyChooseRooms";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const MotionLink = motion(Link);

export default function RoomsWhyChooseUs() {
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative py-15 bg-gray-50">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div className="space-y-6">
            <motion.h1
              ref={titleRef}
              variants={fadeLeft}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl font-semibold text-black leading-tight text-shadow-sm"
            >
              Booking Call-to-Action Section
            </motion.h1>
            <motion.p
              ref={textRef}
              variants={fadeRight}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              transition={{ duration: 1 }}
              className="text-gray-950 font-medium text-md leading-relaxed font-dm"
            >
              Enjoy a calm and refreshing stay surrounded by nature at{" "}
              <strong>M.S. Enclave Heritage Resort.</strong>
              Book your room today and experience comfort, heritage, and
              hospitality like never before.
            </motion.p>
            <motion.div
              ref={lintRef}
              variants={fadeRight}
              initial="hidden"
              animate={lintInView ? "visible" : "hidden"}
              transition={{ duration: 1.4 }}
            ></motion.div>
            <div className="grid">
              <MotionLink
                href="tel:+91 97456 66642"
                ref={lintRef}
                variants={fadeRight}
                initial="hidden"
                animate={lintInView ? "visible" : "hidden"}
                transition={{ duration: 1.4 }}
                className="px-6 py-1  text-black font-dm text-lg font-bold hover:text-red-700 "
              >
                +91 97456 66642
              </MotionLink>
              <MotionLink
                href="tel:+91 994 500 4857"
                ref={lintRef}
                variants={fadeRight}
                initial="hidden"
                animate={lintInView ? "visible" : "hidden"}
                transition={{ duration: 1.4 }}
                className="px-6 py-1  text-black font-dm text-lg font-bold hover:text-red-700 "
              >
                +91 994 500 4857
              </MotionLink>
            </div>
            {/* button */}
            <MotionLink
              href="/packages"
              ref={lintRef}
              variants={fadeRight}
              initial="hidden"
              animate={lintInView ? "visible" : "hidden"}
              transition={{ duration: 1.4 }}
              className="mt-4 ml-3 inline-block px-12 hover:bg-red-500 shadow-lg py-3 bg-gray-950 text-white"
            >
              Book Now
            </MotionLink>
            <MotionLink
              href="/contact"
              ref={lintRef}
              variants={fadeRight}
              initial="hidden"
              animate={lintInView ? "visible" : "hidden"}
              transition={{ duration: 1.4 }}
              className="mt-4 ml-8 inline-block px-12 hover:bg-red-500 shadow-lg py-3 bg-gray-950 text-white"
            >
              Select A Package
            </MotionLink>
          </div>
        </div>

        {/* Left Image Column */}
        <motion.div
          ref={imgRef}
          variants={fadeRight}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="relative w-full h-full rounded-md min-h-[500px] max-h-[500px] pb-5"
        >
          <Image
            src="/images/common/ms-enclave-25.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-tl-[35px] rounded-br-[35px] shadow-md pb-2 pl-2"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
