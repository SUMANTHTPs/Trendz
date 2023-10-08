"use client"
import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
type ImageSliderProps = {
    imageUrls: StaticImageData[];
};
function ImageSlider({ imageUrls }: ImageSliderProps) {
    const [imgIndex, setImgIndex] = React.useState(0)
    const handlePrev = () => {
        setImgIndex(prevState => {
            return (Math.abs(prevState - 1)) % imageUrls.length
        })
    }
    const handleNext = () => {
        setImgIndex(prevState => (Math.abs(prevState + 1)) % imageUrls.length)
    }
    return (
        <div className='w-full h-full'>
            <Image className='object-cover w-full h-full' src={imageUrls[imgIndex]} width={1000} height={1000} alt='banner images' />
            <button onClick={handlePrev}>
                <AiOutlineLeft />
            </button>
            <button onClick={handleNext}>
                <AiOutlineRight />
            </button>
        </div>
    )
}

export default ImageSlider