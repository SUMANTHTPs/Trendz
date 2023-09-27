import { getCartFromLocalStorage, removeCartFromLocalStorage, setCartToLocalStorage } from "@/utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemProps = {
  productId: string;
  amount: number;
};
type CartProps = {
  isOpen: boolean;
  cartItems: CartItemProps[];
};

const initialState = {
  isOpen: false,
  cartItems: getCartFromLocalStorage(),
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
        (item) => item.productId === action.payload
      );
      if (!existingItem) {
        state.cartItems.push({ productId: action.payload, amount: 1 });
      } else {
        existingItem.amount += 1;
      }
      setCartToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      setCartToLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      removeCartFromLocalStorage();
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
      setCartToLocalStorage(state.cartItems);
    },
  },
});

export const {
  toggleCartModel,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
} = cart.actions;
export default cart.reducer;
