"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditPackagePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    indianPrice: "",
    foreignPrice: "",
    maxAdults: "",
    maxChildren: "",
    amenities: "",
    availability: true,
    image: "",
    imagePublicId: "",
  });

  // ------------------------------------
  // 1️⃣ Fetch package by ID
  // ------------------------------------
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`/api/packages/edit/${id}`);
        const p = res.data;

        setFormData({
          packageName: p.packageName,
          description: p.description,
          indianPrice: p.indianPrice,
          foreignPrice: p.foreignPrice,
          maxAdults: p.maxAdults,
          maxChildren: p.maxChildren,
          amenities: p.amenities.join(", "),
          availability: p.availability,
          image: p.image,
          imagePublicId: p.imagePublicId,
        });

        setImagePreview(p.image);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  // ------------------------------------
  // 2️⃣ Handle Input
  // ------------------------------------
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ------------------------------------
  // 3️⃣ Auto Upload Image
  // ------------------------------------
  const uploadImage = async (selectedImage: File) => {
    const body = new FormData();
    body.append("file", selectedImage);

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      setUploading(false);

      return data;
    } catch (error) {
      setUploading(false);
      return null;
    }
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    const uploaded = await uploadImage(file);

    if (uploaded) {
      setFormData((prev) => ({
        ...prev,
        image: uploaded.secure_url,
        imagePublicId: uploaded.public_id,
      }));
    }
  };

  // ------------------------------------
  // 4️⃣ Submit Update
  // ------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`/api/packages/edit/${id}`, {
        ...formData,
        amenities: formData.amenities.split(",").map((a) => a.trim()),
      });

      alert("Package Updated Successfully!");
      router.push("/admin/packages");
    } catch (error) {
      console.error(error);
      alert("Failed to update package");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  // ------------------------------------
  // 5️⃣ Form Validation
  // ------------------------------------
  const isFormValid =
    formData.packageName &&
    formData.description &&
    formData.indianPrice &&
    formData.foreignPrice &&
    formData.maxAdults &&
    formData.maxChildren &&
    formData.image &&
    !uploading;

  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-4">Edit Package</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Package Name</label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="textarea w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Indian Price</label>
            <input
              type="number"
              name="indianPrice"
              value={formData.indianPrice}
              onChange={handleChange}
              className="input w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Foreign Price</label>
            <input
              type="number"
              name="foreignPrice"
              value={formData.foreignPrice}
              onChange={handleChange}
              className="input w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Max Adults</label>
            <input
              type="number"
              name="maxAdults"
              value={formData.maxAdults}
              onChange={handleChange}
              className="input w-full p-2 border rounded"
            />
          </div>

          <div>
            <label>Max Children</label>
            <input
              type="number"
              name="maxChildren"
              value={formData.maxChildren}
              onChange={handleChange}
              className="input w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label>Amenities (comma separated)</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="input w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label>Availability</label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Package Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {uploading && (
            <p className="text-blue-600 mt-2">Uploading image...</p>
          )}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-40 h-40 object-cover mt-3 rounded shadow"
            />
          )}
        </div>

        {/* UPDATE BUTTON */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-6 py-2 rounded text-white transition ${
            !isFormValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {uploading ? "Uploading..." : "Update Package"}
        </button>
      </form>
    </div>
  );
}
