"use client";
import React from 'react'
import { tShirts } from "@/data/data"
import ProductTile from '../components/ProductTile'


function TShirts() {
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

export default TShirts