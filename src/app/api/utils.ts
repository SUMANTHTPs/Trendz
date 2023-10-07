import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function getProducts(productType: string) {
  try {
    let categorizedProducts = await Product.find({ category: productType });
    let product: any = {};

    for (let item of categorizedProducts) {
      const { title, color, size, availableQuantity } = item;
      if (title in product) {
        if (!product[title].color.includes(color) && availableQuantity > 0) {
          product[title].color.push(color);
        }
        if (!product[title].size.includes(size) && availableQuantity > 0) {
          product[title].size.push(size);
        }
      } else {
        product[title] = JSON.parse(JSON.stringify(item));
        if (availableQuantity > 0) {
          product[title].color = [color];
          product[title].size = [size];
        }
      }
    }
    return product;
  } catch (error: any) {
    NextResponse.json({ status: 500, message: "Something went wrong" });
  }
}
