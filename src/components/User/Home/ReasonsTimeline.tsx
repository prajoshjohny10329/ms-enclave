import Image from "next/image";

const reasons = [
  {
    title: "Author’s tour program",
    text: "A fascinating vacation full of impressions.",
    image: "/images/home/ms-slider-0.webp",
  },
  {
    title: "Authentic experiences",
    text: "Explore nature, culture and unforgettable views.",
    image: "/images/home/ms-slider-0.webp",
  },
  {
    title: "Comfortable stays",
    text: "Carefully selected stays with modern amenities.",
    image: "/images/home/ms-slider-0.webp",
  },
  {
    title: "Peaceful locations",
    text: "Relax away from city noise and stress.",
    image: "/images/home/ms-slider-0.webp",
  },
  {
    title: "Memorable journeys",
    text: "Every trip is designed to leave lasting memories.",
    image: "/images/home/ms-slider-0.webp",
  },
];

export default function ReasonsTimeline() {
  return (
    <section className="py-24 bg-white">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-20 px-4">
        <p className="uppercase text-sm tracking-widest text-gray-400">
          About us
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          Five Reasons Why It’s Worth Going
        </h2>
        <p className="italic text-gray-500 mt-1">
          to journey with us
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Center line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-gray-200 -translate-x-1/2" />

        <div className="space-y-20">
          {reasons.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* IMAGE */}
                <div className="md:w-1/2 flex justify-center">
                  <div className="rounded-2xl overflow-hidden shadow-lg w-[260px] h-[180px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* DOT */}
                <div className="hidden md:flex w-12 justify-center relative">
                  <span className="w-4 h-4 bg-gray-900 rounded-full z-10" />
                </div>

                {/* CONTENT */}
                <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-2 max-w-sm mx-auto md:mx-0">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
