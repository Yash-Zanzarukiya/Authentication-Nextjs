import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody: ", reqBody);

    const { email, password } = reqBody; // validations

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User does not exists" }, { status: 400 });

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword)
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json(
      { message: "Logged in Successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
