"use client";

import { toggleCartModel } from "@/redux/features/cartSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { AiOutlineClose } from "react-icons/ai"
import { MdShoppingCartCheckout } from "react-icons/md"
import { useDispatch } from "react-redux"


function Cart() {
    const { isOpen } = useAppSelector((store) => store.CartReducer)
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            {isOpen && <div className="absolute right-0 bg-white w-[25vw] h-[100vh] transition-transform duration-900 ease-in-out">
                <div className="flex justify-between items-center">
                    <h1 className="p-2 text-2xl">Your cart items</h1>
                    <AiOutlineClose className="text-2xl mr-2 p-1 hover:bg-gray-200" onClick={() => dispatch(toggleCartModel())} />
                </div>
                <div className="flex gap-3 p-2">
                    <button className='bg-blue-900 w-[12.5vw] text-white flex items-center justify-center gap-2 p-2 py-4 rounded-lg '>
                        Clear
                        <AiOutlineClose />
                    </button>
                    <button className='bg-blue-900 w-[12.5vw] text-white flex items-center justify-center gap-2 p-2 py-4 rounded-lg '>
                        Checkout
                        <MdShoppingCartCheckout />
                    </button>
                </div>
            </div>}
        </>
    )
}

export default Cart