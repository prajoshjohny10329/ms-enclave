"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await axios.get("/api/packages");
        setPackages(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading) return <p className="p-10">Loading Packages...</p>;

  return (
    <section>
      <Breadcrumb
              heading="Discover Our Packages"
              bgImage="/images/common/ms-enclave-26.webp" 
              items={[{ label: "Our Packages", href: "/packages" }]}
        />
      <div className="max-w-6xl mx-auto py-10 px-4 text-black">
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg: any) => (
          <div key={pkg._id} className="border rounded-xl shadow p-4 bg-white">
            
            {/* Image */}
            <img
              src={pkg.image}
              className="w-full h-48 object-cover rounded-lg"
              alt={pkg.packageName}
            />

            {/* Name */}
            <h2 className="text-xl font-semibold mt-4">{pkg.packageName}</h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{pkg.description}</p>

            {/* Prices */}
            <div className="mt-4">
              <p className="text-gray-800">
                <span className="font-medium">Indian Price:</span> ₹ {pkg.indianPrice}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Foreign Price:</span> $ {pkg.foreignPrice}
              </p>
            </div>

            {/* Book Now Button */}
            <Link
              href={`/booking/${pkg.slug}`}
              className="block text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
