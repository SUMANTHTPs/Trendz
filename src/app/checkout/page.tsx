"use client";
import React from 'react'
import CartItem from '../components/cartItem';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';

function CheckoutPage() {
  const { cartItems, subTotal } = useAppSelector((store) => store.cart);
  const { products } = useAppSelector<{ products: any[] }>((store) => store.product);

  // Find the matching item details
  const matchingCartItems = cartItems.filter((cartItem) => {
    const matchingTShirt = products.find((product) => product.slug === cartItem.productId);
    return matchingTShirt !== undefined;
  });
  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <div className="lg:w-1/2 md:w-2/3 mx-auto ">
        <h2 className='border-b border-gray-300'>Delivery Details</h2>
        <div className="flex flex-wrap m-2">
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="p-2 w-full">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pin" name="pin" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto my-5">
        <h2 className='border-b border-gray-300'>Order Details</h2>
        {matchingCartItems.map((item) => {
          return <CartItem key={item.productId} cartItem={item} />;
        })}
        {!!cartItems.length && (
          <p className="p-2">{`Total amount (Including tax): ${subTotal}`}</p>
        )}
        {!!cartItems.length ? (<button
          className="bg-blue-700 hover:bg-blue-900 w-full text-white flex items-center justify-center gap-2 p-2 py-3 rounded-lg mt-3 cursor-pointer"
        >
          Proceed to payment
        </button>) : (
          <p className="p-2">Please add some items to checkout</p>
        )}
      </div>
    </div>

  )
}

export default CheckoutPage