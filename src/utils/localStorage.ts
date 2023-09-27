import { CartItemProps } from "@/redux/features/cartSlice";

export function setCartToLocalStorage(item: CartItemProps) {
  return localStorage.setItem("cart", JSON.stringify(item));
}

export function getCartFromLocalStorage() {
  return localStorage.getItem("cart");
}
