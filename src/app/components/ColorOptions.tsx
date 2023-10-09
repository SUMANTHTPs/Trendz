import React from 'react'

function ColorOptions({product}: any) {
  return (
      <div className="flex gap-1">
          {product.color.map((color: string) => (
              <button
                  key={color}
                  style={{ backgroundColor: color }}
                  className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
              ></button>
          ))}
      </div>
  )
}

export default ColorOptions