import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request: NextRequest) {
    try {
        const {
            userId,
            products,
            address,
            subTotal,
            status,
        } = await request.json();

        const newOrder = new Order({
            userId,
            products,
            address,
            subTotal,
            status,
        });

        const savedOrder = await newOrder.save();
        return NextResponse.json({ success: true, msg: "Ordered successfully", savedOrder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong, Please try again" }, { status: 500 });
    }
}