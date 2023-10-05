import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    let products = await Product.find({ category: "tshirts" });
    let tShirts: any = {};

    for (let item of products) {
      const { title, color, size, availableQuantity } = item;
      if (title in tShirts) {
        if (!tShirts[title].color.includes(color) && availableQuantity > 0) {
          tShirts[title].color.push(color);
        }
        if (!tShirts[title].size.includes(size) && availableQuantity > 0) {
          tShirts[title].size.push(size);
        }
      } else {
        tShirts[title] = JSON.parse(JSON.stringify(item));
        if (availableQuantity > 0) {
          tShirts[title].color = [color];
          tShirts[title].size = [size];
        }
      }
    }
    products = await Product.find();
    return NextResponse.json({ status: 200, tShirts, products });
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
    const similarProductExists = await Product.findOne({
      slug: requestBody.slug,
    });

    if (similarProductExists) {
      return NextResponse.json({
        status: 401,
        message: "slug should be unique",
      });
    }
    let newProduct = new Product({
      title: requestBody.title,
      slug: requestBody.slug,
      description: requestBody.description,
      img: requestBody.img,
      category: requestBody.category,
      size: requestBody.size,
      color: requestBody.color,
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
