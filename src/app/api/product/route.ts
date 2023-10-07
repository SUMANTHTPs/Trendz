import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "../utils";

connect();

export async function GET(request: NextRequest) {
  try {
    const products = await Product.find();
    const tShirts = await getProducts("tshirts");
    const hoodies = await getProducts("hoodies");
    return NextResponse.json({ status: 200, tShirts, hoodies, products });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    if (!Array.isArray(requestBody)) {
      return NextResponse.json({ status: 400, error: "Invalid request body" });
    }
    await Product.insertMany(requestBody);

    return NextResponse.json({ status: 200, success: true });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { _id } = requestBody;
    const updatedProduct = await Product.findByIdAndUpdate(_id, requestBody, {
      new: true,
    });
    if (!updatedProduct) {
      return NextResponse.json({ status: 404, message: "Product not found!" });
    }
    return NextResponse.json({ status: 200, message: "Product updated" });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
}
