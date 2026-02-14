"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PartyHallHighlights from "./PartyHallHighlights";

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const MotionLink = motion(Link);

export default function PartyHallWelcome() {
      const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const lintRef = useRef(null);

  const imgInView = useInView(imgRef, { amount: 0.3 });
  const titleInView = useInView(titleRef, { amount: 0.3 });
  const textInView = useInView(textRef, { amount: 0.3 });
  const lintInView = useInView(lintRef, { amount: 0.3 });

  return (
    <section className="relative py-15">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[500px]">

        {/* Left Image Column */}
        <motion.div
        ref={imgRef}
          variants={fadeLeft}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
         className="relative w-full h-full rounded-md min-h-[550px] pb-5">

          <Image
            src="/images/common/ms-enclave-31.webp"
            alt="M.S. Enclave Heritage Resort Palakkad"
            fill
            className="object-cover rounded-tr-[35px] rounded-bl-[35px] shadow-md pb-2 pr-2"
            priority
          />
        </motion.div>

        {/* Right Content */}
        <div className="flex items-center px-6 md:px-16 mt-10">
          <div>
            <motion.p
                        ref={titleRef}
                        variants={fadeRight}
                        initial="hidden"
                        animate={titleInView ? "visible" : "hidden"}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl font-semibold  text-red-950 leading-tight font-playfair"
                      >
                        Party Hall
                      </motion.p>
            <motion.h1
            ref={titleRef}
            variants={fadeRight}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ duration: 1 }} 
            className="text-4xl md:text-5xl font-semibold mt-1 text-black leading-tight text-shadow-sm font-dm">
              A Perfect Venue for Celebrations
            </motion.h1>

            <motion.p
            ref={textRef}
            variants={fadeRight}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
             className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3 mt-2">
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
