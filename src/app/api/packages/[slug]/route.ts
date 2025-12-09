import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Package from "@/models/Package";

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
console.log(context.params);

    const { slug } = await context.params; // ✅ FIX

    console.log("Slug from URL:", slug);

    const pkg = await Package.findOne({ slug });

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pkg });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
