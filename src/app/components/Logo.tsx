import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <Image
        src="/images/shirt.png"
        width={40}
        height={40}
        alt='logo'
      />
      <h1 style={{ fontFamily: "cursive" }} className='text-red-500 text-xl'>
        Trendy Wear
      </h1>
    </div>
  )
}

export default Logo