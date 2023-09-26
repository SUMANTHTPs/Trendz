"use client";

import { toggleCartModel } from "@/redux/features/cartSlice"
import { AppDispatch, RootState, store, useAppSelector } from "@/redux/store"
import { AiOutlineClose } from "react-icons/ai"
import { MdShoppingCartCheckout } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"


function Cart() {
    const { isOpen } = useAppSelector((store) => store.CartReducer)
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            {isOpen && <div className="absolute right-0 bg-white w-[25vw] h-[100vh]">
                <div className="flex justify-between items-center">
                    <h1 className="p-2 text-2xl">Your cart items</h1>
                    <AiOutlineClose className="text-2xl mr-2 hover:" onClick={() => dispatch(toggleCartModel())} />
                </div>
                <button className='flex items-center justify-center gap-2 absolute bg-blue-900 text-white transition-transform p-3 w-full my-[75vh] rounded-lg'>
                    Checkout
                    <MdShoppingCartCheckout />
                </button>
            </div>}
        </>
    )
}

export default Cart