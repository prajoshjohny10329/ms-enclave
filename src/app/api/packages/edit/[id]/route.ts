import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Package from "@/models/Package";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIXED
    await connectDB();

    const pkg = await Package.findById(id);

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (err) {
    console.error("GET Package Error:", err);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIXED
    await connectDB();

    const body = await req.json();

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (err) {
    console.error("PUT Package Error:", err);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIXED
    
    await connectDB();
    await Package.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Package Error:", err);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
