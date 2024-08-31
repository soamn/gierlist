import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { username, email, password } = await req.json();
  try {
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return NextResponse.json({
        success: false,
        message: "user already exists",
      });
    }
    const HashedPass = await bcrypt.hash(password, 10);
    const streamKey = await bcrypt.hash(username, 10);
    const user = await User.create({
      username,
      email,
      password: HashedPass,
      streamKey,
    });
    return NextResponse.json({ sucess: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
