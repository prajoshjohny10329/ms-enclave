"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/common/Breadcrumb";
import NationalitySelector from "@/components/common/NationalitySelector";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { validateUserProfile } from "@/utils/validateUserProfile";

interface Profile {
  name: string;
  phone: string;
  nationality: string;
  address: string;
  image: string;
}

export default function UserProfile() {
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
    image: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error('Please Log In')
      router.push("/login");
    }

    if (session?.user) {
      validateUserProfile(session.user);

      const { name, phone, nationality, address, image } = session.user as any;

      if (phone || nationality || address) {
        setProfile({ name, phone, nationality, address, image });
        
        setIsEditing(false);
      } else {
        setForm({
          name: name || "",
          phone: "",
          nationality: "",
          address: "",
          image: image,
        });
      }
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    console.log(session.user.email);
    

    try {
      const { data } = await axios.post("/api/profile", {
        email: session.user.email,
        ...form,
      });
      console.log("session.user.id");

      console.log(data);
      


      session.user.id = data.user._id.toString();
      session.user.phone = data.user.phone || "";
      session.user.nationality = data.user.nationality || "India";
      session.user.address = data.user.address || "";

      setProfile(form);
      setIsEditing(false);
      router.push(callbackUrl || "/profile");

      toast.success("Profile Edited successfully");
    } catch (error) {
      console.log(error);
      
      toast.loading("Profile Edited Error");
    }
  };

  const handleEdit = () => {
    if (profile) setForm(profile);
    setIsEditing(true);
  };

  if (status === "loading") return <Loader />;

  return (
    <>
      <div className="mx-auto bg-white p-10  text-black">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 mx-auto space-y-6 text-black font-dm"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-black leading-tight text-shadow-sm">
                Personal Details
              </h2>
              <p className="text-gray-950 font-medium text-lg leading-relaxed mb-8 font-dm">
                Update your personal information below
              </p>
              <Image
                src={form.image || "/images/default-avatar.png"}
                alt="Profile image"
                width={70}
                height={70}
                className="rounded-full my-5"
              />
            </div>

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* NATIONALITY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <div className="border border-gray-300 rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500">
                <NationalitySelector
                  value={form.nationality}
                  onChange={(label) => setForm({ ...form, nationality: label })}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                required
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 pt-4">
              <button
              onClick={() => setIsEditing(false)}
                type="button"
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 text-black  text-lg">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-black leading-tight text-shadow-sm">
                Personal Details
              </h2>
              <p className="text-gray-950 font-medium text-lg leading-relaxed mb-8 font-dm">
                Update your personal information below
              </p>
              <Image
                src={profile?.image || ""}
                alt="Profile image"
                width={70}
                height={70}
                className="rounded-full my-5"
              />
            </div>
            <div className="overflow-x-auto max-w-3xl font-dm ">
              <table className="w-full ">
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-4 font-bold text-lg text-gray-950 font-dm w-1/3">
                      Name
                    </td>
                    <td className="py-4 text-lg text-gray-950 font-light font-dm">
                      {profile?.name || "-"}
                    </td>
                    <td className="py-4 text-left">
                      <button
                        onClick={handleEdit}
                        className="text-gray-500 underline hover:text-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-4 font-bold text-lg text-gray-950 font-dm">
                      Phone Number
                    </td>
                    <td className="py-4 text-lg text-gray-950 font-light font-dm">
                      {profile?.phone || "-"}
                    </td>
                    <td className="py-4 text-left">
                      <button
                        onClick={handleEdit}
                        className="text-gray-500 underline hover:text-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-4 font-bold text-lg text-gray-950 font-dm">
                      Nationality
                    </td>
                    <td className="py-4 text-lg text-gray-950 font-light font-dm">
                      {profile?.nationality || "-"}
                    </td>
                    <td className="py-4 text-left">
                      <button
                        onClick={handleEdit}
                        className="text-gray-500 underline hover:text-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-4 font-bold text-lg text-gray-950 font-dm">
                      Address
                    </td>
                    <td className="py-4 text-lg text-gray-950 font-light font-dm">
                      {profile?.address || "-"}
                    </td>
                    <td className="py-4 text-left">
                      <button
                        onClick={handleEdit}
                        className="text-gray-500 underline hover:text-blue-600"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
