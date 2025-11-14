import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(request: Request, context: { params: Promise<{ userId: string }> }) {
  const { userId } = await context.params;

  try {
    await connectDB();
    const bookings = await Booking.find({ userId })
      .populate({
        path: "roomId",
        model: "Room",
        select: "name images price", // IMPORTANT
      });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
