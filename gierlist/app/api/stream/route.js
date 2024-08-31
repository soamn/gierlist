import Stream from "@/models/Stream";
import dbConnect from "@/lib/mongoDb";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const streams = await Stream.find({ status: true })
      .populate({ path: "user", select: "username " })
      .lean();
    return NextResponse.json({ success: true, streams }, { status: 200 });
  } catch (error) {
    console.error("Error fetching streams:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch streams",
    });
  }
}
