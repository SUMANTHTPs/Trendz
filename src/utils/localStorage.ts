import { CartItemProps } from "@/redux/features/cartSlice";

export function setCartToLocalStorage(item: any) {
  return localStorage.setItem("cart", JSON.stringify(item));
}

export function getCartFromLocalStorage() {
  const storedItems = localStorage.getItem("cart");
  const cartItems = storedItems ? JSON.parse(storedItems) : [];
  return cartItems;
}

export function removeCartFromLocalStorage() {
  localStorage.clear();
}
