import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .populate("roomId", "name price images")
      .populate("userId", "name email phone nationality")
      .sort({ fromDate: 1 });
    return NextResponse.json(bookings, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching admin bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
