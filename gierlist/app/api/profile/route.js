import { NextResponse } from "next/server";
import dbconnect from "@/lib/mongoDb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbconnect();
  try {
    const { token } = await req.json();

    // Verify the token and catch the error if it's expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded token ID
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json({ success: true, user: user }, { status: 201 });
  } catch (error) {
    console.log("Error verifying token:", error.message);

    // If the token is expired or invalid, return an appropriate response
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { success: false, message: "Token expired. Please log in again." },
        { status: 401 }
      );
    } else if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Invalid token. Please log in again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Authentication failed." },
      { status: 401 }
    );
  }
}
