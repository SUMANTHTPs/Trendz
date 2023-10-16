"use client"
import { getOrders } from '@/redux/features/orderSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getTokenDecodedData } from '@/utils/utilities'
import React from 'react'
import { useDispatch } from 'react-redux'
import { orderProps } from '../types'

function Order() {
  const [name, email] = getTokenDecodedData()

  const { orderedItems } = useAppSelector(store => store.order)
  const { products } = useAppSelector(store => store.product)
  const dispatch = useDispatch<AppDispatch>();

  const fetchOrders = async () => {
    try {
      const response = await dispatch(getOrders({ userId: email }));
      return response;
    } catch (error) {
      return;
    }
  };

  React.useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='text-center text-2xl'>Order</h1>
      <table className="border-collapse w-full md:w-[75vw] m-auto text-center">
        <thead>
          <tr>
            <th className="border p-3">Sl No</th>
            <th className="border p-3">Products</th>
            <th className="border p-3">Amount</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orderedItems.map((item: orderProps, index: any) => (
            <tr key={index}>
              <td className="border p-3">{index + 1}</td>
              <td className="border p-3">
                {
                  item.products.map(product => {
                    // const storeProduct: any = products?.filter((storeProduct: any) => {
                    //   if (storeProduct && 'slug' in storeProduct && product.productId === storeProduct.slug) {
                    //     return storeProduct;
                    //   }
                    //   return "";
                    // });
                    return (
                      <div className='flex flex-col capitalize' key={index}>
                        {/* <span>{`${storeProduct[0].title} (${product.size}/ ${product.color})`}</span> */}
                        <span>{`${product.productId} (${product.size}/ ${product.color})`}</span>
                        <span className='text-gray-500'>{`Quantity: ${product.amount}`}</span>
                      </div>
                    )
                  })
                }</td>
              <td className="border p-3">{`${item.subTotal}`}</td>
              <td className="border p-3">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Order