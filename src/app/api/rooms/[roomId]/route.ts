import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";

export async function GET(req: Request, context: { params: Promise<{ roomId: string }> }) {
  try {
    // ✅ Unwrap the params Promise
    const { roomId } = await context.params;

    await connectDB();

    const room = await Room.findById(roomId);

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { message: "Error fetching room", error },
      { status: 500 }
    );
  }
}
