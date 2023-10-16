"use client";
import React from "react";
import CartItem from "../components/cartItem";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { EventProps } from "../types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ordersInitialState, setOrderItems } from "@/redux/features/orderSlice";

function CheckoutPage() {
  const { cartItems, subTotal } = useAppSelector((store) => store.cart);
  const { products } = useAppSelector<{ products: any[] }>(
    (store) => store.product
  );
  const { user } = useAppSelector((store) => store.user);
  const initialState = {
    name: user.name,
    email: user.email,
    address: "",
    pin: "",
    phone: "",
    city: "",
    state: "",
  };
  const [deliveryDetails, setDeliveryDetails] = React.useState(initialState);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Find the matching item details
  const matchingCartItems = cartItems.filter((cartItem) => {
    const matchingTShirt = products.find(
      (product) => product.slug === cartItem.productId
    );
    return matchingTShirt !== undefined;
  });

  // React.useEffect(()=> {
  //   console.log(first)
  //   dispatch(setOrderItems(ordersInitialState))
  // }, [pathName, searchParams])

  // handle input change
  const handleChange = (e: EventProps) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  // submit order info
  const submitInformation = (e: any) => {
    e.preventDefault();
    const { name, email, pin, address, city, state, phone } = deliveryDetails;
    if (!(name && email && pin && address)) {
      toast.warning("Please fill out all the fields")
      return;
    }
    const fullAddress = `${name} ${email} ${address} ${city} ${state} ${pin} ${phone}`
    const orderDetails = {
      userId: user.email,
      products: matchingCartItems,
      address: fullAddress,
      subTotal: subTotal,
      status: "ordered"
    }
    dispatch(setOrderItems(orderDetails))
    router.push("/payment")
  }
  return (
    <form className="container m-auto">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <div className="lg:w-1/2 md:w-2/3 mx-auto ">
        <h2 className="border-b border-gray-300">Delivery Details</h2>
        <div className="flex flex-wrap m-2">
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={deliveryDetails.name}
              required
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={deliveryDetails.email}
              required
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={deliveryDetails.address}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required={true}
              value={deliveryDetails.phone}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">
              Pin code
            </label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={deliveryDetails.pin}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={deliveryDetails.city}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full md:w-1/2">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={deliveryDetails.state}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto my-5">
        <h2 className="border-b border-gray-300">Order Details</h2>
        {matchingCartItems.map((item) => {
          return <CartItem key={item.productId} cartItem={item} />;
        })}
        {!!matchingCartItems.length && (
          <p className="p-2">{`Total amount (Including tax): ${subTotal}`}</p>
        )}
        {!!matchingCartItems.length ? (
          <button onClick={submitInformation} type="submit" className="bg-blue-700 hover:bg-blue-900 w-full text-white flex items-center justify-center gap-2 p-2 py-3 rounded-lg mt-3 cursor-pointer">
            Proceed to payment
          </button>
        ) : (
          <p className="p-2">Please add some items to checkout</p>
        )}
      </div>
    </form>
  );
}

export default CheckoutPage;
