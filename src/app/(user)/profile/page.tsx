"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/common/Breadcrumb";
import NationalitySelector from "@/components/common/NationalitySelector";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

interface Profile {
  name: string;
  phone: string;
  nationality: string;
  address: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>({
    name: "",
    phone: "",
    nationality: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");

    if (session?.user) {
      const { name, phone, nationality, address } = session.user as any;

      if (phone || nationality || address) {
        setProfile({ name, phone, nationality, address });
        setIsEditing(false);
      } else {
        setForm({
          name: name || "",
          phone: "",
          nationality: "",
          address: "",
        });
      }
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    try {
      const { data } = await axios.post("/api/profile", {
        email: session.user.email,
        ...form,
      });

      session.user.id = data.user._id.toString();
      session.user.phone = data.user.phone || "";
      session.user.nationality = data.user.nationality || "India";
      session.user.address = data.user.address || "";

      setProfile(form);
      setIsEditing(false);
      router.push(callbackUrl || "/profile");

      toast.success("Profile Edited successfully");
    } catch (error) {
      toast.loading("Profile Edited Error");
    }
  };

  const handleEdit = () => {
    if (profile) setForm(profile);
    setIsEditing(true);
  };

  if (status === "loading")
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
        <Bars
          height="80"
          width="80"
          color="#000"
          ariaLabel="bars-loading"
          visible={true}
        />
        <p className="text-md text-black text-shadow-md animate-pulse">
          Please wait, loading...
        </p>
      </div>
    );

  return (
    <>
      <Breadcrumb
        heading="Your Profile"
        bgImage="/images/home/ms-slider-1.webp"
        items={[{ label: "Profile", href: "/profile" }]}
      />

      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-black"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {/* ⭐ Nationality Dropdown */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Nationality
              </label>
              <NationalitySelector
                value={form.nationality}
                onChange={(label) => {
                  setForm({ ...form, nationality: label });
                }}
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
              Save & Continue
            </button>
          </form>
        ) : (
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Name:</strong> {profile?.name}
            </p>
            <p>
              <strong>Phone:</strong> {profile?.phone}
            </p>
            <p>
              <strong>Nationality:</strong> {profile?.nationality}
            </p>
            <p>
              <strong>Address:</strong> {profile?.address}
            </p>

            <button
              onClick={handleEdit}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
