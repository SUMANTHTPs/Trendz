import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

await connect();
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { name, email, password } = requestBody;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Duplicate email", msg: "Email already exists" },
        { status: 401 }
      );
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
    return NextResponse.json(
      {
        success: true,
        message: "User add successfully",
        user: savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error,
        msg: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
