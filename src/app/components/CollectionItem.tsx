import Link from 'next/link'
import React from 'react'

export type CollectionProps = {
    img: string,
    link: string
    text: string
}
function CollectionItem(item: CollectionProps) {
    const { img, link, text } = item;
    return (
        <div className='flex flex-wrap gap-3 item-center justify-center w-[40vw] h-[60vh]'>
            <Link href={link}>
                <img className='w-[50vw]' src={img} alt={`${text}-collection-image`} />
                <p>{text}</p>
            </Link>
        </div>
    )
}

export default CollectionItem