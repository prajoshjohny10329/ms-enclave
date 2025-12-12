import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    console.log(data);
    

    const booking = await Booking.create(data);
    console.log(booking);
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
