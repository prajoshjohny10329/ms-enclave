"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddPackage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();
  

  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    indianPrice: "",
    foreignPrice: "",
    maxAdults: "",
    maxChildren: "",
    amenities: "",
    availability: true,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= MAIN IMAGE =================
  const handleMainImage = (file: File | null) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= DRAG & DROP =================
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setGalleryImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(previews);
  };

  // ================= UPLOAD =================
  const uploadSingleImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    return res.json();
  };

  const uploadGalleryImages = async () => {
    const uploaded = [];
    for (const file of galleryImages) {
      const data = await uploadSingleImage(file);
      uploaded.push({ url: data.secure_url, publicId: data.public_id });
    }
    return uploaded;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const mainImage = await uploadSingleImage(image as File);
      const gallery = await uploadGalleryImages();

      const payload = {
        ...formData,
        amenities: formData.amenities.split(","),
        image: {
          url: mainImage.secure_url,
          public_id: mainImage.public_id,
        },
        images: gallery,
      };

      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log(data);
      

      if (res.ok && data.success) {
        toast.success("Package Created Successfully");
        router.push(`/admin/packages/${data.data.slug}`);
      } else {
        toast.error(data.message || "Package Not Created");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Add New Package</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 text-black">
        <input
          name="packageName"
          placeholder="Package Name"
          className="border p-2"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="indianPrice"
          type="number"
          placeholder="Indian Price"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="foreignPrice"
          type="number"
          placeholder="Foreign Price"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="maxAdults"
          type="number"
          placeholder="Max Adults"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="maxChildren"
          type="number"
          placeholder="Max Children"
          className="border p-2"
          onChange={handleChange}
        />

        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          className="border p-2"
          onChange={handleChange}
        />

        {/* MAIN IMAGE */}
        <div>
          <label className="font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleMainImage(e.target.files?.[0] || null)}
          />

          {preview && (
            <img
              src={preview}
              className="w-40 h-40 mt-2 rounded object-cover"
            />
          )}
        </div>

        {/* DRAG & DROP */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed p-6 rounded text-center bg-gray-50"
        >
          <p className="text-sm text-gray-600">
            Drag & Drop Gallery Images Here
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {galleryPreview.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>

        <button
          disabled={uploading}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {uploading ? "Uploading..." : "Save Package"}
        </button>
      </form>
    </div>
  );
}
