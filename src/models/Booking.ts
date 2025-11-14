import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
    
    paymentMethod: { type: String },
    // Razorpay fields
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },

    // Stripe fields
    stripePaymentId: { type: String },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
