"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SinglePackagePage() {
  const { slug } = useParams(); // ✅ FIX

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    const fetchPackage = async () => {
      const res = await fetch(`/api/packages/${slug}`);
      const data = await res.json();

      if (data.success) setPkg(data.data);
      setLoading(false);
    };

    fetchPackage();
  }, [slug]);

  if (loading)
    return <p className="text-center text-black p-10">Loading...</p>;

  if (!pkg)
    return <p className="text-center text-red-500 p-10">Package not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-1 bg-gray-300 rounded"
      >
        ← Back
      </button>

      <img
        src={pkg.image}
        className="w-full h-64 object-cover rounded"
        alt={pkg.packageName}
      />

      <h1 className="text-3xl font-bold text-black mt-4">
        {pkg.packageName}
      </h1>

      <p className="text-gray-700 mt-2">{pkg.description}</p>

      <div className="mt-4 text-black space-y-1">
        <p>Indian Price: ₹ {pkg.indianPrice}</p>
        <p>Foreign Price: $ {pkg.foreignPrice}</p>
        <p>Max Adults: {pkg.maxAdults}</p>
        <p>Max Children: {pkg.maxChildren}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => router.push(`/admin/packages/edit/${pkg._id}`)}
        >
          Edit Package
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            if (!confirm("Confirm delete?")) return;
            await fetch(`/api/packages/edit/${pkg._id}`, { method: "DELETE" });
            router.push("/admin/packages");
          }}
        >
          Delete Package
        </button>
      </div>
    </div>
  );
}
