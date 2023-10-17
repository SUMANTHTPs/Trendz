"use client"
import Image, { StaticImageData } from 'next/image';
import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
type ImageSliderProps = {
    imageUrls: StaticImageData[];
};
function ImageSlider({ imageUrls }: ImageSliderProps) {
    // states
    const [imgIndex, setImgIndex] = React.useState(0)
    // change states
    const handlePrev = () => {
        setImgIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };
    const handleNext = () => {
        setImgIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 2000)

        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <section className='w-full h-full relative'>
            <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
                {imageUrls.map(url => (
                    <Image key={url.blurDataURL} style={{
                        translate: `${-100 * imgIndex}%`
                    }}
                        className='object-fit w-full h-[85vh] md:h-full block flex-shrink-0 flex-grow-0 banner-img'
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
                    gap: "0.5rem"
                }}
            >
                {imageUrls.map((_, index) => (
                    <button key={index} className={`flex w-3 h-3 rounded-3xl bg-white hover:scale-125 ${index === imgIndex && "bg-gray-700 border border-white scale-125"}`} onClick={() => setImgIndex(index)}></button>
                ))}
            </div>
        </section>
    )
}

export default ImageSlider