"use client";
import Link from 'next/link';
import React from 'react'
import SizeOptions from './SizeOptions';
import ColorOptions from './ColorOptions';

function ProductTile({ product }: any) {
    const { slug, title, img, price, productType } = product;
    const productURL = `/products/${slug}`

    return (
        <div className="lg:w-1/5 md:w-1/3 p-4 w-full border border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-300">
            <Link href={productURL} className="block h-80 rounded overflow-hidden">
                <img alt={title} className="object-cover object-center w-full block transition-transform transform hover:scale-105" src={img} />
            </Link>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{productType}</h3>
                <a href={productURL}>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                        {product?.title.split(' ').slice(0, 4).join(' ')}
                        {product?.title.split(' ').length > 4 ? '...' : ''}
                    </h2>
                </a>
                <p className="mt-1">₹{price}</p>
                <div className="flex flex-col gap-3 my-2">
                    <SizeOptions product={product} />
                    <ColorOptions product={product} />
                </div>
            </div>
        </div>
    )
}

export default ProductTile