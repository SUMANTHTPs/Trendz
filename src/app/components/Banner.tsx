"use client"
import React from 'react'
import banner1 from "@/app/assets/banner/banner1.jpg"
import banner2 from "@/app/assets/banner/banner.jpg"
import banner3 from "@/app/assets/banner/banner3.webp"
import banner4 from "@/app/assets/banner/banner4.jpg"
import banner5 from "@/app/assets/banner/banner5.jpg"
import ImageSlider from './ImageSlider'

const banners = [banner1, banner2, banner3, banner4, banner5]
function Banner() {
    return (
        <div style={{maxWidth: "1600px", width: "100%", height: "600px", margin: "0 auto"}}>
            <ImageSlider imageUrls={banners}/>
        </div>
    )
}

export default Banner