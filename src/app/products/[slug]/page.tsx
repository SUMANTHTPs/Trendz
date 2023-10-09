"use client";
import { addToCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import React from "react"
import { AppDispatch, useAppSelector } from "@/redux/store";
import SizeOptions from "@/app/components/SizeOptions";
import ColorOptions from "@/app/components/ColorOptions";

export default function Product({ params }: ProductProps) {
    // Redux states
    const { products, tShirts, mugs, hoodies } = useAppSelector(store => store.product);
    const dispatch = useDispatch<AppDispatch>();

    // Initial states
    const [pinCode, setPinCode] = React.useState("")
    const [serviceable, setServiceable] = React.useState(null)

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

    const checkServiceability = async () => {
        try {
            const response = await axios.post("/api/service-pin-code", pinCode, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { isServiceable } = response.data;
            setServiceable(isServiceable);
        } catch (error) {
            throw new Error("Unable to check service availability")
        }
    }
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded hover:p-2" src={product?.img} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">TRENDZ</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-900" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-900" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-900" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-900" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed">{product?.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                <ColorOptions product={product} />
                            </div>

                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <SizeOptions product={product}/>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="title-font font-medium text-2xl text-gray-900">₹{product?.price} /-</span>
                            <div className="flex gap-3">
                                <button className="flex  text-white bg-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded" onClick={() => dispatch(addToCart(productIdParam))}>Add to cart</button>
                                <button className="flex  text-white bg-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded">Buy now</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <input className="border border-grey-100 px-3 rounded-md w-full" type="text" placeholder="Enter an Indian pincode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                            <button className="flex ml-3 text-white bg-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded" disabled={!pinCode} onClick={checkServiceability}>Check</button>
                        </div>
                        {serviceable && (
                            <p className="text-green-600">Woah!, Free shipping available for your location</p>
                        )}
                        {serviceable !== null && serviceable === false && (
                            <p className="text-red-400">Sorry, we don't deliver to this location</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
