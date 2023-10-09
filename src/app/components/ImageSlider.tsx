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
            if ((prevState - 1) < 0) return imageUrls.length - 1
            return prevState - 1
        })
    }
    const handleNext = () => {
        setImgIndex(prevState => (Math.abs(prevState + 1)) % imageUrls.length)
    }
    return (
        <div className='w-full h-full relative'>
            <Image className='object-cover w-full h-full block' src={imageUrls[imgIndex]} width={1000} height={1000} alt='banner images' />
            <button className='img-slider-button' onClick={handlePrev}>
                <AiOutlineLeft fill='white'stroke='black' />
            </button>
            <button className='img-slider-button right-0' style={{right: "0"}} onClick={handleNext}>
                <AiOutlineRight fill='white' stroke='black' />
            </button>
        </div>
    )
}

export default ImageSlider