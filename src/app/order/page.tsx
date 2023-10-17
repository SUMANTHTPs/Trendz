"use client";
import { getOrders } from "@/redux/features/orderSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getTokenDecodedData } from "@/utils/utilities";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProduct } from "@/redux/features/productSlice";
import { toast } from "react-toastify";

function Order() {
  const [name, email] = getTokenDecodedData();
  // states
  const [ordersLoaded, setOrdersLoaded] = React.useState(false);
  const { orderedItems } = useAppSelector((store) => store.order);
  const { products: storeProducts } = useAppSelector((store) => store.product);
  // hooks
  const dispatch = useDispatch<AppDispatch>();

  const fetchOrders = async () => {
    try {
      const response = await dispatch(getOrders({ userId: email }));
      if (response) {
        setOrdersLoaded(true)
      }
      return response;
    } catch (error: any) {
      toast.error("Unable to fetch orders")
    }
  };

  useEffect(() => {
    if (storeProducts.length === 0) {
      dispatch(getProduct())
    }
    fetchOrders()
  }, [])
  return (
    <div className="flex flex-col justify-center mt-5 w-[90vw] m-auto mb-10">
      <h1 className="text-center text-2xl mb-3 text-gray-500 font-semibold">Order</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                products name
              </th>
              <th scope="col" className="px-6 py-3">
                amount
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
            </tr>
          </thead>
          {ordersLoaded && (
            <tbody>
              {(orderedItems?.length > 0) ? (orderedItems?.map((item: any) => {
                return (
                  <tr key={item._id} className="bg-white border-b hover:bg-gray-5 capitalize">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item.products.map((product: any) => {
                        const currentProduct: any = storeProducts?.find((storeProductItem: any) => storeProductItem.slug === product.productId)
                        return (
                          <div key={product._id}>
                            <h1>{currentProduct.title ?? "Unknown"}</h1>
                            <h3>{"Size: " + product.size}</h3>
                            <h3>{"Color: " + product.color}</h3>
                            <h3>{"Quantity: " + product.amount}</h3>
                          </div>
                        )
                      })}
                    </td>
                    <td className="px-6 py-4">{item.subTotal}</td>
                    <td className="px-6 py-4">{item.status}</td>
                  </tr>
                )
              })) : (
                <tr className="bg-white border-b hover:bg-gray-5 capitalize">
                  <td className="px-6">No records</td>
                  <td className="px-6">No records</td>
                  <td className="px-6">No records</td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Order;
