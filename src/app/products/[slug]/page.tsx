"use client";
import React from "react"
import { useAppSelector } from "@/redux/store";
import SizeOptions from "@/app/components/SizeOptions";
import ColorOptions from "@/app/components/ColorOptions";
import Ratings from "@/app/components/Ratings";
import ServiceabilityCheck from "@/app/components/ServiceabilityCheck";
import ProductActionButtonsContainer from "@/app/components/ProductActionButtonsContainer";

export default function Product({ params }: ProductProps) {
    // Redux states
    const { products, tShirts, mugs, hoodies } = useAppSelector(store => store.product);

    const productIdParam = params.slug;

    // Fetch product details based on states.
    let product: any = products?.find((product: any) => product.slug === productIdParam)
    const productCategory = product.category
    if (productCategory === "tshirts") {
        product = Object.values(tShirts).find((item: any) => item.slug === productIdParam)
    } else if (productCategory === "mugs") {
        product = Object.values(mugs).find((item: any) => item.slug === productIdParam)
    } else if (productCategory === "hoodies") {
        product = Object.values(hoodies).find((item: any) => item.slug === productIdParam)
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt={`product ${product.title}`} className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded hover:p-2" src={product?.img} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">TRENDZ</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {product?.title}
                        </h1>
                        <Ratings />
                        <p className="leading-relaxed">{product?.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3 capitalize">color</span>
                                <ColorOptions product={product} />
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3 capitalize">size</span>
                                <SizeOptions product={product} />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="title-font font-medium text-2xl text-gray-900">₹{product?.price} /-</span>
                            <ProductActionButtonsContainer productIdParam={productIdParam} />
                        </div>
                        <ServiceabilityCheck />
                    </div>
                </div>
            </div>
        </section>
    );
}
