import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Package from "@/models/Package";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Destructure image object into two strings
    const imageUrl = body.image?.url;
    const imagePublicId = body.image?.public_id;

    if (!imageUrl || !imagePublicId) {
      return NextResponse.json(
        { error: "Image URL and Public ID are required" },
        { status: 400 }
      );
    }

    const newPackage = await Package.create({
      packageName: body.packageName,
      description: body.description,
      slug: body.packageName.toLowerCase().replace(/\s+/g, "-"),
      image: imageUrl,
      imagePublicId: imagePublicId,
      indianPrice: Number(body.indianPrice),
      foreignPrice: Number(body.foreignPrice),
      maxAdults: Number(body.maxAdults),
      maxChildren: Number(body.maxChildren),
      amenities: body.amenities,
      availability: body.availability,
      category: body.category || "General",
      isActive: true,
    });

    return NextResponse.json({ success: true, data: newPackage });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const packages = await Package.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}