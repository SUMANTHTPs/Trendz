"use client"
import { getCookie } from '@/utils/utilities'
import React from 'react'
import jwt, { JwtPayload } from "jsonwebtoken"

function Profile() {
    const token: string = getCookie('token') ?? " ";
    const secret: jwt.Secret = process.env.NEXT_PUBLIC_SECRET ?? " ";
    let decodedData: string | JwtPayload = "Unknown"
    try {
        decodedData = jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
    }
    const name = typeof decodedData === 'object' ? decodedData.name : 'Unknown';
    const email = typeof decodedData === 'object' ? decodedData.email : 'Unknown';
    return (
        <div className=''>
            <div className='flex flex-col md:flex-row m-5 justify-center gap-32'>
                <div className="img w-full md:w-[20vw]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                </div>
                <div className="info p-3">
                    <h1 className='text-2xl capitalize'><span className='font-bold text-3xl'>hi </span>{name}</h1>
                    <h2 className='text-gray-500'>{email}</h2>
                    <div className='button flex mt-4 gap-4'>
                        <button className=' hover:outline hover:outline-blue-900 p-2 capitalize border-b-4 border-blue-900 hover:border-none rounded-sm'>wishlist</button>
                        <button className=' hover:outline hover:outline-blue-900 p-2 capitalize border-b-4 border-blue-900 hover:border-none rounded-sm'>order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile