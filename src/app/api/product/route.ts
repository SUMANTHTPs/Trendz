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
    const mugs = await getProducts("mugs");
    return NextResponse.json({ status: 200, tShirts, hoodies, mugs, products });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();

    if (!Array.isArray(requestBody)) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          msg: "Invalid request body",
        },
        {
          status: 400,
        }
      );
    }
    await Product.insertMany(requestBody);

    return NextResponse.json(
      {
        success: true,
        msg: "Products inserted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal server error",
        error: error,
      },
      {
        status: 500,
      }
    );
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
      return NextResponse.json(
        {
          success: false,
          msg: "Product not found!",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        msg: "Product updated",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal server error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
