"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPackages = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    if (data.success) setPackages(data.data);
    setLoading(false);
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    await fetch(`/api/packages/edit/${id}`, { method: "DELETE" });
    setPackages(packages.filter((p) => p._id !== id));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) return <p className="text-center text-black p-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">All Packages</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border rounded shadow bg-white overflow-hidden">

            <img src={pkg.image} className="h-52 w-full object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-bold text-black">{pkg.packageName}</h2>

              <p className="text-gray-700 text-sm">{pkg.description}</p>

              <div className="mt-3 text-sm text-black">
                <p>₹ {pkg.indianPrice} — ${pkg.foreignPrice}</p>
                <p>Max Adults: {pkg.maxAdults}</p>
                <p>Max Children: {pkg.maxChildren}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => router.push(`/admin/packages/${pkg.slug}`)}
                >
                  View
                </button>

                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => router.push(`/admin/packages/edit/${pkg._id}`)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deletePackage(pkg._id)}
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
