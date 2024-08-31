import { NextResponse } from "next/server";
import dbconnect from "@/lib/mongoDb";
import User from "@/models/User";
import Stream from "@/models/Stream";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbconnect();
  try {
    const { token } = await req.json();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    const stream = await Stream.findOneAndDelete({
      user: user._id,
      status: true,
    });
    if (!stream) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ sucess: false }, { status: 400 });
  }
}
