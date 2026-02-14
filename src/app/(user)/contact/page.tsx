"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      alert("Message submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Failed to submit message.");
    }
  } catch (err) {
    alert("Something went wrong.");
  }
};



  return (
    <section className="pb-20 px-6 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb
          heading="Contact Us"
          bgImage="/images/home/ms-slider-0.webp" // ⭐ background image
          items={[{ label: "Contact Us", href: "/contact" }]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
          {/* Left Side – Contact Info */}
          <div className="space-y-6">
            <div>
<h2 className="text-3xl md:text-3xl font-semibold text-black leading-tight text-shadow-sm">Get in Touch</h2>

            <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
              We’d love to hear from you. Reach out for bookings, questions, or
              resort-related inquiries.
            </p>
            </div>
            

            <div>
              <h2 className="text-2xl  font-semibold text-black leading-tight text-shadow-sm"> Address</h2>
              <Link href={'https://maps.app.goo.gl/MvrRJ2aN9SZZsFHL7'} className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
                Mannuparambil, Paruthipully <br />
                Palakkad, Kerala 678573
              </Link>
            </div>

            <div>
              <p className="text-2xl  font-semibold text-black leading-tight text-shadow-sm">Contact Number</p>
              <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
                <Link href="tel:+918589996642" className="hover:text-blue-600">
                  +91 97456 66642
                </Link>
              </p>
              <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
                <Link href="tel:+919945004857" className="hover:text-blue-600">
                  +91 994 500 4857
                </Link>
              </p>
            </div>

            <div>
              <p className="text-2xl  font-semibold text-black leading-tight text-shadow-sm">Email</p>
              <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
                <Link
                  href="mailto:msenclaveresort@gmail.com"
                  className="hover:text-blue-600"
                >
                  msenclaveresort@gmail.com
                </Link>
              </p>
            </div>

            <div className="pt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2076.4752035927186!2d76.51303615225527!3d10.745094795833834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8750079d44dc5%3A0x5290675a530ee53c!2sMS%20ENCLAVE%20HERITAGE%20RESORT!5e0!3m2!1sen!2sin!4v1767093445007!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
                className="rounded-xl border"
              ></iframe>
              
            </div>
          </div>

          {/* Right Side – Contact Form */}
          <div className="bg-white shadow-lg mt-5 p-8 rounded-2xl h-fit">
            <h3 className="text-2xl font-semibold text-black mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 ">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:ring-2  focus:ring-blue-500 placeholder:text-gray-400"
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
