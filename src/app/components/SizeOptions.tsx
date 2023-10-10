import React from 'react';

const buttonStyle = "border-2 border-gray-300 ml-1 w-6 h-6 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 p-2 px-4 flex items-center justify-center";

function SizeOptions({ product }: any) {
    const availableSizes = ["S", "M", "L", "XL"];

    return (
        <div className="flex gap-1">
            {availableSizes.map((size) => (
                product.size.includes(size) && (
                    <button key={size} className={buttonStyle}>{size}</button>
                )
            ))}
        </div>
    );
}

export default SizeOptions;
