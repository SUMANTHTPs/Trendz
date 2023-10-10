import { setSize } from '@/redux/features/productSlice';
import { AppDispatch } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';

function SizeOptions({ product }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const availableSizes = ["S", "M", "L", "XL"];

    return (
        <div className="flex gap-1">
            {availableSizes.map((size) => (
                product.size.includes(size) && (
                    <button key={size} value={size} onClick={() => dispatch(setSize(size))} className="border-2 border-gray-300 ml-1 w-6 h-6 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 p-2 px-4 flex items-center justify-center">{size}</button>
                )
            ))}
        </div>
    );
}

export default SizeOptions;
