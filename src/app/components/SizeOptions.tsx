import { setSize } from '@/redux/features/productSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';

function SizeOptions({ product, disabled }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const availableSizes = ["S", "M", "L", "XL"];
    const { size: selectedSize }: any = useAppSelector(store => store.product)

    return (
        <div className="flex gap-1">
            {availableSizes.map((size) => (
                product.size.includes(size) && (
                    <button
                        key={size}
                        value={size}
                        onClick={() => !disabled && dispatch(setSize(size))}
                        style={(size.toLowerCase() === selectedSize?.toLowerCase() && !disabled) ? {
                            border: "2px solid black",
                            backgroundColor: 'lightgray'
                        } : {}}
                        className={`border-2 border-gray-300 ml-1 w-6 h-6 p-2 px-4 flex items-center justify-center rounded-full`}>
                        {size}
                    </button>
                )
            ))}
        </div>
    );
}

export default SizeOptions;
