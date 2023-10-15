"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {
  const router = useRouter();
  const navigateToHome = () => {
    router.push("/")
  }
  return (
    <div className='flex justify-center items-center gap-2 cursor-pointer select-none' onClick={navigateToHome}>
      <Image
        src="/images/shirt.png"
        width={40}
        height={40}
        alt='logo'
      />
      <h1 style={{ fontFamily: "cursive" }} className='text-blue-900 font-bold text-3xl'>
        TrendZ
      </h1>
    </div>
  )
}

export default Logo