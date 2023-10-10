import { setColor } from '@/redux/features/productSlice';
import { AppDispatch } from '@/redux/store';
import React from 'react'
import { useDispatch } from 'react-redux';

function ColorOptions({product}: any) {
    const dispatch = useDispatch<AppDispatch>();
  return (
      <div className="flex gap-1">
          {product.color.map((color: string) => (
              <button
                  key={color}
                  style={{ backgroundColor: color }}
                  className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
                  onClick={() => dispatch(setColor(color))}
              ></button>
          ))}
      </div>
  )
}

export default ColorOptions