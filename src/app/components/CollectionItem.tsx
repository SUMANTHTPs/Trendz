import Link from 'next/link'
import React from 'react'
import { CollectionProps } from '../types'

function CollectionItem({ img, link, text }: CollectionProps) {
    return (
        <div className='flex flex-col items-center justify-center w-full md:w-[40vw]'>
            <Link href={link}>
                <div className="collections-container relative rounded-lg border border-gray-300 transform hover:scale-105 transition-transform duration-300">
                    <img style={{ height: "500px" }} className='w-[100vw] rounded-lg' src={img} alt={`${text}-collection-image`} />
                </div>
            </Link>
        </div>
    )
}

export default CollectionItem
