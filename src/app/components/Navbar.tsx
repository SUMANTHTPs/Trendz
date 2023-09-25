"use-client";
import Link from 'next/link';
import Logo from './Logo'
import { icons } from '@/utils/data';

const Navbar = () => {
  return (
    <div>
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


        <div className="cart ">
          <img src={icons.cart} />
        </div>
      </div>
    </div>
  )
}

export default Navbar