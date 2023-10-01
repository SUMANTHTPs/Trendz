"use client";

import { clearCart, getSubTotal, toggleCartModel } from "@/redux/features/cartSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch } from "react-redux"
import CartItem from "./cartItem";
import React from "react";
import EmptyCart from "./EmptyCart";


function Cart() {
    const { isOpen, cartItems } = useAppSelector((store) => store.CartReducer)
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        dispatch(getSubTotal());
    }, [cartItems])
    return (
        <>
            {isOpen && <div className="fixed right-0 top-0 bg-white w-full sm:w-full md:w-[30vw] h-[100vh] transition-transform duration-900 ease-in-out">
                <div className="flex justify-between items-center">
                    <h1 className="p-5 text-2xl">Your cart items</h1>
                    <AiOutlineClose className="text-2xl mr-2 p-1 hover:bg-gray-200" onClick={() => dispatch(toggleCartModel())} />
                </div>
                {cartItems.map((item) => {
                    return (
                        <CartItem key={item.productId} cartItem={item} />
                    )
                })}
                {cartItems.length === 0 && <EmptyCart />}
                <div className="fixed bottom-0 flex gap-3 p-2 mx-6">
                    <button className='bg-blue-900 w-[40vw] md:w-[13vw] text-white flex items-center justify-center gap-2 p-2 py-3 rounded-lg ' onClick={() => dispatch(clearCart())}>
                        Clear
                        <AiOutlineClose />
                    </button>
                    <button className='bg-blue-900 w-[40vw] md:w-[13vw] text-white flex items-center justify-center gap-2 p-2 py-3 rounded-lg '>
                        Checkout
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </button>
                </div>
            </div>}
        </>
    )
}

export default Cart