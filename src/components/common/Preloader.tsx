"use client";

import { useSmoothTyping } from "@/hooks/useTypingEffect";

export default function Preloader() {
  const title = useSmoothTyping("M.S. ENCLAVE", 1500);
  const subtitle = useSmoothTyping("HERITAGE HOME STAY", 2200);
  const location = useSmoothTyping("Paruthipully, Palakkad", 2800);

  return (
    <section className="fixed inset-0 z-[9999] flex items-center justify-center theme-bg backdrop-blur-md">
      <div className="flex flex-col items-center gap-3 text-center">
        
        <h1 className="text-black text-5xl font-semibold tracking-widest">
          {title}
        </h1>

        <p className="text-black/80 text-xl tracking-wide uppercase text-center">
          {subtitle}
        </p>

        <p className="text-black/80 text-lg tracking-wide">
          {location}
        </p>

      </div>
    </section>
  );
}
