import { NextResponse } from "next/server";
import Room from "@/models/Room";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const room = await Room.create(body);
    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("Error adding room:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add room" },
      { status: 500 }
    );
  }
}

// 🟢 GET: Fetch all rooms
export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find();
    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}