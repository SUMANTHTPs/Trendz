"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { addToCart, decreaseQuantity } from '@/redux/features/cartSlice';
import { tShirts } from '@/data/data';
import { useAppSelector } from '@/redux/store';

function CartItem({ cartItem }: any) {
    const { productId, amount } = cartItem;
    const dispatch = useDispatch();

    const { products } = useAppSelector<{ products: any[] }>((store) => store.product); 
    const matchingItem = products.find(item => item.slug === productId );

    return (
        <div className="flex p-2 border-b border-gray-200">
            {matchingItem && (
                <>
                    <div className="w-16 h-16 overflow-hidden">
                        <img
                            src={matchingItem.img}
                            alt={productId}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col flex-grow pl-4">
                        <h2 className="text-xl font-semibold">{matchingItem.title}</h2>
                        <p className="text-gray-600">₹{matchingItem.price}</p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => dispatch(decreaseQuantity(matchingItem.slug))}
                            className="text-blue-700 hover:text-blue-900 transition-colors"
                        >
                            <AiFillMinusCircle size={24} />
                        </button>
                        <span className="mx-2 text-lg font-semibold">{amount}</span>
                        <button
                            onClick={() => dispatch(addToCart(matchingItem.slug))}
                            className="text-blue-700 hover:text-blue-900 transition-colors"
                        >
                            <AiFillPlusCircle size={24} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;
