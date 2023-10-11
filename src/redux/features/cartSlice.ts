"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemProps = {
  productId: string;
  amount: number;
  size: string;
  color: string;
};
type CartProps = {
  isOpen: boolean;
  cartItems: CartItemProps[];
  subTotal: number;
};

const initialState = {
  isOpen: false,
  cartItems: [],
  subTotal: 0,
} as CartProps;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartModel: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      console.log(existingItem);
      if (!existingItem) {
        state.cartItems.push({
          productId: action.payload.productId,
          amount: 1,
          size: action.payload.size,
          color: action.payload.color,
        });
      } else {
        existingItem.amount += 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    decreaseQuantity: (state, { payload }) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === payload
      );
      if (existingItem && existingItem.amount > 1) {
        existingItem.amount -= 1;
      } else if (existingItem?.amount === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== existingItem.productId
        );
      }
    },
    getSubTotal: (state, { payload }) => {
      const products = payload;
      state.subTotal = state.cartItems.reduce((total, cartItem) => {
        const currentItem = products.find(
          (item: { slug: string }) => item.slug === cartItem.productId
        );
        return Number(
          (total + currentItem?.price * cartItem.amount).toFixed(2)
        );
      }, 0);
    },
  },
});

export const {
  toggleCartModel,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  getSubTotal,
} = cart.actions;
export default cart.reducer;
