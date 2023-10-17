import { addToCart } from '@/redux/features/cartSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React from 'react'
import { useDispatch } from 'react-redux';

function ProductActionButtonsContainer({ productIdParam }: any) {
    const { size, color } = useAppSelector(store => store.product)
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="flex gap-3">
            <button className="flex w-1/2 items-center justify-center text-white bg-blue-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-700 rounded" onClick={() => dispatch(addToCart({ productId: productIdParam, size: size, color: color}))}>Add to cart</button>
            <button className="flex w-1/2 items-center justify-center text-white bg-blue-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-700 rounded">Buy now</button>
        </div>
    )
}

export default ProductActionButtonsContainer