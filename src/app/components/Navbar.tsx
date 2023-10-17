"use client";
import React from "react"
import Link from 'next/link';
import Logo from './Logo'
import { icons } from '@/utils/data';
import Cart from './Cart';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { toggleCartModel } from '@/redux/features/cartSlice';
import UserProfile from './UserProfile';
import { getCookie } from '@/utils/utilities';
import { LoginButton } from "./LoginButton";
import { usePathname, useSearchParams } from "next/navigation";


const Navbar = () => {
  // states
  const { cartItems } = useAppSelector((store) => store.cart)
  const [token, setToken] = React.useState("")
  const [showCategories, setShowCategories] = React.useState(false);
  
  // hooks
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<AppDispatch>();

  // total cart items
  let totalItems = cartItems.reduce((total, item) => total + item.amount, 0)


  React.useEffect(() => {
    setToken(getCookie("token") ?? "")
  }, [pathname, searchParams])

  return (
    <div className='sticky top-0 bg-white z-50' >
      <div className="flex flex-row p-3 justify-between items-center shadow-lg my-2 select-none">
        <div className="nav flex flex-col md:flex-row gap-5 font-bold justify-center items-start">
          <div className="flex gap-2">
            <div className="md:hidden menu-icon cursor-pointer relative" onClick={() => setShowCategories(!showCategories)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path d="M2 4.5A.5.5 0 0 1 2.5 4h11a.5.5 0 0 1 .5.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5zM2 8.5A.5.5 0 0 1 2.5 8h11a.5.5 0 0 1 .5.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5zM2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
              {showCategories && (
                <div className="list-none absolute bg-white w-[100vw] top-12 shadow-lg text-center -mx-3 p-2">
                  <Link href={"/tshirts"}><li className='capitalize'>t-shirts</li></Link>
                  <Link href={"/hoodies"}><li className='capitalize'>hoodies</li></Link>
                  <Link href={"/mugs"}><li className='capitalize'>mugs</li></Link>
                  <Link href={"/caps"}><li className='capitalize'>caps</li></Link>
                </div>
              )}
            </div>
            <Logo />
          </div>
          <ul className="hidden md:flex gap-3 items-center justify-center p-2">
            <Link href={"/tshirts"}><li className='capitalize'>t-shirts</li></Link>
            <Link href={"/hoodies"}><li className='capitalize'>hoodies</li></Link>
            <Link href={"/mugs"}><li className='capitalize'>mugs</li></Link>
            <Link href={"/caps"}><li className='capitalize'>caps</li></Link>
          </ul>
        </div>
        <div className='flex gap-1 items-center justify-center'>
          <div className="profile text-gray-600">
            {token ? <UserProfile /> : <LoginButton />}
          </div>
          <div className="cart relative" onClick={() => dispatch(toggleCartModel())}>
            <img className='w-10 h-8' src={icons.cart} />
            <p className='absolute flex items-center justify-center rounded-full bg-blue-800 text-white w-1 h-1 p-2 -top-1 -right-0 text-xs'>{totalItems}</p>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  )
}

export default Navbar