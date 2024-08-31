import dbconnect from "@/lib/mongoDb";
import User from "@/models/User";
import Stream from "@/models/Stream";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbconnect();
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const id = searchParams.get("of");
  try {
    const user = await User.findOne({ _id: id });
    const stream = await Stream.findOne({
      user: user._id,
      status: true,
    }).populate({ path: "user", select: "username" });

    if (!stream) {
      return NextResponse.json({ success: false });
    }
    let mediaurl;
    mediaurl = `http://localhost:8000/live/${user.streamKey}/index.m3u8`;
    return NextResponse.json(
      { success: true, mediaurl, stream },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
