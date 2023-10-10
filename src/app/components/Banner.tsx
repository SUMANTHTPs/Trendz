"use client";
import React, { useState, useEffect } from 'react';
import banner1 from "@/app/assets/banner/banner1.jpg";
import banner2 from "@/app/assets/banner/banner.jpg";
import banner3 from "@/app/assets/banner/banner3.webp";
import banner4 from "@/app/assets/banner/banner4.jpg";
import banner5 from "@/app/assets/banner/banner5.jpg";
import ImageSlider from './ImageSlider';
import { useRouter } from 'next/navigation';

const banners = [banner1, banner2, banner3, banner4, banner5];

function Banner() {
    const [showButton, setShowButton] = useState(false);
    const router = useRouter();
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='relative' style={{ maxWidth: "1600px", width: "100%", height: "650px", margin: "0 auto" }}>
            <ImageSlider imageUrls={banners} />
            {showButton && (
                <button
                    onClick={()=> router.push("/tshirts")}
                    style={{
                        left: "50%",
                        translate: "-50%",
                    }}
                    className="absolute bg-white text-gray-700 border border-gray-200 py-3 px-8 rounded-lg bottom-8 text-xl font-bold transition-transform duration-300"
                >
                    Shop Now
                </button>
            )}
        </div>
    );
}

export default Banner;
