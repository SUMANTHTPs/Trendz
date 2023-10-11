import React from 'react';
import { useDispatch } from 'react-redux';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { addToCart, decreaseQuantity } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/store';

function CartItem({ cartItem }: any) {
    const { productId, amount, size, color } = cartItem;
    const dispatch = useDispatch();

    const { products } = useAppSelector<{ products: any[] }>((store) => store.product);
    const matchingItem = products.find(item => item.slug === productId);

    return (
        <div className="cart-item p-3 border-b border-gray-200 gap-1">
            {matchingItem && (
                <>
                    <div className="w-20 h-28 relative">
                        <img
                            src={matchingItem.img}
                            alt={productId}
                            className="w-full h-full object-fill border border-gray-100 rounded-md"
                        />
                        <div style={{ backgroundColor: color }} className={`absolute p-2 w-2 h-2 -top-1 -right-1 flex items-center justify-center rounded-lg`}>
                            <span>{size}</span>
                        </div>
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
                            onClick={() => dispatch(addToCart({ productId: matchingItem.slug, size: size, color: color }))}
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
