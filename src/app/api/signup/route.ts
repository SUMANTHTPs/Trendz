import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { name, email, password } = requestBody;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.json({ status: 401, error: "Duplicate email" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      success: true,
      message: "User add successfully",
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error });
  }
}
