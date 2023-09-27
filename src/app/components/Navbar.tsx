"use client";
import Link from 'next/link';
import Logo from './Logo'
import { icons } from '@/utils/data';
import Cart from './Cart';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { toggleCartModel } from '@/redux/features/cartSlice';

const Navbar = () => {
  const { isOpen } = useAppSelector((store) => store.CartReducer)
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='sticky top-0 z-50  bg-white' >
      <div className="flex flex-row p-3 justify-between items-center shadow-lg my-2">
        <div className="nav flex flex-col md:flex-row gap-5 font-bold justify-center items-start">
          <Logo />
          <ul className="flex gap-2 items-center justify-center p-2">
            <Link href={"/hoodies"}><li>Hoodies</li></Link>
            <Link href={"/tshirts"}><li>T-shirts</li></Link>
            <Link href={"/stickers"}><li>Stickers</li></Link>
            <Link href={"/mugs"}><li>Mugs</li></Link>
          </ul>
        </div>
        <div className="cart" onClick={() => dispatch(toggleCartModel())}>
          <img src={icons.cart} />
        </div>
      </div>
      <Cart />
    </div>
  )
}

export default Navbar