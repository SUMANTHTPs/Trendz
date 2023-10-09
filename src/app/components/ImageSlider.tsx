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
            <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
                {imageUrls.map(url => (
                    <Image key={url.blurDataURL} style={{
                        translate: `${-100 * imgIndex}%`
                    }}
                        className='object-cover w-full h-full block flex-shrink-0 flex-grow-0 banner-img'
                        src={url}
                        width={1000}
                        height={1000}
                        alt='banner images'
                    />
                ))}
            </div>
            <button className='img-slider-button' onClick={handlePrev}>
                <AiOutlineLeft className='banner-icons' fill='white' stroke='black' />
            </button>
            <button className='img-slider-button right-0' style={{ right: "0" }} onClick={handleNext}>
                <AiOutlineRight className='banner-icons' fill='white' stroke='black' />
            </button>
            <div
                style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    left: "50%",
                    translate: "-50%",
                    display: "flex",
                    gap: "0.25rem"
                }}
            >
                {imageUrls.map((_, index) => (
                    <button key={index} className={`flex w-2 h-2 bg-white rounded  ${index === imgIndex && "bg-gray-600 border border-white scale-105"}`} onClick={() => setImgIndex(index)}></button>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider