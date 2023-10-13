import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: "Incorrect username/password", msg: "User exists with email" }, { status: 401, })
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ success: false, error: "Incorrect username/password", msg: "Invalid credentials" }, { status: 401, })
        }

        // create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.SECRET!);

        // create next response
        const response = NextResponse.json({
            msg: "Logged in successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        }, {
            status: 200,
        })

        // set cookies
        response.cookies.set("token", token, { httpOnly: true })
        return response;

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error, msg: "Something went wrong" }, { status: 500, })
    }
}