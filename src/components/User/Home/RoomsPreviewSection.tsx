import Image from "next/image";
import Link from "next/link";

const RoomsPreviewSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE AREA */}
          <div className="relative">
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/home/ms-slider-2.webp" // replace path
                alt="Luxury Stay"
                width={700}
                height={500}
                className="w-full h-auto object-cover "
              />
            </div>

            {/* Overlapping Image */}
            <div className="absolute -right-10 top-1/3 hidden lg:block">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/temp/pro.jpg" // replace path
                  alt="Interior"
                  width={220}
                  height={260}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="pl-10">
            <h2 className="text-4xl font-dm text-shadow-fuchsia-800 text-blue-900 leading-tight uppercase font-black">
              Comfortable & Spacious Rooms
            </h2>

            <p className="mt-6 font-dm text-black leading-relaxed">
              At M.S. Enclave, we pride ourselves on providing a personalized
              and intimate experience for each guest. Our cozy rooms are
              thoughtfully designed to offer modern amenities while retaining
              the warmth and character of a home away from home.
            </p>

            <p className="mt-4 text-black leading-relaxed">
              Whether you’re traveling for leisure or business, our comfortable
              accommodations ensure a restful night’s sleep.
            </p>

            <Link href="/packages">
              <button className="mt-3 inline-block px-6 py-3 bg-gray-950 text-white rounded-md hover:bg-gray-900 hover:text-white">
                BOOK YOUR STAY NOW
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RoomsPreviewSection;
