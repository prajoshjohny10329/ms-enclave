// models/Booking.ts
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        packageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: true,
        },

        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },

        roomsNeeded: { type: Number, required: true },

        totalPrice: Number,
        nights: Number,
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Booking ||
    mongoose.model("Booking", BookingSchema);
