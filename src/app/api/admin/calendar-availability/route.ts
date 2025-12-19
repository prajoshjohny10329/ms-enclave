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

   // Start and end dates of the month
  const start = new Date(year, month, 1);
  start.setHours(0, 0, 0, 0); // normalize to midnight

  const end = new Date(year, month + 1, 1); // last day of month
  end.setHours(23, 59, 59, 999); // include full day

  const bookings = await Booking.find({
    status: { $ne: "cancelled" },
    checkInDate: { $lte: end },
    checkOutDate: { $gte: start },
  });

  const days: any = {};

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = new Date(d);
    const booked = bookings
      .filter(
        b => b.checkInDate < day && b.checkOutDate > day
      )
      .reduce((s, b) => s + b.roomsNeeded, 0);

    days[day.toISOString().slice(0, 10)] = {
      booked,
      available: totalRooms - booked,
    };
  }

  console.log(days);
  

  return NextResponse.json(days);
}
