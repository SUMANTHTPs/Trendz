import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    let products = await Product.find();
    let tShirts: any = {};
    for (let item of products) {
      if (item.title in tShirts) {
        if (
          !tShirts[item.title].color.includes(item.color) &&
          item.availableQuantity > 0
        ) {
          tShirts[item.title].color.push(item.color);
        }
        if (
          !tShirts[item.title].size.includes(item.size) &&
          item.availableQuantity > 0
        ) {
          tShirts[item.title].size.push(item.size);
        }
      } else {
        tShirts[item.title] = JSON.parse(JSON.stringify(item));
        if(item.availableQuantity > 0) {
          tShirts[item.title].color = [item.color]
          tShirts[item.title].size = [item.size]
        }
      }
    }
    console.log
    return NextResponse.json({ status: 200, tShirts });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    let newProduct = new Product({
      title: requestBody.title,
      slug: requestBody.slug,
      description: requestBody.description,
      img: requestBody.img,
      category: requestBody.category,
      price: requestBody.price,
      availableQuantity: requestBody.availableQuantity,
    });
    await newProduct.save();
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
