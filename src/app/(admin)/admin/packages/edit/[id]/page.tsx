"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type GalleryImage = {
  url: string;
  publicId: string;
};

export default function EditPackagePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

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
  // FETCH PACKAGE
  // ------------------------------------
  useEffect(() => {
    const fetchPackage = async () => {
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
      setGallery(p.images || []);
      setLoading(false);
    };

    fetchPackage();
  }, [id]);

  // ------------------------------------
  // INPUT HANDLER
  // ------------------------------------
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ------------------------------------
  // IMAGE UPLOAD (CLOUDINARY)
  // ------------------------------------
  const uploadImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    return res.json();
  };

  // ------------------------------------
  // MAIN IMAGE CHANGE
  // ------------------------------------
  const handleMainImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploaded = await uploadImage(file);
    setUploading(false);

    setImagePreview(uploaded.secure_url);
    setFormData((prev) => ({
      ...prev,
      image: uploaded.secure_url,
      imagePublicId: uploaded.public_id,
    }));
  };

  // ------------------------------------
  // DRAG & DROP GALLERY
  // ------------------------------------
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setNewGalleryFiles(files);
    setGalleryPreview(files.map((f) => URL.createObjectURL(f)));
  };

  // ------------------------------------
  // SUBMIT UPDATE
  // ------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setUploading(true);

  try {
    let uploadedGallery: GalleryImage[] = [];

    for (const file of newGalleryFiles) {
      const img = await uploadImage(file);
      uploadedGallery.push({
        url: img.secure_url,
        publicId: img.public_id,
      });
    }

    const res = await axios.put(`/api/packages/edit/${id}`, {
      ...formData,
      amenities: formData.amenities.split(",").map(a => a.trim()),
      images: [...gallery, ...uploadedGallery], // ✅ updated gallery
      removedImages, // ✅ removed images
    });

    const data = res.data; // ✅ Axios response

    console.log(data);

    if (data.success) {
      toast.success("Package Updated Successfully!");
      router.push(`/admin/packages/${data.data.slug}`);
    } else {
      toast.error(data.message || "Package Not Updated");
    }
  } catch (error: any) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  } finally {
    setUploading(false);
  }
};


  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-4">Edit Package</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="packageName"
          value={formData.packageName}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Package Name"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="indianPrice"
          value={formData.indianPrice}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="foreignPrice"
          value={formData.foreignPrice}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="maxAdults"
          value={formData.maxAdults}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="maxChildren"
          value={formData.maxChildren}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Amenities"
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
          Available
        </label>

        {/* MAIN IMAGE */}
        <div>
          <label>Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
          />
          {imagePreview && (
            <img src={imagePreview} className="w-40 h-40 mt-2 object-cover" />
          )}
        </div>

        {/* EXISTING GALLERY */}
        <div>
          <label className="font-medium">Existing Gallery</label>

          <div className="flex gap-3 flex-wrap mt-3">
            {gallery.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.url}
                  className="w-24 h-24 object-cover rounded border"
                />

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setGallery((prev) => prev.filter((_, idx) => idx !== i));
                    setRemovedImages((prev) => [...prev, img.publicId]);
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white
             text-xs rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DRAG & DROP */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed p-6 text-center rounded"
        >
          Drag & Drop New Gallery Images
        </div>

        <div className="flex gap-2 flex-wrap">
          {galleryPreview.map((img, i) => (
            <img key={i} src={img} className="w-24 h-24 object-cover" />
          ))}
        </div>

        

        <button
          disabled={uploading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {uploading ? "Updating..." : "Update Package"}
        </button>
      </form>
    </div>
  );
}
