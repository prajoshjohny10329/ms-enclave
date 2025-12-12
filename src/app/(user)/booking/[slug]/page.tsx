"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [pkg, setPkg] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
  const [stayType, setStayType] = useState("single");
  const [nights, setNights] = useState(1);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    adults: "",
    children: "",
    date: "",
  });

  const [roomsNeeded, setRoomsNeeded] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [maxAvailableRooms, setMaxAvailableRooms] = useState(10);

  useEffect(() => {
    if (!(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`/api/packages/${slug}`);
        setPkg(res.data.data);
        setMaxAvailableRooms(res.data.data.maxRooms ?? 10);
        setLoading(false);

        if (session?.user) {
          setForm((prev) => ({
            ...prev,
            fullName: session.user.name || "",
            email: session.user.email || "",
            phone: session.user.phone || "",
          }));
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (slug) loadData();
  }, [slug, session]);

  // -------- GST FUNCTION ----------
  const applyGST = (amount: number) => {
    const gst = amount * 0.18; // 18% GST
    return amount + gst;
  };

  // -------- RAZORPAY PAYMENT ----------
  const handleRazorpayPayment = async (booking: any) => {
    try {
      const res = await axios.post("/api/payments/razorpay", {
        amount: booking.totalPrice,
        currency: "INR",
        bookingId: booking._id,
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: session?.user?.phone,
        },
      });

      const order = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Your Hotel Name",
        description: `Booking #${booking._id}`,
        order_id: order.id,
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: session?.user?.phone || "",
        },
        handler: async function (response: any) {
          await axios.post("/api/bookings/confirm-payment", {
            bookingId: booking._id,
            paymentMethod: "razorpay",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
          alert("Payment successful!");
          router.push("/bookings");
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment.");
    }
  };

  // ---------- STRIPE PAYMENT ----------
  const handleStripePayment = async (booking: any) => {
    try {
      const res = await axios.post("/api/payments/stripe", {
        amount: booking.totalPrice,
        currency: "USD",
        bookingId: booking._id,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Stripe payment failed:", err);
      alert("Failed to initiate Stripe payment");
    }
  };

  // ---------- INPUT CHANGE ----------
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (value < 0) return;

    const updated = { ...form, [name]: value };

    const adults = Number(name === "adults" ? value : form.adults);
    const children = Number(name === "children" ? value : form.children);

    const roomsNeeded = Math.max(
      Math.ceil(adults / pkg.maxAdults),
      Math.ceil(children / pkg.maxChildren)
    );

    if (roomsNeeded > maxAvailableRooms) {
      setWarning(
        "Maximum room availability reached. Please contact M.S. Enclave."
      );
      return;
    }

    setWarning("");
    setForm(updated);
    calculateBooking(updated);
  };

  // ---------- CALCULATE BOOKING (WITH GST) ----------
  const calculateBooking = (formData: any) => {
    const adults = Number(formData.adults);
    const children = Number(formData.children);

    if (!adults) return;

    const maxA = pkg.maxAdults;
    const maxC = pkg.maxChildren;

    const roomsForAdults = Math.ceil(adults / maxA);
    const roomsForChildren = Math.ceil(children / maxC);

    let rooms = Math.max(roomsForAdults, roomsForChildren);

    if (rooms > maxAvailableRooms) {
      setWarning(
        "Maximum room availability reached. Please contact M.S. Enclave."
      );
      return;
    }

    setWarning("");
    setRoomsNeeded(rooms);

    // 🔥 Avoid session null error
    if (!session?.user) return;

    // 🔥 Select price based on nationality
    const price =
      session.user.nationality === "India" ? pkg.indianPrice : pkg.foreignPrice;

    // 🔥 Calculate base price using nights
    const baseAmount = rooms * price * nights;

    // 🔥 Apply GST (option B: for ALL users)
    setTotalPrice(applyGST(baseAmount));
  };

  // ---------- NIGHTS CHANGE (WITH GST) ----------
  const handleNightChange = (e: any) => {
    const value = Number(e.target.value);
    setNights(value);

    // 🔥 Avoid null error
    if (!session?.user) return;

    if (roomsNeeded > 0) {
      // 🔥 Choose price based on nationality
      const price =
        session.user.nationality === "India"
          ? pkg.indianPrice
          : pkg.foreignPrice;

      // 🔥 Calculate base amount with nights
      const baseAmount = roomsNeeded * price * value;

      // 🔥 Apply GST (Option B — for all users)
      setTotalPrice(applyGST(baseAmount));
    }
  };

  // ---------- Stay Type Change ----------
  const handleStayTypeChange = (e: any) => {
    const value = e.target.value;
    setStayType(value);

    if (!session || !session.user) return; // 🔥 FIXED

    if (value === "single") {
      setNights(1);

      if (roomsNeeded > 0) {
        const price =
          session.user.nationality === "India"
            ? pkg.indianPrice
            : pkg.foreignPrice;

        const baseAmount = roomsNeeded * price;

        setTotalPrice(applyGST(baseAmount)); // GST for everyone
      }
    }
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    if (!session?.user?.id) return router.push("/login");

    try {
      const res = await axios.post("/api/bookings", {
        ...form,
        userId: session.user.id,
        packageId: pkg._id,
        roomsNeeded,
        totalPrice,
        nights,
        status: "pending",
      });

      const booking = res.data;

      if (session.user.nationality === "India") {
        await handleRazorpayPayment(booking);
      } else {
        await handleStripePayment(booking);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Booking failed.");
    }
  };

  if (loading) return <p className="p-10">Loading package...</p>;
  if (!pkg) return <p className="p-10 text-red-600">Package not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Book: {pkg.packageName}</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <img
            src={pkg.image}
            className="w-full h-64 object-cover rounded-lg shadow"
          />
          <h2 className="text-xl font-semibold mt-6">Description</h2>
          <p className="text-gray-700 mt-2">{pkg.description}</p>

          <h3 className="text-lg font-semibold mt-4">Price Per Room </h3>

          {session?.user ? (
            <p className="text-gray-800">
              {session.user.nationality === "India" ? "₹" : "$"}
              {session.user.nationality === "India"
                ? pkg.indianPrice
                : pkg.foreignPrice}
            </p>
          ) : (
            <p className="text-gray-600">Login to view price</p>
          )}

          <h3 className="text-lg font-semibold mt-4">Capacity</h3>
          <p>Max Adults: {pkg.maxAdults}</p>
          <p>Max Children: {pkg.maxChildren}</p>

          <h3 className="text-lg font-semibold mt-4">Available Rooms</h3>
          <p>{maxAvailableRooms} rooms available</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 border rounded-xl shadow bg-white">
          <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="fullName"
              value={form.fullName}
              disabled
              className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
            />

            <input
              name="email"
              value={form.email}
              disabled
              className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
            />

            <input
              name="phone"
              value={form.phone}
              disabled
              className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
            />

            <input
              name="adults"
              type="number"
              min="1"
              value={form.adults}
              onChange={handleChange}
              placeholder="Adults"
              required
              className="w-full p-3 border rounded"
            />

            <input
              name="children"
              type="number"
              min="0"
              value={form.children}
              onChange={handleChange}
              placeholder="Children"
              className="w-full p-3 border rounded"
            />

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />

            {/* Stay Type */}
            <div className="space-y-2">
              <p className="font-semibold">Stay Duration</p>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stayType"
                  value="single"
                  checked={stayType === "single"}
                  onChange={handleStayTypeChange}
                />
                One Night
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stayType"
                  value="multiple"
                  checked={stayType === "multiple"}
                  onChange={handleStayTypeChange}
                />
                Multiple Nights
              </label>
            </div>

            {stayType === "multiple" && (
              <div>
                <label className="block font-semibold mb-1">
                  Number of Nights
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={nights}
                  onChange={handleNightChange}
                  className="w-full p-3 border rounded"
                />
              </div>
            )}

            {roomsNeeded > 0 && session?.user && (
              <div className="bg-gray-100 p-4 rounded-lg border">
                <p>
                  <strong>Rooms Needed:</strong> {roomsNeeded}
                </p>

                {/* Determine price & currency */}
                {(() => {
                  const isIndian = session.user.nationality === "India";
                  const price = isIndian ? pkg.indianPrice : pkg.foreignPrice;
                  const currency = isIndian ? "₹" : "$";
                  const baseAmount = roomsNeeded * price * nights;
                  const gstAmount = baseAmount * 0.18;

                  return (
                    <>
                      {/* Base Price */}
                      <p>
                        <strong>Base Price:</strong> {currency}
                        {baseAmount}
                      </p>

                      {/* GST */}
                      <p>
                        <strong>GST (18%):</strong> {currency}
                        {gstAmount.toFixed(2)}
                      </p>

                      {/* Total Price */}
                      <p>
                        <strong>Total Price (With GST):</strong> {currency}
                        {totalPrice}
                      </p>
                    </>
                  );
                })()}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Submit Booking
            </button>
          </form>

          {message && <p className="text-center mt-4">{message}</p>}
        </div>
      </div>

      {warning && (
        <p className="text-red-600 bg-red-100 p-2 rounded mt-2 text-sm">
          {warning}
        </p>
      )}

      {/* Payment Section */}
      {totalPrice > 0 && (
        <div className="mt-10 p-6 border bg-white rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Proceed to Payment</h2>
          <p className="text-gray-700 mt-2">
            Total Amount: <strong>₹{totalPrice}</strong>
          </p>

          <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
