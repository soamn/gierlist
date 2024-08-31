import { NextResponse } from "next/server";
import dbconnect from "@/lib/mongoDb";
import User from "@/models/User";
import Stream from "@/models/Stream";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbconnect();

  const { token, streamName, streamDescription } = await req.json();

  if (!token || !streamName) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const stream = await Stream.create({
      streamName,
      streamDescription,
      user: user._id,
      status: true,
    });

    user.stream.push(stream._id);
    await user.save();

    return NextResponse.json({ success: true, stream, user }, { status: 201 });
  } catch (error) {
    console.error("Error creating stream:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
