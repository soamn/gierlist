import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();
  try {
    const user = await User.findOne({ email });

    if (!user) {
      NextResponse.json(
        { sucess: false, message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      NextResponse.json(
        { sucess: false, message: "invalid email or password" },
        { status: 400 }
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ sucess: true, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
