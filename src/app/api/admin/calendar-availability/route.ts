import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import RoomSettings from "@/models/RoomSettings";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const month = Number(searchParams.get("month")); // 0-11
  const year = Number(searchParams.get("year"));

  const settings = await RoomSettings.findOne();
  const totalRooms = settings?.totalRooms || 0;

  // ✅ Month range in UTC (IMPORTANT)
  const start = new Date(Date.UTC(year, month, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  const bookings = await Booking.find({
    status: { $ne: "cancelled" },
    checkInDate: { $lt: end },
    checkOutDate: { $gt: start },
  });

  const days: Record<string, { booked: number; available: number }> = {};

  for (
    let d = new Date(start);
    d <= end;
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    const day = new Date(d);

    const booked = bookings
      .filter(
        b =>
          new Date(b.checkInDate) < day &&
          new Date(b.checkOutDate) > day
      )
      .reduce((s, b) => s + b.roomsNeeded, 0);

    const key = day.toISOString().split("T")[0]; // YYYY-MM-DD (UTC)

    days[key] = {
      booked,
      available: Math.max(totalRooms - booked, 0),
    };
  }

  return NextResponse.json(days);
}
