"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function PartyHallDummy() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });

  return (
    <section className="relative theme-bg">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-10 min-h-[500px]">

        {/* Left Image Column */}
        <motion.div
        ref={imgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
         className="relative w-full h-full rounded-md min-h-[650px] pb-5 md:col-span-6">

          <Image
            src="/images/common/ms-enclave-31.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-tr-[35px] rounded-br-[35px] shadow-md"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10 md:col-span-4">
          <div>
            <motion.h1
                        ref={titleRef}
                        variants={fadeRight}
                        initial="hidden"
                        animate={titleInView ? "visible" : "hidden"}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl text-amber-300 leading-tight font-playfair"
                      >
                        Party Hall
                      </motion.h1>
            <motion.h2
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-4xl md:text-5xl font-semibold text-white font-dm mt-1 leading-tight text-shadow-sm">
              A Perfect Venue for Celebrations
            </motion.h2>

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className=" font-normal text-md leading-relaxed font-dm mt-2 text-gray-100">
              Our Mini Party Hall at <strong>M.S. Enclave Heritage Resort</strong> is
          ideal for hosting weddings, birthday parties, engagement ceremonies,
          family functions, and corporate meetings. Designed with comfort and
          elegance, the fully air-conditioned hall offers a peaceful atmosphere
          surrounded by nature.
            </motion.p>

          </div>
          
        </div>
      </div>
    </section>
  );
}
