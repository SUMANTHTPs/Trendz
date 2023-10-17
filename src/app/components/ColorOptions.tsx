"use client"
import { setColor } from '@/redux/features/productSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React from 'react'
import { useDispatch } from 'react-redux';

function ColorOptions({ product, disabled }: any) {
    // redux states
    const dispatch = useDispatch<AppDispatch>();
    const { color: selectedColor }: any = useAppSelector(store => store.product)
    return (
        <div className="flex gap-1">
            {product.color.map((color: string) => (
                <button
                    key={color}
                    style={{
                        backgroundColor: color,
                        border: (color.toLowerCase() === selectedColor?.toLowerCase() && !disabled) ? "2px solid #007bff" : ""
                    }}
                    className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
                    onClick={() => !disabled && dispatch(setColor(color))}
                ></button>
            ))}
        </div>
    )
}

export default ColorOptions