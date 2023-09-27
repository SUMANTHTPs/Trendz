"use client";

import { clearCart, toggleCartModel } from "@/redux/features/cartSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { AiOutlineClose } from "react-icons/ai"
import { MdShoppingCartCheckout } from "react-icons/md"
import { useDispatch } from "react-redux"
import CartItem from "./cartItem";


function Cart() {
    const { isOpen, cartItems } = useAppSelector((store) => store.CartReducer)
    const dispatch = useDispatch<AppDispatch>();
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
                <div className="fixed bottom-0 flex gap-3 p-2 mx-6">
                    <button className='bg-blue-900 w-[40vw] md:w-[10vw] text-white flex items-center justify-center gap-2 p-2 py-3 rounded-lg ' onClick={() => dispatch(clearCart())}>
                        Clear
                        <AiOutlineClose />
                    </button>
                    <button className='bg-blue-900 w-[40vw] md:w-[10vw] text-white flex items-center justify-center gap-2 p-2 py-3 rounded-lg '>
                        Checkout
                        <MdShoppingCartCheckout />
                    </button>
                </div>
            </div>}
        </>
    )
}

export default Cart