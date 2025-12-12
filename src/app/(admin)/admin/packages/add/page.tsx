"use client";

import React, { useState } from "react";

export default function AddPackage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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

  // Show image preview immediately
  const handleImageSelect = (file: File | null) => {
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const uploadImage = async () => {
    const body = new FormData();
    body.append("file", image as File);

    setUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });
    setUploading(false);

    return res.json();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let uploadedImage = null;

    if (image) {
      uploadedImage = await uploadImage();
    }

    const payload = {
      ...formData,
      amenities: formData.amenities.split(","),
      image: uploadedImage
        ? {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
          }
        : null,
    };

    const res = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    alert("Package Created!");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-black">Add New Package</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          name="packageName"
          placeholder="Package Name"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        <input
          name="indianPrice"
          placeholder="Indian Price"
          type="number"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        <input
          name="foreignPrice"
          placeholder="Foreign Price"
          type="number"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        <input
          name="maxAdults"
          placeholder="Maximum Adults"
          type="number"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        <input
          name="maxChildren"
          placeholder="Maximum Children"
          type="number"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          className="border p-2 text-black"
          onChange={handleChange}
        />

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-medium text-black">Upload Image</label>

          <input
            type="file"
            accept="image/*"
            className="border p-2 text-black mt-2"
            onChange={(e) => handleImageSelect(e.target.files?.[0] || null)}
          />

          {/* Uploading indicator */}
          {uploading && (
            <p className="text-blue-600 mt-2 text-sm font-semibold">
              Uploading image...
            </p>
          )}

          {/* Image Preview */}
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        <button
          className="bg-blue-600 text-white p-2 rounded disabled:bg-blue-300"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Save Package"}
        </button>
      </form>
    </div>
  );
}
