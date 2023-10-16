import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    const userOrders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    if (!userOrders.length) {
      return NextResponse.json(
        { success: true, msg: "No order found" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, msg: "Orders fetched successfully", userOrders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong, Please try again", error },
      { status: 500 }
    );
  }
}
