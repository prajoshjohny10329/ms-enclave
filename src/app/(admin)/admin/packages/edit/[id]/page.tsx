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

  // ----------------------------
  // 1️⃣ Fetch Package by ID
  // ----------------------------
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

  // ----------------------------
  // 2️⃣ Handle Input Changes
  // ----------------------------
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ----------------------------
  // 3️⃣ Upload Image to /api/upload
  // ----------------------------
  const uploadImage = async () => {
    if (!image) return null;

    const body = new FormData();
    body.append("file", image);

    setUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });
    setUploading(false);

    return res.json();
  };

  // ----------------------------
  // 4️⃣ Handle Image Input
  // ----------------------------
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    // upload instantly
    const uploaded = await uploadImage();

    if (uploaded) {
      setFormData((prev) => ({
        ...prev,
        image: uploaded.secure_url,
        imagePublicId: uploaded.public_id,
      }));
    }
  };

  // ----------------------------
  // 5️⃣ Submit Update
  // ----------------------------
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

  if (loading) return <p>Loading...</p>;

  // ----------------------------
  //  UI
  // ----------------------------
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Package</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">

        <div>
          <label>Package Name</label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="textarea"
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
              className="input"
            />
          </div>

          <div>
            <label>Foreign Price</label>
            <input
              type="number"
              name="foreignPrice"
              value={formData.foreignPrice}
              onChange={handleChange}
              className="input"
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
              className="input"
            />
          </div>

          <div>
            <label>Max Children</label>
            <input
              type="number"
              name="maxChildren"
              value={formData.maxChildren}
              onChange={handleChange}
              className="input"
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
            className="input"
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
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />

          {uploading && <p className="text-blue-500">Uploading image...</p>}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
        </div>

        <button className="bg-black text-white px-6 py-2 rounded">
          Update Package
        </button>
      </form>
    </div>
  );
}
