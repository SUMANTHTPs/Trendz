"use client"
import { clearOrderItems, placeOrder } from '@/redux/features/orderSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

function Payments() {
  const { orderItems } = useAppSelector((store) => store.order);
  const dispatch = useDispatch<AppDispatch>();
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter();

  const confirmOrder = async () => {
    setDisabled(true)
    const response = await dispatch(placeOrder(orderItems));
    setDisabled(response.payload.success)
    if (response.payload.success) {
      dispatch(clearOrderItems)
      router.push("/")
    }
  }
  if (!orderItems.subTotal) {
    return <p>Please wait...</p>
  }
  return (
    <div className='flex flex-col items-center justify-center gap-3 my-20 p-10'>
      <h1 className='text-xl font-bold'>Confirm order</h1>
      <div>
        <div className='flex gap-1'>
          <input type="radio" name="cod" id="cod" checked />
          <label htmlFor="cod">Cash on delivery</label>
        </div>
        <div className='flex gap-1'>
          <input type="radio" name="cod" id="cod" disabled />
          <label htmlFor="cod">UPI</label>
        </div>
        <div className='flex gap-1'>
          <input type="radio" name="cod" id="cod" disabled />
          <label htmlFor="cod">Credit/ debit card</label>
        </div>
      </div>
      <p>{`Amount to be paid on delivery: ${orderItems.subTotal}`}</p>
      <button type="submit" disabled={disabled && !!(orderItems.subTotal)} className='bg-blue-900 p-2 text-white rounded-md' onClick={confirmOrder}>Place your order</button>
    </div>
  )
}

export default Payments