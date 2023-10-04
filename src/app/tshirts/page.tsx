import React from 'react'
import { tShirts } from "@/data/data"
import ProductTile from '../components/ProductTile'
import mongoose from 'mongoose'
import Product from '@/models/Product'


function TShirts({ products }: any) {
  console.log(products)
  let shirts = tShirts.filter((shirt) => shirt.productType === "T shirts")
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 gap-5 justify-center">
          {shirts.map((shirt) => {
            return (
              <ProductTile key={shirt.slug} product={shirt} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// export async function getServerSideProps(context: any) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI!)
//   }
//   let products = await Product.find({ category: "tshirts" })
//   let tShirts: any = {};
//   for (let item of products) {
//     const { title, color, size, availableQuantity } = item;
//     if (title in tShirts) {
//       if (!tShirts[title].color.includes(color) && availableQuantity > 0) {
//         tShirts[title].color.push(color);
//       }
//       if (!tShirts[title].size.includes(size) && availableQuantity > 0) {
//         tShirts[title].size.push(size);
//       }
//     } else {
//       tShirts[title] = JSON.parse(JSON.stringify(item));
//       if (availableQuantity > 0) {
//         tShirts[title].color = [color];
//         tShirts[title].size = [size];
//       }
//     }
//   }
//   return {
//     props: { products: JSON.parse(JSON.stringify(tShirts)) }
//   }
// }

export default TShirts