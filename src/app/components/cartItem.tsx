"use client"
import { tShirts } from '@/data/data';
import { addToCart, decreaseQuantity } from '@/redux/features/cartSlice';
import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';

function CartItem({ cartItem }: any) {
    const { productId, amount } = cartItem;
    const dispatch = useDispatch();

    const matchingItem = tShirts.find(item => item.slug === productId);
    return (
        <div className='flex p-2'>
            {matchingItem && (
                <div className='flex gap-4 p-5 items-center'>
                    <img src={`${matchingItem.img}`} className='w-16 h-full border border-gray-200 rounded-md' alt={productId} />
                    <div>
                        <h2 className='flex flex-wrap w-[50vw] sm:w-[12vw] md:w-[18vw]'>{matchingItem?.title}</h2>
                        <p>₹{matchingItem.price}</p>
                    </div>
                    <div className='flex gap-2 items-center right-3'>
                        <AiFillMinusCircle onClick={() => dispatch(decreaseQuantity(matchingItem.slug))} />
                        {amount}
                        <AiFillPlusCircle onClick={() => dispatch(addToCart(matchingItem.slug))} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartItem