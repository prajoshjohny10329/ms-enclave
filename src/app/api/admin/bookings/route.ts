import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    // Fetch related room and user info manually
    const detailedBookings = await Promise.all(
      bookings.map(async (b) => {
        const room = await Room.findById(b.roomId);
        const user = await User.findById(b.userId);
        return {
          ...b.toObject(),
          roomId: room,
          userId: user,
        };
      })
    );

    return NextResponse.json(detailedBookings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
