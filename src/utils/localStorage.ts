export function setCartToLocalStorage(item: any) {
  return localStorage.setItem("cart", JSON.stringify(item));
}

export function getCartFromLocalStorage() {
  if (typeof window !== "undefined") {
    const storedItems = localStorage.getItem("cart");
    return storedItems ? JSON.parse(storedItems) : [];
  }
  return [];
}

export function removeCartFromLocalStorage() {
  localStorage.clear();
}