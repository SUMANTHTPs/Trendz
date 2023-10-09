import Link from 'next/link'
import React from 'react'

export type CollectionProps = {
    img: string,
    link: string
    text: string
}

function CollectionItem({ img, link, text }: CollectionProps) {
    return (
        <div className='flex flex-col items-center justify-center w-full md:w-[45vw] rounded-2xl'>
            <Link href={link}>
                <div className="relative">
                    <img style={{height: "500px"}} className='w-[100vw]' src={img} alt={`${text}-collection-image`} />
                    <p className="absolute bottom-0 left-0 right-0 text-center bg-gray-400 text-white p-2">
                        {text}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default CollectionItem
